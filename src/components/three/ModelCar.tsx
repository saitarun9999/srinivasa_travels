"use client";

import { Component, useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry.js";

/**
 * Real car model for the hero. A meshopt-compressed glTF binary at MODEL_URL
 * replaces the procedural sedan; until it loads (or if it is missing) the
 * sedan stays on screen.
 *
 * The scene expects the car to face +X with its wheels on y = 0, so the model
 * is auto-scaled and re-centred. If a model faces the wrong way, change
 * MODEL_YAW in quarter turns.
 */
export const MODEL_URL = "/models/fortuner.glb";
const MODEL_LENGTH = 4.8; // metres, Fortuner bumper to bumper
const MODEL_YAW = 0; // radians, applied after auto-aligning the long axis to X

const WHEEL_NAME = /wheel|tire|tyre|rim/i;

// Door branding, in the car's frame (nose +X, wheels on y = 0). Centred
// between the wheel arches on the painted band above the black cladding,
// which starts at about x = -1.25 (rear) and x = +0.75 (front) below y = 0.8.
const BRAND_CENTER = { x: 0, y: 0.92 };
const BRAND_SIZE = new THREE.Vector3(1.8, 0.24, 0.5); // length, height, projection depth
const BRAND_PX = { w: 1024, h: 136 }; // same 7.5:1 aspect as BRAND_SIZE, so no stretch
const LOGO_URL = "/brand/srinivasa-logo.png";
const LOGO_PX = { x: 8, y: 6, h: 124 }; // logo slot at the left of the decal
const SHINE_EVERY = 5; // seconds between light sweeps across the door logo
const SHINE_FOR = 1.4; // seconds a sweep takes

export function ModelCar({ speed }: { speed: number }) {
  // Third arg: decode meshopt with the bundled decoder (no CDN fetch).
  const { scene } = useGLTF(MODEL_URL, false, true);
  const body = useRef<THREE.Group>(null);

  const { model, wheels, decals, brand } = useMemo(() => {
    const model = scene.clone(true);
    const wheels: THREE.Object3D[] = [];

    model.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          if ((m as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
            (m as THREE.MeshStandardMaterial).envMapIntensity = 1.4;
          }
        });
      }
      if (WHEEL_NAME.test(o.name) && !wheels.some((w) => isAncestor(w, o))) {
        wheels.push(o);
      }
    });

    // Align the long axis with X, scale to real length, sit on the road.
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    if (size.z > size.x) model.rotation.y = Math.PI / 2;
    model.rotation.y += MODEL_YAW;
    model.updateMatrixWorld(true);
    box.setFromObject(model);
    box.getSize(size);
    model.scale.setScalar(MODEL_LENGTH / Math.max(size.x, size.z));
    model.updateMatrixWorld(true);
    box.setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.x -= center.x;
    model.position.z -= center.z;
    model.position.y -= box.min.y;

    model.updateMatrixWorld(true);
    const brand = brandTexture();
    return {
      model,
      wheels: wheels.filter(spinsCleanly).map(axle),
      decals: brandDecals(model, brand.texture),
      brand,
    };
  }, [scene]);

  useFrame(({ clock }, dt) => {
    if (speed === 0) return;
    brand.shine(clock.getElapsedTime());
    wheels.forEach((w) => w.node.rotateOnAxis(w.axis, (dt * speed) / w.radius));
    if (body.current) {
      const t = clock.getElapsedTime();
      body.current.position.y = Math.sin(t * 9) * 0.006 + Math.sin(t * 2.3) * 0.005;
    }
  });

  return (
    <group ref={body}>
      <primitive object={model} />
      {decals.map((d) => (
        <primitive key={d.uuid} object={d} />
      ))}
    </group>
  );
}

/**
 * Logo and name on both doors. A ray finds the door skin, then the
 * decal is projected onto every opaque body mesh there (front and rear doors
 * are separate meshes) so the livery follows the body's curve. Decal
 * vertices come out in the car's frame, so they sit beside the model.
 */
function brandDecals(model: THREE.Object3D, map: THREE.Texture) {
  const material = new THREE.MeshStandardMaterial({
    map,
    transparent: true,
    roughness: 0.35,
    metalness: 0.2,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    depthWrite: false,
  });
  const isBody = (o: THREE.Object3D) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return false;
    const m = mesh.material as THREE.Material;
    return !m.transparent && !WHEEL_NAME.test(o.parent?.name ?? "");
  };
  const bodies: THREE.Mesh[] = [];
  model.traverse((o) => isBody(o) && bodies.push(o as THREE.Mesh));

  const ray = new THREE.Raycaster();
  return [1, -1].flatMap((side) => {
    ray.set(
      new THREE.Vector3(BRAND_CENTER.x, BRAND_CENTER.y, side * 5),
      new THREE.Vector3(0, 0, -side),
    );
    const hit = ray.intersectObjects(bodies, false)[0];
    if (!hit) return [];
    // Project inwards from the door; the far side is turned so it reads correctly.
    const orientation = new THREE.Euler(0, side > 0 ? 0 : Math.PI, 0);
    const reach = new THREE.Box3().setFromCenterAndSize(hit.point, BRAND_SIZE.clone().setZ(BRAND_SIZE.x));
    return bodies
      .filter((mesh) => reach.intersectsBox(new THREE.Box3().setFromObject(mesh)))
      .map((mesh) => new DecalGeometry(mesh, hit.point, orientation, BRAND_SIZE))
      .filter((g) => g.attributes.position.count > 0)
      .map((g) => new THREE.Mesh(g, material));
  });
}

/**
 * Door livery: the logo with "SRINIVASA TRAVELS" and the gold pinstripe
 * beside it. `shine(t)` sweeps a band of light across the logo every
 * SHINE_EVERY seconds, redrawing only while the band is passing.
 */
