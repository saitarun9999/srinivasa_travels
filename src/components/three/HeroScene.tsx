"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  PresentationControls,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { ModelBoundary, ModelCar } from "./ModelCar";

const NIGHT = "#06294f";
const GOLD = "#f4b400";
const ROAD_LENGTH = 120;
const LAMP_SPACING = 9;
const LAMP_COUNT = 12;

/** Asphalt with the brand's dashed gold route line down the centre. */
function useRoadTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#0a1b33";
    ctx.fillRect(0, 0, 512, 128);
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fillRect(0, 6, 512, 3);
    ctx.fillRect(0, 119, 512, 3);
    ctx.fillStyle = GOLD;
    for (let x = 0; x < 512; x += 128) ctx.fillRect(x, 61, 72, 6);
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.set(ROAD_LENGTH / 16, 1);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, []);
}

function Road({ speed, z = 0 }: { speed: number; z?: number }) {
  const tex = useRoadTexture();
  useFrame((_, dt) => {
    tex.offset.x += (dt * speed) / 16;
  });
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.001, z]} receiveShadow>
      <planeGeometry args={[ROAD_LENGTH, 4.6]} />
      <meshStandardMaterial map={tex} roughness={0.85} metalness={0.1} />
    </mesh>
  );
}

function Streetlights({ speed }: { speed: number }) {
  const group = useRef<THREE.Group>(null);
  const span = LAMP_SPACING * LAMP_COUNT;
  useFrame((_, dt) => {
    group.current?.children.forEach((lamp) => {
      lamp.position.x -= dt * speed;
      if (lamp.position.x < -span / 2) lamp.position.x += span;
    });
  });
  return (
    <group ref={group}>
      {Array.from({ length: LAMP_COUNT * 2 }, (_, i) => {
        const side = i % 2 === 0 ? 1 : -1;
        const x = Math.floor(i / 2) * LAMP_SPACING - span / 2;
        return (
          <group key={i} position={[x, 0, side * 3.3]}>
            <mesh position={[0, 1.6, 0]}>
              <cylinderGeometry args={[0.04, 0.05, 3.2, 8]} />
              <meshStandardMaterial color="#1c2f4d" metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh position={[0, 3.2, -side * 0.45]} rotation-x={(side * Math.PI) / 2}>
              <cylinderGeometry args={[0.03, 0.03, 0.9, 6]} />
              <meshStandardMaterial color="#1c2f4d" />
            </mesh>
            <mesh position={[0, 3.15, -side * 0.85]}>
              <boxGeometry args={[0.32, 0.06, 0.16]} />
              <meshStandardMaterial
                color="#fff4d6"
                emissive="#ffd36b"
                emissiveIntensity={4}
                toneMapped={false}
              />
            </mesh>
            <group position={[0, 3.1, -side * 0.85]}>
              <Glow color="#ffd36b" scale={1.5} opacity={0.85} />
            </group>
            {/* Warm pool of light on the asphalt below the lamp */}
            <mesh rotation-x={-Math.PI / 2} position={[0, 0.006, -side * 1.3]}>
              <planeGeometry args={[4.2, 4.2]} />
              <meshBasicMaterial
                map={getGlowTexture()}
                color="#ffc65a"
                transparent
                opacity={0.5}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

const WIN_COLS = 16;
const WIN_ROWS = 32;
const WIN_CELL = 32; // px per window cell in the facade texture
const WIN_SIZE = 0.3; // world units per window cell
const WIN_COLORS = ["#ffd27a", "#ffd27a", "#ffc75a", "#fff1cf", "#fff1cf", "#9cc8ff"];

function drawWindow(
  ctx: CanvasRenderingContext2D,
  col: number,
  row: number,
  lit: boolean,
  rand: () => number,
) {
  const x = col * WIN_CELL;
  const y = row * WIN_CELL;
  ctx.fillStyle = "#081c38";
  ctx.fillRect(x, y, WIN_CELL, WIN_CELL);
  ctx.fillStyle = lit ? WIN_COLORS[Math.floor(rand() * WIN_COLORS.length)] : "#0b2445";
  ctx.fillRect(x + 7, y + 5, WIN_CELL - 14, WIN_CELL - 10);
  // Someone at the window: a dark head-and-shoulders silhouette.
  if (lit && rand() < 0.22) {
    const cx = x + 10 + rand() * (WIN_CELL - 20);
    ctx.fillStyle = "rgba(20, 24, 40, 0.85)";
    ctx.beginPath();
    ctx.arc(cx, y + 15, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(cx - 5.5, y + 19, 11, WIN_CELL - 24, [5, 5, 0, 0]);
    ctx.fill();
  }
}

/**
 * One shared office-facade texture (map + emissive) for every tower. When
 * `animate`, a few windows switch on or off every half second.
 */
function useWindowTexture(animate: boolean) {
  const facade = useMemo(() => {
    const rand = mulberry32(11);
    const c = document.createElement("canvas");
    c.width = WIN_COLS * WIN_CELL;
    c.height = WIN_ROWS * WIN_CELL;
    const ctx = c.getContext("2d")!;
    for (let row = 0; row < WIN_ROWS; row++) {
      // Whole floors tend to be lit or dark together, like real offices.
      const floorLit = rand() < 0.4;
      for (let col = 0; col < WIN_COLS; col++) {
        drawWindow(ctx, col, row, rand() < (floorLit ? 0.6 : 0.07), rand);
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return { tex, ctx, rand: mulberry32(23) };
  }, []);

  const since = useRef(0);
  useFrame((_, dt) => {
    if (!animate) return;
    since.current += dt;
    if (since.current < 0.5) return;
    since.current = 0;
    const { ctx, rand, tex } = facade;
    for (let i = 0; i < 6; i++) {
      const col = Math.floor(rand() * WIN_COLS);
      const row = Math.floor(rand() * WIN_ROWS);
      drawWindow(ctx, col, row, rand() < 0.45, rand);
    }
    tex.needsUpdate = true;
  });
  return facade.tex;
}

/** Box whose UVs tile the facade at a fixed window size, offset per tower. */
function towerGeometry(w: number, h: number, rand: () => number) {
  const g = new THREE.BoxGeometry(w, h, w);
  const uv = g.attributes.uv as THREE.BufferAttribute;
  const sx = w / (WIN_COLS * WIN_SIZE);
  const sy = h / (WIN_ROWS * WIN_SIZE);
  const ox = Math.floor(rand() * WIN_COLS) / WIN_COLS;
  const oy = Math.floor(rand() * WIN_ROWS) / WIN_ROWS;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, uv.getX(i) * sx + ox, uv.getY(i) * sy + oy);
  }
  return g;
}

/** Distant skyline — office towers with lit windows and blinking roof beacons. */
function Skyline({ animate }: { animate: boolean }) {
  const facade = useWindowTexture(animate);
  const towers = useMemo(() => {
    const rand = mulberry32(7);
    return Array.from({ length: 34 }, (_, i) => {
      const w = 1.6 + rand() * 2.2;
      const h = 4 + rand() * 16;
      return {
        x: -70 + i * 4.4 + rand() * 2,
        z: -30 - rand() * 14,
        h,
        geometry: towerGeometry(w, h, rand),
        beacon: h > 5.5 && h < 12.5 ? rand() * Math.PI * 2 : null,
      };
    });
  }, []);

  const beacons = useRef<(THREE.Object3D | null)[]>([]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    towers.forEach((tower, i) => {
      const b = beacons.current[i];
      if (b && tower.beacon !== null) {
        b.visible = !animate || Math.sin(t * 2.4 + tower.beacon) > 0.55;
      }
    });
  });

  return (
    <group>
      {towers.map((t, i) => (
        <group key={i} position={[t.x, 0, t.z]}>
          <mesh geometry={t.geometry} position-y={t.h / 2}>
            <meshStandardMaterial
              map={facade}
              emissiveMap={facade}
              emissive="#ffffff"
              emissiveIntensity={1.7}
              roughness={0.9}
            />
          </mesh>
          {t.beacon !== null && (
            <group ref={(el) => void (beacons.current[i] = el)} position-y={t.h + 0.12}>
              <mesh>
                <sphereGeometry args={[0.16, 8, 8]} />
                <meshBasicMaterial color="#ff3b3b" fog={false} toneMapped={false} />
              </mesh>
              {/* Beacons cut through the haze, so they ignore fog */}
              <Glow color="#ff3b3b" scale={3} fog={false} />
            </group>
          )}
        </group>
      ))}
    </group>
  );
}

/** Soft radial sprite used for lamp halos and beacons. */
let glowTexture: THREE.CanvasTexture | null = null;
function getGlowTexture() {
  if (glowTexture) return glowTexture;
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.45)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  glowTexture = new THREE.CanvasTexture(c);
  return glowTexture;
}

function Glow({
  color,
  scale,
  opacity = 1,
  fog = true,
}: {
  color: string;
  scale: number;
  opacity?: number;
  fog?: boolean;
}) {
  return (
    <sprite scale={[scale, scale, 1]}>
      <spriteMaterial
        map={getGlowTexture()}
        color={color}
        opacity={opacity}
        fog={fog}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </sprite>
  );
}

/** Long-exposure light trails of passing traffic along both road edges. */
function Traffic({ speed }: { speed: number }) {
  const streak = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 4;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 128, 0);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.85, "rgba(255,255,255,0.9)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 4);
    return new THREE.CanvasTexture(c);
  }, []);

  // Oncoming headlights on the far edge, overtaking tail lights on the near one.
  const lanes = useMemo(
    () => [
      { z: -2.05, color: "#fff1cf", rel: -(speed + 22), flip: true },
      { z: -2.05, color: "#fff1cf", rel: -(speed + 22), flip: true },
      { z: 2.1, color: "#ff3030", rel: 9, flip: false },
      { z: 2.1, color: "#ff3030", rel: 9, flip: false },
    ],
    [speed],
  );
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const rand = useMemo(() => mulberry32(5), []);

  useFrame((_, dt) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const lane = lanes[i];
      m.position.x += lane.rel * dt;
      const out = lane.rel < 0 ? m.position.x < -45 : m.position.x > 45;
      if (out) m.position.x = (lane.rel < 0 ? 45 : -45) + (lane.rel < 0 ? 1 : -1) * rand() * 40;
    });
  });

  if (speed === 0) return null;
  return (
    <group>
      {lanes.map((lane, i) => (
        <mesh
          key={i}
          ref={(el) => void (refs.current[i] = el)}
          position={[(i % 2) * 30 - 15, 0.42, lane.z]}
          scale-x={lane.flip ? -1 : 1}
        >
          <planeGeometry args={[3.2, 0.07]} />
          <meshBasicMaterial
            map={streak}
            color={lane.color}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// Light positions on the hero car, in its frame (nose +X, wheels on y = 0),
// measured from the model: headlamp lens spans x 1.90-2.19, y 0.73-1.09,
// z 0.46-0.80; the glow sits just proud of the lens face.
const HEADLIGHT = { x: 2.18, y: 0.94, z: 0.63 };
const TAILLIGHT = { x: -2.34, y: 1.0, z: 0.76 };

/** Gradient that fades along a cone's length (narrow end opaque). */
function useBeamTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 4;
    c.height = 128;
    const ctx = c.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, 0, 128);
    g.addColorStop(0, "rgba(255,255,255,0.9)");
    g.addColorStop(0.35, "rgba(255,255,255,0.3)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 4, 128);
    return new THREE.CanvasTexture(c);
  }, []);
}

/** Headlights on: lamp glare, soft beam cones, a pool on the road, tail lights. */
function CarLights() {
  const beam = useBeamTexture();
  return (
    <group>
      {[HEADLIGHT.z, -HEADLIGHT.z].map((z) => (
        <group key={z} position={[HEADLIGHT.x, HEADLIGHT.y, z]}>
          <Glow color="#f4f8ff" scale={0.55} />
          <Glow color="#cfe0ff" scale={1.8} opacity={0.45} />
          {/* Beam: open cone tilted slightly down towards the road */}
          <group rotation-z={-0.09}>
            <mesh position-x={3.2} rotation-z={Math.PI / 2}>
              <cylinderGeometry args={[0.09, 1.25, 6.4, 24, 1, true]} />
              <meshBasicMaterial
                map={beam}
                color="#dfeaff"
                transparent
                opacity={0.22}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        </group>
      ))}
      <mesh rotation-x={-Math.PI / 2} position={[6.2, 0.012, 0]}>
        <planeGeometry args={[8, 3.6]} />
        <meshBasicMaterial
          map={getGlowTexture()}
          color="#dfeaff"
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {[TAILLIGHT.z, -TAILLIGHT.z].map((z) => (
        <group key={z} position={[TAILLIGHT.x, TAILLIGHT.y, z]}>
          <Glow color="#ff2a2a" scale={0.5} />
          <Glow color="#ff2a2a" scale={1.3} opacity={0.4} />
        </group>
      ))}
    </group>
  );
}

const CAR_PAINTS = ["#d5dae2", "#2a2f38", "#c0242f", "#f3f5f9", "#2f6fc4", "#8a93a3", "#e0a21c"];

/** Sedan body shared by every background car (built once). */
let sedanGeometry: ReturnType<typeof buildSedanGeometry> | null = null;
const getSedanGeometry = () => (sedanGeometry ??= buildSedanGeometry());

/** Background traffic: the stylised sedan in a given paint. Faces +X. */
function TrafficCar({ paint, lit }: { paint: string; lit: boolean }) {
  const geo = getSedanGeometry();
  return (
    <group>
      <mesh geometry={geo.body} castShadow>
        <meshPhysicalMaterial color={paint} metalness={0.5} roughness={0.28} clearcoat={1} />
      </mesh>
      <mesh geometry={geo.cabin}>
        <meshPhysicalMaterial color="#0b1424" metalness={0.9} roughness={0.05} />
      </mesh>
      <mesh geometry={geo.roof}>
        <meshPhysicalMaterial color={paint} metalness={0.5} roughness={0.28} clearcoat={1} />
      </mesh>
      {[1.42, -1.42].flatMap((x) =>
        [0.8, -0.8].map((z) => (
          <mesh key={`${x}${z}`} position={[x, 0.36, z]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.36, 0.36, 0.26, 20]} />
            <meshStandardMaterial color="#0d0f14" roughness={0.8} />
          </mesh>
        )),
      )}
      {lit &&
        [0.66, -0.66].map((z) => (
          <group key={z}>
            <group position={[2.36, 0.78, z]}>
              <Glow color="#f4f8ff" scale={0.5} />
              <Glow color="#dfeaff" scale={1.8} opacity={0.4} />
            </group>
            <group position={[-2.36, 0.82, z]}>
              <Glow color="#ff2a2a" scale={0.5} opacity={0.9} />
            </group>
          </group>
        ))}
    </group>
  );
}

