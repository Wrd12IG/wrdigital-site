'use client';

import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';

/* =============================================================================
   The UI kit as real geometry: each control is an extruded, bevelled slab of
   physical glass, so the backdrop is genuinely refracted and split into colour.
   1 world unit = 52 css px of the original layout. Kit = 10 x 11.88 units.

   Labels are baked into one canvas texture instead of GPU text: a dozen troika
   Text instances tear down the WebGL context next to the transmission pass.
============================================================================= */

const FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif';
const INK = '#23272c';
const BACKDROP = '#e9ebee';

const KIT_W = 10;
const KIT_H = 11.88;
const PPU = 200; // label texture pixels per world unit

/* ---------- shared materials: one shader per look -------------------------- */
const GLASS = new THREE.MeshPhysicalMaterial({
  transmission: 0.97,
  thickness: 1.2,
  ior: 1.5,
  dispersion: 4.5,
  roughness: 0.07,
  metalness: 0,
  clearcoat: 1,
  clearcoatRoughness: 0.04,
  iridescence: 0.35,
  iridescenceIOR: 1.35,
  iridescenceThicknessRange: [120, 420],
  attenuationDistance: 3.4,
  attenuationColor: new THREE.Color('#d8e7f9'),
  color: new THREE.Color('#ffffff'),
  specularIntensity: 1,
  envMapIntensity: 1.65,
});

const CORE = {
  orange: new THREE.MeshPhysicalMaterial({ color: '#f4571a', emissive: '#7a2200', emissiveIntensity: 0.2, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 }),
  blue: new THREE.MeshPhysicalMaterial({ color: '#1668d8', emissive: '#062a6b', emissiveIntensity: 0.2, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 }),
  green: new THREE.MeshPhysicalMaterial({ color: '#18b782', emissive: '#05543b', emissiveIntensity: 0.2, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05 }),
  mint: new THREE.MeshPhysicalMaterial({ color: '#25c48f', emissive: '#04624a', emissiveIntensity: 0.2, roughness: 0.14, clearcoat: 1, clearcoatRoughness: 0.05 }),
  ice: new THREE.MeshPhysicalMaterial({ color: '#cbdff5', roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.06 }),
  paper: new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.07, clearcoat: 1, clearcoatRoughness: 0.04 }),
  off: new THREE.MeshPhysicalMaterial({ color: '#dfe5ee', roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.06 }),
};
type CoreKey = keyof typeof CORE;

const INK_MAT = new THREE.MeshStandardMaterial({ color: INK, roughness: 0.42, metalness: 0 });
const WHITE_MAT = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.28 });
const AMBER_MAT = new THREE.MeshStandardMaterial({ color: '#e2803a', roughness: 0.3 });
const GREY_MAT = new THREE.MeshStandardMaterial({ color: '#5b616a', roughness: 0.5 });
const KNOB_MAT = new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.15, clearcoat: 1, clearcoatRoughness: 0.09 });

/* ---------- rounded-rectangle shape ---------------------------------------- */
function roundedShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  const rr = Math.max(0.01, Math.min(r, Math.min(w, h) / 2 - 0.001));
  s.moveTo(x + rr, y);
  s.lineTo(x + w - rr, y);
  s.absarc(x + w - rr, y + rr, rr, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + h - rr);
  s.absarc(x + w - rr, y + h - rr, rr, 0, Math.PI / 2, false);
  s.lineTo(x + rr, y + h);
  s.absarc(x + rr, y + h - rr, rr, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + rr);
  s.absarc(x + rr, y + rr, rr, Math.PI, Math.PI * 1.5, false);
  return s;
}

function useSlabGeometry(w: number, h: number, d: number, r: number, bevel = 0.18) {
  return useMemo(() => {
    const g = new THREE.ExtrudeGeometry(roundedShape(w - bevel * 2, h - bevel * 2, r - bevel), {
      depth: Math.max(0.02, d - bevel * 2),
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelOffset: 0,
      bevelSegments: 4,
      curveSegments: 20,
    });
    g.center();
    g.computeVertexNormals();
    return g;
  }, [w, h, d, r, bevel]);
}