function brandTexture() {
  const c = document.createElement("canvas");
  c.width = BRAND_PX.w;
  c.height = BRAND_PX.h;
  const ctx = c.getContext("2d")!;
  const base = document.createElement("canvas");
  base.width = BRAND_PX.w;
  base.height = BRAND_PX.h;
  const bctx = base.getContext("2d")!;
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  const logo = new Image();
  let logoW = 0;
  const textX = () => (logoW ? LOGO_PX.x + logoW + 22 : 52);

  function drawBase() {
    bctx.clearRect(0, 0, BRAND_PX.w, BRAND_PX.h);
    if (logoW) bctx.drawImage(logo, LOGO_PX.x, LOGO_PX.y, logoW, LOGO_PX.h);
    const font =
      getComputedStyle(document.body).getPropertyValue("--font-poppins").trim() || "sans-serif";
    const x = textX();
    const room = BRAND_PX.w - x - 16;
    bctx.fillStyle = "#0b4ea2";
    bctx.textAlign = "left";
    bctx.textBaseline = "alphabetic";
    bctx.letterSpacing = "4px";
    // Shrink to fit beside the logo so no letter is clipped, whatever the font.
    let px = 76;
    do bctx.font = `600 ${px--}px ${font}`;
    while (bctx.measureText("SRINIVASA TRAVELS").width > room && px > 30);
    bctx.fillText("SRINIVASA TRAVELS", x, 80);
    // The brand's gold double pinstripe under the name.
    bctx.fillStyle = "#f4b400";
    bctx.fillRect(x, 98, room, 8);
    bctx.fillRect(x, 114, room * 0.62, 5);
    ctx.clearRect(0, 0, BRAND_PX.w, BRAND_PX.h);
    ctx.drawImage(base, 0, 0);
    texture.needsUpdate = true;
  }

  // Light band masked to the logo's own shape.
  const band = document.createElement("canvas");
  const bandCtx = band.getContext("2d")!;
  let shining = false;
  function shine(t: number) {
    if (!logoW) return;
    const phase = (t % SHINE_EVERY) / SHINE_FOR;
    if (phase > 1) {
      if (shining) {
        ctx.clearRect(0, 0, BRAND_PX.w, BRAND_PX.h);
        ctx.drawImage(base, 0, 0);
        texture.needsUpdate = true;
        shining = false;
      }
      return;
    }
    shining = true;
    band.width = logoW;
    band.height = LOGO_PX.h;
    const cx = -logoW * 0.4 + phase * logoW * 1.8;
    const g = bandCtx.createLinearGradient(cx - 40, 0, cx + 40, LOGO_PX.h * 0.35);
    g.addColorStop(0, "rgba(255,248,220,0)");
    g.addColorStop(0.5, "rgba(255,248,220,0.95)");
    g.addColorStop(1, "rgba(255,248,220,0)");
    bandCtx.globalCompositeOperation = "source-over";
    bandCtx.fillStyle = g;
    bandCtx.fillRect(0, 0, logoW, LOGO_PX.h);
    bandCtx.globalCompositeOperation = "destination-in";
    bandCtx.drawImage(logo, 0, 0, logoW, LOGO_PX.h);
    ctx.clearRect(0, 0, BRAND_PX.w, BRAND_PX.h);
    ctx.drawImage(base, 0, 0);
    ctx.drawImage(band, LOGO_PX.x, LOGO_PX.y);
    texture.needsUpdate = true;
  }

  drawBase(); // text first; the logo joins once it has loaded
  logo.onload = () => {
    logoW = Math.round((logo.naturalWidth / logo.naturalHeight) * LOGO_PX.h);
    drawBase();
  };
  logo.src = LOGO_URL;
  return { texture, shine };
}

/** Wheels only spin if their pivot sits at their centre — otherwise they'd orbit. */
function spinsCleanly(w: THREE.Object3D) {
  const box = new THREE.Box3().setFromObject(w);
  const c = box.getCenter(new THREE.Vector3());
  const r = box.getSize(new THREE.Vector3()).length() / 2;
  const pivot = w.getWorldPosition(new THREE.Vector3());
  return r > 0 && pivot.distanceTo(c) < r * 0.15;
}

/**
 * The axle is the wheel's thinnest dimension, in its local frame. It is
 * flipped to point along the car's -Z so a positive turn rolls the wheel
 * forward (+X); measured in the car's frame, before it joins the scene.
 */
function axle(w: THREE.Object3D) {
  const inv = new THREE.Matrix4().copy(w.matrixWorld).invert();
  const box = new THREE.Box3();
  w.traverse((o) => {
    const g = (o as THREE.Mesh).geometry;
    if (!g) return;
    g.computeBoundingBox();
    const m = new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld);
    box.union(g.boundingBox!.clone().applyMatrix4(m));
  });
  const s = box.getSize(new THREE.Vector3());
  const axis =
    s.x <= s.y && s.x <= s.z
      ? new THREE.Vector3(1, 0, 0)
      : s.y <= s.z
        ? new THREE.Vector3(0, 1, 0)
        : new THREE.Vector3(0, 0, 1);
  if (axis.clone().transformDirection(w.matrixWorld).z > 0) axis.negate();
  const radius = new THREE.Box3().setFromObject(w).getSize(new THREE.Vector3()).y / 2;
  return { node: w, axis, radius };
}

function isAncestor(a: THREE.Object3D, b: THREE.Object3D) {
  for (let p = b.parent; p; p = p.parent) if (p === a) return true;
  return false;
}

/** Falls back to `fallback` if the model file is missing or fails to parse. */
export class ModelBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("[hero] car model unavailable, using fallback:", error);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