// Second carriageway behind the median: oncoming traffic, parked cars on the kerb.
const FAR_ROAD_Z = -7.4;
const ONCOMING = [
  { z: -6.25, x: 10, paint: 0, pace: 10 },
  { z: -8.55, x: 34, paint: 2, pace: 7 },
  { z: -6.25, x: 52, paint: 4, pace: 11 },
  { z: -8.55, x: -12, paint: 3, pace: 8 },
  { z: -6.25, x: -38, paint: 5, pace: 9 },
];
const PARKED_COUNT = 8;
const PARKED_SPAN = 120;

function CityTraffic({ speed }: { speed: number }) {
  const oncoming = useRef<(THREE.Group | null)[]>([]);
  const parked = useRef<THREE.Group>(null);
  const rand = useMemo(() => mulberry32(9), []);
  const parkedCars = useMemo(() => {
    const r = mulberry32(3);
    return Array.from({ length: PARKED_COUNT }, (_, i) => ({
      x: -PARKED_SPAN / 2 + i * (PARKED_SPAN / PARKED_COUNT) + r() * 6,
      paint: CAR_PAINTS[Math.floor(r() * CAR_PAINTS.length)],
      flip: r() < 0.5,
    }));
  }, []);

  useFrame((_, dt) => {
    if (speed === 0) return;
    oncoming.current.forEach((car, i) => {
      if (!car) return;
      // They drive towards us while the ground moves past at `speed`.
      car.position.x -= (speed + ONCOMING[i].pace) * dt;
      if (car.position.x < -60) car.position.x = 60 + rand() * 25;
    });
    parked.current?.children.forEach((car) => {
      car.position.x -= speed * dt;
      if (car.position.x < -PARKED_SPAN / 2) car.position.x += PARKED_SPAN;
    });
  });

  return (
    <group>
      {/* Median and far kerb */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, -3.7]} receiveShadow>
        <planeGeometry args={[ROAD_LENGTH, 2.8]} />
        <meshStandardMaterial color="#0f2442" roughness={0.9} />
      </mesh>
      <Road speed={speed} z={FAR_ROAD_Z} />
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.05, -10.6]} receiveShadow>
        <planeGeometry args={[ROAD_LENGTH, 1.8]} />
        <meshStandardMaterial color="#13294a" roughness={0.9} />
      </mesh>

      {ONCOMING.map((c, i) => (
        <group
          key={i}
          ref={(el) => void (oncoming.current[i] = el)}
          position={[c.x, 0, c.z]}
          rotation-y={Math.PI}
        >
          <TrafficCar paint={CAR_PAINTS[c.paint]} lit />
        </group>
      ))}

      <group ref={parked}>
        {parkedCars.map((c, i) => (
          <group key={i} position={[c.x, 0.05, -10.55]} rotation-y={c.flip ? Math.PI : 0} scale={0.95}>
            <TrafficCar paint={c.paint} lit={false} />
          </group>
        ))}
      </group>
    </group>
  );
}

