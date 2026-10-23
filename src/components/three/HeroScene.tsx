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

function Road({ speed }: { speed: number }) {
  const tex = useRoadTexture();
  useFrame((_, dt) => {
    tex.offset.x += (dt * speed) / 16;
  });
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0.001, 0]} receiveShadow>
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
          </group>
        );
      })}
    </group>
  );
}

/** Distant skyline — dark towers with a scatter of lit windows. */
function Skyline() {
  const towers = useMemo(() => {
    const rand = mulberry32(7);
    return Array.from({ length: 34 }, (_, i) => ({
      x: -70 + i * 4.4 + rand() * 2,
      z: -30 - rand() * 14,
      w: 1.6 + rand() * 2.2,
      h: 4 + rand() * 16,
      lit: rand() > 0.45,
    }));
  }, []);
  return (
    <group>
      {towers.map((t, i) => (
        <mesh key={i} position={[t.x, t.h / 2, t.z]}>
          <boxGeometry args={[t.w, t.h, t.w]} />
          <meshStandardMaterial
            color="#0b2547"
            emissive={t.lit ? "#f4b400" : "#0b4ea2"}
            emissiveIntensity={t.lit ? 0.12 : 0.18}
            roughness={0.9}
          />
        </mesh>
      ))}
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
        position={[2.3, 0.8, 0]}
        target={target}
        angle={0.55}
        penumbra={0.8}
        intensity={30}
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
      </PresentationControls>

      <Road speed={speed} />
      <Streetlights speed={speed} />
      <Skyline />
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