/* ---------- glass slab ------------------------------------------------------ */
function Glass({
  w,
  h,
  d = 0.82,
  r,
  position,
  children,
  onClick,
}: {
  w: number;
  h: number;
  d?: number;
  r?: number;
  position: [number, number, number];
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const radius = r ?? Math.min(h / 2, w / 2);
  const geo = useSlabGeometry(w, h, d, radius);
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!group.current) return;
    const target = position[2] + (hovered ? 0.18 : 0);
    group.current.position.z += (target - group.current.position.z) * Math.min(1, dt * 8);
  });

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = onClick ? 'pointer' : 'auto';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <mesh geometry={geo} material={GLASS} castShadow />
      {children}
    </group>
  );
}

function Core({
  w,
  h,
  d = 0.34,
  r,
  tone,
  position = [0, 0, 0],
}: {
  w: number;
  h: number;
  d?: number;
  r?: number;
  tone: CoreKey;
  position?: [number, number, number];
}) {
  const radius = r ?? Math.min(h / 2, w / 2);
  const geo = useSlabGeometry(w, h, d, radius, 0.05);
  return <mesh geometry={geo} position={position} material={CORE[tone]} />;
}

/* ---------- icons ----------------------------------------------------------- */
function SearchIcon({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh material={INK_MAT}>
        <torusGeometry args={[0.145, 0.026, 10, 36]} />
      </mesh>
      <mesh position={[0.135, -0.135, 0]} rotation={[0, 0, Math.PI / 4]} material={INK_MAT}>
        <capsuleGeometry args={[0.026, 0.1, 4, 8]} />
      </mesh>
    </group>
  );
}

function PowerIcon({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 2 + 0.6]} material={INK_MAT}>
        <torusGeometry args={[0.2, 0.029, 10, 44, Math.PI * 1.6]} />
      </mesh>
      <mesh position={[0, 0.17, 0]} material={INK_MAT}>
        <capsuleGeometry args={[0.028, 0.16, 4, 8]} />
      </mesh>
    </group>
  );
}

function PlusIcon({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh material={INK_MAT}>
        <capsuleGeometry args={[0.027, 0.26, 4, 8]} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} material={INK_MAT}>
        <capsuleGeometry args={[0.027, 0.26, 4, 8]} />
      </mesh>
    </group>
  );
}

function HexIcon({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position} rotation={[0, 0, Math.PI / 6]} material={INK_MAT}>
      <torusGeometry args={[0.185, 0.027, 6, 6, Math.PI * 1.62]} />
    </mesh>
  );
}

function ChevronsIcon({ position }: { position: [number, number, number] }) {
  const arm = (x: number, y: number, rz: number, key: string) => (
    <mesh key={key} position={[x, y, 0]} rotation={[0, 0, rz]} material={INK_MAT}>
      <capsuleGeometry args={[0.025, 0.12, 4, 8]} />
    </mesh>
  );
  return (
    <group position={position}>
      {arm(-0.058, 0.095, -Math.PI / 4, 'ul')}
      {arm(0.058, 0.095, Math.PI / 4, 'ur')}
      {arm(-0.058, -0.095, Math.PI / 4, 'dl')}
      {arm(0.058, -0.095, -Math.PI / 4, 'dr')}
    </group>
  );
}

function CheckMark({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[-0.08, -0.05, 0]} rotation={[0, 0, Math.PI / 4]} material={WHITE_MAT}>
        <capsuleGeometry args={[0.032, 0.12, 4, 8]} />
      </mesh>
      <mesh position={[0.045, 0.015, 0]} rotation={[0, 0, -Math.PI / 3.3]} material={WHITE_MAT}>
        <capsuleGeometry args={[0.032, 0.26, 4, 8]} />
      </mesh>
    </group>
  );
}

function CloseIcon({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh rotation={[0, 0, Math.PI / 4]} material={GREY_MAT}>
        <capsuleGeometry args={[0.022, 0.19, 4, 8]} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]} material={GREY_MAT}>
        <capsuleGeometry args={[0.022, 0.19, 4, 8]} />
      </mesh>
    </group>
  );
}

function StarIcon({ position }: { position: [number, number, number] }) {
  const geo = useMemo(() => {
    const s = new THREE.Shape();
    const R = 0.2;
    const k = 0.055;
    s.moveTo(0, R);
    s.quadraticCurveTo(k, k, R, 0);
    s.quadraticCurveTo(k, -k, 0, -R);
    s.quadraticCurveTo(-k, -k, -R, 0);
    s.quadraticCurveTo(-k, k, 0, R);
    return new THREE.ExtrudeGeometry(s, { depth: 0.05, bevelEnabled: false, curveSegments: 14 });
  }, []);
  return <mesh geometry={geo} position={position} material={AMBER_MAT} />;
}

