"use client";

import { Component, useMemo, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

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

export function ModelCar({ speed }: { speed: number }) {
  // Third arg: decode meshopt with the bundled decoder (no CDN fetch).
  const { scene } = useGLTF(MODEL_URL, false, true);
  const body = useRef<THREE.Group>(null);

  const { model, wheels } = useMemo(() => {
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
    return { model, wheels: wheels.filter(spinsCleanly).map(axle) };
  }, [scene]);

  useFrame(({ clock }, dt) => {
    if (speed === 0) return;
    wheels.forEach((w) => w.node.rotateOnAxis(w.axis, (dt * speed) / w.radius));
    if (body.current) {
      const t = clock.getElapsedTime();
      body.current.position.y = Math.sin(t * 9) * 0.006 + Math.sin(t * 2.3) * 0.005;
    }
  });

  return (
    <group ref={body}>
      <primitive object={model} />
    </group>
  );
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