function Wheel({
  position,
  speed,
}: {
  position: [number, number, number];
  speed: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.z -= (dt * speed) / 0.36;
  });
  return (
    <group position={position} ref={ref}>
      <mesh rotation-x={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.36, 0.36, 0.26, 32]} />
        <meshStandardMaterial color="#0d0f14" roughness={0.75} />
      </mesh>
      <mesh rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.22, 0.22, 0.28, 10]} />
        <meshStandardMaterial color="#c9ced6" metalness={1} roughness={0.25} />
      </mesh>
    </group>
  );
}

/** Extrudes a side-profile shape to `width`, centred on z. */
function extrude(shape: THREE.Shape, width: number, bevel: number) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth: width - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 5,
    curveSegments: 24,
  });
  g.translate(0, 0, -(width - bevel * 2) / 2);
  g.computeVertexNormals();
  return g;
}

function buildSedanGeometry() {
  const ARCH = 0.46;
  // Lower body: boot, beltline, bonnet, nose — wheel arches cut from the sill.
  const body = new THREE.Shape();
  body.moveTo(-2.22, 0.32);
  body.quadraticCurveTo(-2.34, 0.34, -2.33, 0.62);
  body.quadraticCurveTo(-2.3, 0.94, -2.05, 0.98);
  body.lineTo(-1.32, 1.02);
  body.lineTo(1.08, 1.02);
  body.quadraticCurveTo(1.7, 0.98, 2.12, 0.86);
  body.quadraticCurveTo(2.34, 0.8, 2.33, 0.56);
  body.quadraticCurveTo(2.32, 0.33, 2.18, 0.32);
  body.lineTo(1.42 + ARCH, 0.32);
  body.absarc(1.42, 0.36, ARCH, 0, Math.PI, false);
  body.lineTo(-1.42 + ARCH, 0.32);
  body.absarc(-1.42, 0.36, ARCH, 0, Math.PI, false);
  body.lineTo(-2.22, 0.32);

  // Glasshouse: raked windscreen, fastback-ish rear glass.
  const cabin = new THREE.Shape();
  cabin.moveTo(-1.3, 1.0);
  cabin.quadraticCurveTo(-1.0, 1.32, -0.72, 1.44);
  cabin.lineTo(0.38, 1.46);
  cabin.quadraticCurveTo(0.7, 1.36, 1.1, 1.0);
  cabin.lineTo(-1.3, 1.0);

  const roof = new THREE.Shape();
  roof.moveTo(-0.78, 1.43);
  roof.lineTo(0.42, 1.45);
  roof.lineTo(0.36, 1.5);
  roof.quadraticCurveTo(-0.2, 1.53, -0.74, 1.48);
  roof.lineTo(-0.78, 1.43);

  return {
    body: extrude(body, 1.84, 0.12),
    cabin: extrude(cabin, 1.5, 0.08),
    roof: extrude(roof, 1.46, 0.03),
  };
}