/* ---------- the amber wire ring inside Toast -------------------------------- */
function WireRing({ w, h, t = 0.028 }: { w: number; h: number; t?: number }) {
  const geo = useMemo(() => {
    const outer = roundedShape(w, h, h / 2);
    const inner = roundedShape(w - t * 2, h - t * 2, (h - t * 2) / 2);
    outer.holes.push(new THREE.Path(inner.getPoints(48).reverse()));
    return new THREE.ExtrudeGeometry(outer, { depth: 0.04, bevelEnabled: false, curveSegments: 24 });
  }, [w, h, t]);
  return <mesh geometry={geo} position={[0, 0, 0.1]} material={AMBER_MAT} />;
}

/* ---------- backdrop the glass refracts ------------------------------------- */
function Backdrop() {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 1024;
    const x = c.getContext('2d')!;
    const g = x.createRadialGradient(512, 180, 40, 512, 560, 880);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(0.45, '#f1f3f6');
    g.addColorStop(1, '#dcdfe5');
    x.fillStyle = g;
    x.fillRect(0, 0, 1024, 1024);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  return (
    <mesh position={[0, 0, -2.6]} receiveShadow>
      <planeGeometry args={[52, 52]} />
      <meshStandardMaterial map={tex} roughness={0.95} metalness={0} />
    </mesh>
  );
}

/* ---------- every label, baked into one crisp texture ----------------------- */
type L = { t: string; x: number; y: number; px: number; w?: number; c?: string; a?: CanvasTextAlign };

const LABELS: L[] = [
  { t: 'Start project', x: -2.692, y: 5.229, px: 74, w: 500, c: '#ffffff' },
  { t: 'Secondary', x: 1.557, y: 5.229, px: 71, w: 500 },
  { t: 'With suggestions', x: -3.6, y: 3.19, px: 71, w: 400, a: 'left' },
  { t: 'Select', x: -4.1, y: 1.094, px: 71, w: 500, a: 'left' },
  { t: 'Tabs', x: -2.545, y: -0.886, px: 71, w: 500 },
  { t: 'Toast', x: 2.688, y: -0.886, px: 71, w: 500 },
  { t: 'Card', x: -1.245, y: -5.341, px: 74, w: 500 },
  { t: 'Find files...', x: 0.698, y: -2.871, px: 78, w: 600, a: 'left' },
  { t: 'Add collaborator', x: 0.698, y: -3.521, px: 64, w: 400, c: '#5b616a', a: 'left' },
  { t: 'Pro plan', x: 2.548, y: -4.971, px: 72, w: 500, c: '#ffffff' },
];

function Labels() {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = Math.round(KIT_W * PPU);
    c.height = Math.round(KIT_H * PPU);
    const x = c.getContext('2d')!;
    x.clearRect(0, 0, c.width, c.height);
    x.textBaseline = 'middle';
    for (const l of LABELS) {
      x.font = `${l.w ?? 500} ${l.px}px ${FONT}`;
      x.fillStyle = l.c ?? INK;
      x.textAlign = l.a ?? 'center';
      x.fillText(l.t, (l.x + KIT_W / 2) * PPU, (KIT_H / 2 - l.y) * PPU);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.needsUpdate = true;
    return t;
  }, []);

  return (
    <mesh position={[0, 0, 0.58]} renderOrder={3}>
      <planeGeometry args={[KIT_W, KIT_H]} />
      <meshBasicMaterial map={tex} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

/* ---------- the kit --------------------------------------------------------- */
function Kit() {
  const [toggled, setToggled] = useState(true);
  const [checked, setChecked] = useState(true);
  const knob = useRef<THREE.Group>(null);
  const root = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();

  const scale = Math.min(1, viewport.width / 10.9, viewport.height / 12.9);

  useFrame((_, dt) => {
    if (knob.current) {
      const target = toggled ? 0.52 : -0.52;
      knob.current.position.x += (target - knob.current.position.x) * Math.min(1, dt * 10);
    }
    if (root.current) {
      const k = Math.min(1, dt * 3);
      root.current.rotation.y += (pointer.x * 0.12 - root.current.rotation.y) * k;
      root.current.rotation.x += (-pointer.y * 0.09 - root.current.rotation.x) * k;
    }
  });

  const F = 0.46;

  return (
    <group ref={root} scale={scale}>
      {/* ROW 1 */}
      <Glass w={4.615} h={1.423} position={[-2.692, 5.229, 0]}>
        <Core w={4.05} h={0.93} d={0.4} tone="orange" />
      </Glass>
      <Glass w={3.038} h={1.423} position={[1.557, 5.229, 0]}>
        <Core w={2.4} h={0.7} d={0.1} tone="ice" position={[0, -0.16, -0.22]} />
      </Glass>
      <Glass w={1.5} h={1.423} r={0.46} position={[4.25, 5.229, 0]}>
        <PowerIcon position={[0, 0, F]} />
      </Glass>

      {/* ROW 2 */}
      <Glass w={10} h={1.654} d={0.9} position={[0, 3.19, 0]}>
        <Core w={7.9} h={1.0} d={0.2} tone="paper" position={[-0.78, 0, 0.16]} />
        <SearchIcon position={[-4.06, 0, F + 0.08]} />
        <PlusIcon position={[4.1, 0, F + 0.08]} />
      </Glass>

      {/* ROW 3 */}
      <Glass w={7.0} h={1.538} position={[-1.5, 1.094, 0]} onClick={() => setChecked((v) => !v)}>
        <HexIcon position={[-2.95, 0, F]} />
        <group position={[2.72, 0, 0.1]}>
          <Core w={0.88} h={0.88} d={0.3} r={0.25} tone={checked ? 'green' : 'off'} />
          {checked && <CheckMark position={[0, 0, 0.22]} />}
        </group>
      </Glass>

      <Glass w={2.577} h={1.5} position={[3.712, 1.094, 0]} onClick={() => setToggled((v) => !v)}>
        <Core w={2.08} h={1.02} d={0.26} tone={toggled ? 'mint' : 'off'} position={[0, 0, -0.06]} />
        <group ref={knob} position={[toggled ? 0.52 : -0.52, 0, 0.16]}>
          <mesh material={KNOB_MAT}>
            <sphereGeometry args={[0.45, 32, 32]} />
          </mesh>
        </group>
      </Glass>

      {/* ROW 4 */}
      <Glass w={4.671} h={1.423} position={[-2.665, -0.886, 0]}>
        <ChevronsIcon position={[-0.75, 0, F]} />
      </Glass>

      <Glass w={4.904} h={1.423} position={[2.548, -0.886, 0]}>
        <WireRing w={4.3} h={0.98} />
        <StarIcon position={[-0.78, 0, F]} />
      </Glass>

      {/* ROW 5 */}
      <Glass w={4.671} h={3.846} d={1.05} r={0.68} position={[-2.665, -4.021, 0]} />

      <Glass w={4.904} h={3.846} d={1.05} r={0.68} position={[2.548, -4.021, 0]}>
        <CloseIcon position={[1.9, 1.15, 0.58]} />
        <group position={[0, -0.95, 0.16]}>
          <Core w={3.9} h={1.0} d={0.4} tone="blue" />
        </group>
      </Glass>

      <Labels />


    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      shadows="variance"
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 26], fov: 30 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <color attach="background" args={[BACKDROP]} />
      <Backdrop />

      <ambientLight intensity={0.5} />
      <directionalLight
        position={[-5, 9, 14]}
        intensity={1.9}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-radius={9}
        shadow-bias={-0.0009}
        shadow-camera-left={-11}
        shadow-camera-right={11}
        shadow-camera-top={11}
        shadow-camera-bottom={-11}
        shadow-camera-near={1}
        shadow-camera-far={40}
      />
      <directionalLight position={[7, -5, 7]} intensity={0.5} color="#cfe6ff" />

      <Environment resolution={128}>
        <Lightformer form="rect" intensity={8} position={[0, 7, 9]} scale={[16, 9, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={3} position={[-9, 2, 7]} scale={[6, 12, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2.4} position={[9, -2, 7]} scale={[6, 12, 1]} target={[0, 0, 0]} />
        <Lightformer form="circle" intensity={4} position={[2, -8, 6]} scale={7} color="#ffe6c9" target={[0, 0, 0]} />
        <Lightformer form="circle" intensity={3} position={[-6, -6, 6]} scale={6} color="#cfe9ff" target={[0, 0, 0]} />
      </Environment>

      <Kit />
    </Canvas>
  );
}