/** A stylised pearl-white executive sedan with the gold livery pinstripe. */
function Car({ speed }: { speed: number }) {
  const body = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!body.current || speed === 0) return;
    const t = clock.getElapsedTime();
    body.current.position.y = Math.sin(t * 9) * 0.008 + Math.sin(t * 2.3) * 0.006;
    body.current.rotation.x = Math.sin(t * 1.7) * 0.004;
  });

  const paint = (
    <meshPhysicalMaterial
      color="#f3f5f9"
      metalness={0.35}
      roughness={0.22}
      clearcoat={1}
      clearcoatRoughness={0.06}
    />
  );
  const glass = (
    <meshPhysicalMaterial color="#0b1424" metalness={0.9} roughness={0.05} />
  );
  const geo = useMemo(() => buildSedanGeometry(), []);

  return (
    <group>
      <group ref={body}>
        {/* Lower body, extruded from a sedan side profile */}
        <mesh geometry={geo.body} castShadow>
          {paint}
        </mesh>
        {/* Glasshouse with tumblehome, roof and pillars in body colour */}
        <mesh geometry={geo.cabin}>{glass}</mesh>
        <mesh geometry={geo.roof}>{paint}</mesh>
        {[0.74, -0.74].map((z) => (
          <mesh key={z} position={[-0.12, 1.22, z]} rotation-z={0.05}>
            <boxGeometry args={[0.09, 0.42, 0.04]} />
            {paint}
          </mesh>
        ))}
        {/* Gold pinstripe — the brand signature */}
        {[0.93, -0.93].map((z) => (
          <mesh key={z} position={[0, 0.8, z * 1.0]}>
            <boxGeometry args={[4.1, 0.025, 0.01]} />
            <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.9} metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Grille */}
        <mesh position={[2.34, 0.6, 0]}>
          <boxGeometry args={[0.02, 0.2, 0.9]} />
          <meshStandardMaterial color="#111827" metalness={0.9} roughness={0.3} />
        </mesh>
        {/* Headlights */}
        {[0.66, -0.66].map((z) => (
          <mesh key={z} position={[2.27, 0.78, z]} rotation-z={-0.35}>
            <boxGeometry args={[0.04, 0.09, 0.36]} />
            <meshStandardMaterial color="#fff" emissive="#e8f1ff" emissiveIntensity={6} toneMapped={false} />
          </mesh>
        ))}
        {/* Tail lights */}
        {[0.66, -0.66].map((z) => (
          <mesh key={z} position={[-2.3, 0.82, z]}>
            <boxGeometry args={[0.04, 0.08, 0.42]} />
            <meshStandardMaterial color="#ff2a2a" emissive="#ff1f1f" emissiveIntensity={4} toneMapped={false} />
          </mesh>
        ))}
      </group>

      <Wheel position={[1.42, 0.36, 0.8]} speed={speed} />
      <Wheel position={[1.42, 0.36, -0.8]} speed={speed} />
      <Wheel position={[-1.42, 0.36, 0.8]} speed={speed} />
      <Wheel position={[-1.42, 0.36, -0.8]} speed={speed} />

    </group>
  );
}

function HeadlightBeam() {
  const target = useMemo(() => {
    const o = new THREE.Object3D();
    o.position.set(8, 0, 0);
    return o;
  }, []);
  return (
    <>
      <primitive object={target} />
      <spotLight
        position={[2.3, 0.9, 0]}
        target={target}
        angle={0.55}
        penumbra={0.8}
        intensity={55}
        distance={14}
        color="#dfeaff"
      />
    </>
  );
}

/** Gentle camera drift that follows the pointer. */
function Rig() {
  const target = useMemo(() => new THREE.Vector3(0.4, 0.9, -0.6), []);
  useFrame(({ camera, pointer }, dt) => {
    const k = 1 - Math.exp(-dt * 2.5);
    camera.position.x += (8.6 + pointer.x * 1.4 - camera.position.x) * k;
    camera.position.y += (3.1 + pointer.y * 0.7 - camera.position.y) * k;
    camera.lookAt(target);
  });
  return null;
}

export default function HeroScene({ paused = false }: { paused?: boolean }) {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const speed = reducedMotion ? 0 : 14;

  return (
    <Canvas
      shadows="percentage"
      dpr={[1, 1.75]}
      frameloop={paused ? "never" : "always"}
      camera={{ position: [8.6, 3.1, 10.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
    >
      <fog attach="fog" args={[NIGHT, 16, 62]} />
      <ambientLight intensity={0.25} color="#7aa7ff" />
      <directionalLight position={[-6, 8, 4]} intensity={0.9} color="#bcd4ff" castShadow />
      <pointLight position={[0, 4, 3]} intensity={12} color={GOLD} distance={10} />

      <PresentationControls
        global={false}
        cursor
        snap
        speed={1.4}
        polar={[-0.05, 0.15]}
        azimuth={[-Math.PI / 3, Math.PI / 3]}
      >
        <ModelBoundary fallback={<Car speed={speed} />}>
          <Suspense fallback={<Car speed={speed} />}>
            <ModelCar speed={speed} />
          </Suspense>
        </ModelBoundary>
        <HeadlightBeam />
        <CarLights />
      </PresentationControls>

      <Road speed={speed} />
      <Streetlights speed={speed} />
      <Skyline animate={!reducedMotion} />
      <Traffic speed={speed} />
      <CityTraffic speed={speed} />
      <Sparkles count={60} scale={[30, 6, 14]} position={[0, 3, -2]} size={2.2} speed={0.3} color={GOLD} opacity={0.6} />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.7} scale={10} blur={2.4} far={2} frames={reducedMotion ? 1 : Infinity} />

      {/* Studio reflections built locally — no HDRI download */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 4, 1]} />
        <Lightformer intensity={1.2} color="#7fb0ff" position={[-6, 1.5, 2]} rotation-y={Math.PI / 2} scale={[8, 1.2, 1]} />
        <Lightformer intensity={1.4} color={GOLD} position={[6, 1, -2]} rotation-y={-Math.PI / 2} scale={[8, 0.6, 1]} />
        <Lightformer intensity={0.8} position={[0, 1, 8]} scale={[12, 2, 1]} />
      </Environment>

      <Rig />
    </Canvas>
  );
}

/** Tiny seeded PRNG so the skyline is identical on every visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
