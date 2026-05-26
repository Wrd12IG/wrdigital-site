'use client';

import { useRef, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ─── Types ───────────────────────────────────────────────────────────────────
interface SceneProps {
  mouse: { x: number; y: number };
  clicked: boolean;
  onClickDone: () => void;
}

// ─── Shared: click burst particles ───────────────────────────────────────────
function ClickBurst({ active, color }: { active: boolean; color: string }) {
  const ref = useRef<THREE.Points>(null);
  const time = useRef(0);
  const positions = useRef(new Float32Array(60 * 3));

  useEffect(() => {
    if (!active) return;
    for (let i = 0; i < 60; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      positions.current[i * 3] = Math.sin(phi) * Math.cos(theta);
      positions.current[i * 3 + 1] = Math.cos(phi);
      positions.current[i * 3 + 2] = Math.sin(phi) * Math.sin(theta);
    }
    time.current = 0;
  }, [active]);

  useFrame((_, delta) => {
    if (!ref.current || !active) return;
    time.current += delta;
    const scale = time.current * 4;
    ref.current.scale.setScalar(scale);
    const mat = ref.current.material as THREE.PointsMaterial;
    if (mat) mat.opacity = Math.max(0, 1 - time.current * 1.5);
  });

  if (!active) return null;
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.08} transparent depthWrite={false} />
    </points>
  );
}

// ─── 1. CAR ──────────────────────────────────────────────────────────────────
function CarScene({ mouse, clicked, onClickDone }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const burstRef = useRef(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.6,
      0.06
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.25,
      0.06
    );
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04 - 0.1;
  });

  useEffect(() => {
    if (clicked && !burstRef.current) {
      burstRef.current = true;
      setTimeout(() => { burstRef.current = false; onClickDone(); }, 700);
    }
  }, [clicked, onClickDone]);

  const carColor = '#cc2200';
  const windowColor = '#88ccff';

  return (
    <group ref={groupRef} scale={1.4}>
      {/* Body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[2.8, 0.55, 1.3]} />
        <meshStandardMaterial color={carColor} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 0.52, 0]} castShadow>
        <boxGeometry args={[1.6, 0.48, 1.1]} />
        <meshStandardMaterial color={carColor} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Windshield front */}
      <mesh position={[0.77, 0.55, 0]}>
        <boxGeometry args={[0.05, 0.42, 1.0]} />
        <meshStandardMaterial color={windowColor} transparent opacity={0.7} roughness={0} />
      </mesh>
      {/* Windshield back */}
      <mesh position={[-0.77, 0.55, 0]}>
        <boxGeometry args={[0.05, 0.42, 1.0]} />
        <meshStandardMaterial color={windowColor} transparent opacity={0.7} roughness={0} />
      </mesh>
      {/* Wheels */}
      {[[-1.0, -0.3, 0.7], [1.0, -0.3, 0.7], [-1.0, -0.3, -0.7], [1.0, -0.3, -0.7]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.32, 0.32, 0.2, 20]} />
            <meshStandardMaterial color="#111" roughness={0.9} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.18, 0.18, 0.22, 10]} />
            <meshStandardMaterial color="#666" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}
      {/* Headlights */}
      {[[1.41, 0.05, 0.42], [1.41, 0.05, -0.42]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.04, 0.12, 0.18]} />
          <meshStandardMaterial color="#ffffaa" emissive="#ffff44" emissiveIntensity={clicked ? 4 : 1.5} />
        </mesh>
      ))}
      {/* Exhaust glow */}
      <pointLight position={[-1.6, -0.2, 0]} color="#ff6600" intensity={clicked ? 8 : 1} distance={2} />
      <ClickBurst active={clicked} color="#ff3300" />
      <Sparkles count={20} scale={3} size={1} speed={0.3} color="#ffaa00" />
    </group>
  );
}

// ─── 2. ROBOT ─────────────────────────────────────────────────────────────────
function RobotScene({ mouse, clicked, onClickDone }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const eye1 = useRef<THREE.Mesh>(null);
  const eye2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.7, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.25, 0.06);
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.05;
    if (armL.current) armL.current.rotation.x = Math.sin(t * 2) * 0.35;
    if (armR.current) armR.current.rotation.x = -Math.sin(t * 2) * 0.35;
    const glowIntensity = clicked ? 6 : (Math.sin(t * 3) * 0.5 + 1.5);
    if (eye1.current) (eye1.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glowIntensity;
    if (eye2.current) (eye2.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glowIntensity;
  });

  useEffect(() => { if (clicked) setTimeout(onClickDone, 600); }, [clicked, onClickDone]);

  const metal = { color: '#a0b0c0', roughness: 0.3, metalness: 0.9 };
  const darkMetal = { color: '#334', roughness: 0.5, metalness: 0.7 };

  return (
    <group ref={groupRef} scale={1.1}>
      {/* Head */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <boxGeometry args={[0.8, 0.7, 0.7]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      {/* Eyes */}
      {[[-0.18, 1.66, 0.36], [0.18, 1.66, 0.36]].map(([x, y, z], i) => (
        <mesh key={i} ref={i === 0 ? eye1 : eye2} position={[x, y, z]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2} />
        </mesh>
      ))}
      {/* Antenna */}
      <mesh position={[0, 2.1, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh position={[0, 2.32, 0]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#ff0066" emissive="#ff0066" emissiveIntensity={clicked ? 6 : 2} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[1.0, 1.0, 0.65]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      {/* Chest panel */}
      <mesh position={[0, 0.75, 0.34]}>
        <boxGeometry args={[0.6, 0.55, 0.04]} />
        <meshStandardMaterial {...darkMetal} />
      </mesh>
      <mesh position={[0, 0.78, 0.37]}>
        <boxGeometry args={[0.35, 0.08, 0.02]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={2} />
      </mesh>
      {/* Left arm */}
      <group ref={armL} position={[-0.65, 0.95, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.28, 0.75, 0.28]} />
          <meshStandardMaterial {...metal} />
        </mesh>
        <mesh position={[0, -0.75, 0]}>
          <boxGeometry args={[0.22, 0.35, 0.22]} />
          <meshStandardMaterial {...darkMetal} />
        </mesh>
      </group>
      {/* Right arm */}
      <group ref={armR} position={[0.65, 0.95, 0]}>
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[0.28, 0.75, 0.28]} />
          <meshStandardMaterial {...metal} />
        </mesh>
        <mesh position={[0, -0.75, 0]}>
          <boxGeometry args={[0.22, 0.35, 0.22]} />
          <meshStandardMaterial {...darkMetal} />
        </mesh>
      </group>
      {/* Legs */}
      {[[-0.28, 0], [0.28, 0]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.2, z]} castShadow>
          <boxGeometry args={[0.32, 0.9, 0.32]} />
          <meshStandardMaterial {...metal} />
        </mesh>
      ))}
      {/* Feet */}
      {[[-0.28, -0.7], [0.28, -0.7]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.7, 0.06]}>
          <boxGeometry args={[0.36, 0.18, 0.5]} />
          <meshStandardMaterial {...darkMetal} />
        </mesh>
      ))}
      <pointLight position={[0, 1.6, 0.5]} color="#00ffff" intensity={clicked ? 6 : 2} distance={3} />
      <ClickBurst active={clicked} color="#00ffff" />
      <Sparkles count={30} scale={3.5} size={1.2} speed={0.5} color="#00ccff" />
    </group>
  );
}

// ─── 3. HOUSE ─────────────────────────────────────────────────────────────────
function HouseScene({ mouse, clicked, onClickDone }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const windowGlow = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.5, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.2, 0.05);
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.03 - 0.2;
    windowGlow.current.forEach((m, i) => {
      if (!m) return;
      const mat = m.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = clicked ? 6 : (Math.sin(t * 1.5 + i) * 0.5 + 1.8);
    });
  });

  useEffect(() => { if (clicked) setTimeout(onClickDone, 700); }, [clicked, onClickDone]);

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Base/ground */}
      <mesh position={[0, -1.05, 0]} receiveShadow>
        <boxGeometry args={[3.5, 0.12, 2.8]} />
        <meshStandardMaterial color="#3a5a2a" roughness={0.9} />
      </mesh>
      {/* Walls */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <boxGeometry args={[2.2, 1.5, 1.6]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.8} />
      </mesh>
      {/* Roof */}
      <mesh position={[0, 0.65, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.32, 0.9, 4]} />
        <meshStandardMaterial color="#8b3a2a" roughness={0.7} metalness={0.1} />
      </mesh>
      {/* Chimney */}
      <mesh position={[0.5, 0.85, -0.3]} castShadow>
        <boxGeometry args={[0.22, 0.55, 0.22]} />
        <meshStandardMaterial color="#7a4a3a" roughness={0.9} />
      </mesh>
      {/* Door */}
      <mesh position={[0, -0.52, 0.81]}>
        <boxGeometry args={[0.38, 0.55, 0.04]} />
        <meshStandardMaterial color="#5a3010" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.52, 0.84]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.1} />
      </mesh>
      {/* Windows */}
      {[[-0.55, -0.28, 0.81], [0.55, -0.28, 0.81]].map(([x, y, z], i) => (
        <mesh
          key={i}
          ref={el => { if (el) windowGlow.current[i] = el; }}
          position={[x, y, z]}
        >
          <boxGeometry args={[0.32, 0.3, 0.04]} />
          <meshStandardMaterial color="#ffeea0" emissive="#ffcc44" emissiveIntensity={2} transparent opacity={0.85} />
        </mesh>
      ))}
      {/* Garden path */}
      {[-0.3, 0, 0.3, 0.6].map((z, i) => (
        <mesh key={i} position={[0, -0.99, 0.95 + z]}>
          <boxGeometry args={[0.28, 0.04, 0.22]} />
          <meshStandardMaterial color="#c8bca8" roughness={0.95} />
        </mesh>
      ))}
      {/* Smoke particles from chimney */}
      <Sparkles count={15} scale={[0.4, 1, 0.4]} position={[0.5, 1.3, -0.3]} size={2} speed={0.8} color="#aaaaaa" opacity={0.4} />
      <pointLight position={[0, -0.3, 1.5]} color="#ffcc44" intensity={clicked ? 8 : 2} distance={3} />
      <ClickBurst active={clicked} color="#ffcc44" />
    </group>
  );
}

// ─── 4. BARBECUE ──────────────────────────────────────────────────────────────
function BarbecueScene({ mouse, clicked, onClickDone }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const fireRef = useRef<THREE.PointLight>(null);
  const grillRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.6, 0.06);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.2, 0.06);
    groupRef.current.position.y = Math.sin(t * 0.9) * 0.03 - 0.2;
    if (fireRef.current) {
      fireRef.current.intensity = clicked
        ? 12
        : Math.sin(t * 8) * 1.5 + 4;
    }
    if (grillRef.current && clicked) {
      grillRef.current.rotation.y += 0.04;
    }
  });

  useEffect(() => { if (clicked) setTimeout(onClickDone, 800); }, [clicked, onClickDone]);

  return (
    <group ref={groupRef} scale={1.2}>
      {/* Bowl */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <sphereGeometry args={[0.75, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="#222" roughness={0.3} metalness={0.8} side={THREE.DoubleSide} />
      </mesh>
      {/* Lid (slightly open) */}
      <mesh position={[0, 0.55, -0.1]} rotation={[0.35, 0, 0]} castShadow>
        <sphereGeometry args={[0.76, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} side={THREE.BackSide} />
      </mesh>
      {/* Grill grate */}
      <group ref={grillRef} position={[0, 0.22, 0]}>
        {[-0.5, -0.25, 0, 0.25, 0.5].map((x, i) => (
          <mesh key={`h${i}`} position={[x, 0, 0]}>
            <boxGeometry args={[0.04, 0.02, 1.3]} />
            <meshStandardMaterial color="#555" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {[-0.5, -0.25, 0, 0.25, 0.5].map((z, i) => (
          <mesh key={`v${i}`} position={[0, 0, z]}>
            <boxGeometry args={[1.3, 0.02, 0.04]} />
            <meshStandardMaterial color="#555" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>
      {/* Legs */}
      {[[-0.55, 0.65], [0.55, 0.65], [-0.55, -0.65], [0.55, -0.65]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.65, z]} rotation={[0, 0, x > 0 ? -0.12 : 0.12]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.3, 8]} />
          <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* Handle */}
      <mesh position={[0.82, 0.72, 0]}>
        <boxGeometry args={[0.25, 0.06, 0.06]} />
        <meshStandardMaterial color="#888" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Coals */}
      {[[-0.25, -0.08, -0.2], [0.2, -0.08, 0.15], [0, -0.08, 0.1], [-0.1, -0.08, 0.25]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#ff4400" emissive="#ff2200" emissiveIntensity={clicked ? 6 : 2} roughness={1} />
        </mesh>
      ))}
      {/* Food on grill */}
      {[[-0.3, 0.26, -0.15], [0.2, 0.26, 0.1], [-0.05, 0.26, 0.3]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.28, 0.06, 0.12]} />
          <meshStandardMaterial color={i === 0 ? '#8b3a00' : '#c05000'} roughness={0.9} />
        </mesh>
      ))}
      <pointLight ref={fireRef} position={[0, 0.2, 0]} color="#ff6600" intensity={4} distance={3} />
      {/* Smoke */}
      <Sparkles count={30} scale={[0.8, 1.5, 0.8]} position={[0, 0.8, 0]} size={3} speed={1} color="#999" opacity={0.3} />
      <ClickBurst active={clicked} color="#ff4400" />
    </group>
  );
}

// ─── 5. ROCKET ────────────────────────────────────────────────────────────────
function RocketScene({ mouse, clicked, onClickDone }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouse.x * 0.5, 0.05);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mouse.x * 0.08, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouse.y * 0.2 - 0.15, 0.05);
    groupRef.current.position.y = Math.sin(t * 1.4) * 0.07;
    if (flameRef.current) {
      flameRef.current.intensity = clicked ? 16 : Math.sin(t * 10) * 2 + 5;
    }
  });

  useEffect(() => { if (clicked) setTimeout(onClickDone, 700); }, [clicked, onClickDone]);

  return (
    <group ref={groupRef} scale={1.15} rotation={[0.15, 0, 0]}>
      {/* Main body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.42, 2.2, 20]} />
        <meshStandardMaterial color="#e8e8f0" roughness={0.15} metalness={0.9} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 1.55, 0]} castShadow>
        <coneGeometry args={[0.35, 0.85, 20]} />
        <meshStandardMaterial color="#cc1133" roughness={0.2} metalness={0.7} />
      </mesh>
      {/* Window */}
      <mesh position={[0, 0.55, 0.42]}>
        <circleGeometry args={[0.18, 24]} />
        <meshStandardMaterial color="#88ddff" emissive="#22aaff" emissiveIntensity={clicked ? 5 : 1.5} transparent opacity={0.9} />
      </mesh>
      {/* Window ring */}
      <mesh position={[0, 0.55, 0.41]}>
        <torusGeometry args={[0.19, 0.03, 8, 24]} />
        <meshStandardMaterial color="#aaa" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Fins */}
      {[0, 120, 240].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh
            key={i}
            position={[Math.sin(rad) * 0.42, -0.8, Math.cos(rad) * 0.42]}
            rotation={[0, -rad, 0]}
            castShadow
          >
            <boxGeometry args={[0.06, 0.65, 0.45]} />
            <meshStandardMaterial color="#cc1133" roughness={0.3} metalness={0.6} />
          </mesh>
        );
      })}
      {/* Nozzle */}
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 0.28, 16]} />
        <meshStandardMaterial color="#888" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Flame */}
      <mesh position={[0, -1.38, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.18, 0.6, 12]} />
        <meshStandardMaterial color="#ff6600" emissive="#ffaa00" emissiveIntensity={clicked ? 6 : 3} transparent opacity={0.85} />
      </mesh>
      <pointLight ref={flameRef} position={[0, -1.4, 0]} color="#ff6600" intensity={5} distance={4} />
      {/* Exhaust trail */}
      <Sparkles count={40} scale={[0.5, 1.2, 0.5]} position={[0, -1.5, 0]} size={2} speed={2} color="#ff8800" opacity={0.5} />
      <ClickBurst active={clicked} color="#ffaa00" />
    </group>
  );
}

// ─── Scene wrapper with camera & lighting ─────────────────────────────────────
function SceneContent({ sceneIndex, mouse, clicked, onClickDone }: { sceneIndex: number } & SceneProps) {
  const scenes = [CarScene, RobotScene, HouseScene, BarbecueScene, RocketScene];
  const SceneComponent = scenes[sceneIndex];

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-4, 2, -4]} intensity={0.4} color="#8888ff" />
      <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.08}>
        <SceneComponent mouse={mouse} clicked={clicked} onClickDone={onClickDone} />
      </Float>
    </>
  );
}

// ─── Labels ──────────────────────────────────────────────────────────────────
const SCENE_LABELS = ['Car', 'Robot', 'House', 'BBQ', 'Rocket'];
const SCENE_COLORS = ['#ff3300', '#00ccff', '#ffcc44', '#ff6600', '#cc1133'];

// ─── Picker UI ───────────────────────────────────────────────────────────────
function ScenePicker({ current, onChange }: { current: number; onChange: (i: number) => void }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '1.8rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '0.6rem',
      zIndex: 10,
      background: 'rgba(0,0,0,0.55)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '999px',
      padding: '0.45rem 0.9rem',
      alignItems: 'center',
    }}>
      {SCENE_LABELS.map((label, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          title={label}
          style={{
            width: current === i ? '2.8rem' : '0.65rem',
            height: '0.65rem',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            background: current === i ? SCENE_COLORS[i] : 'rgba(255,255,255,0.25)',
            boxShadow: current === i ? `0 0 10px ${SCENE_COLORS[i]}88` : 'none',
            transition: 'all 0.3s ease',
            fontSize: current === i ? '0.6rem' : '0',
            color: '#fff',
            fontWeight: 700,
            letterSpacing: '0.03em',
            overflow: 'hidden',
            padding: 0,
          }}
        >
          {current === i ? label : ''}
        </button>
      ))}
    </div>
  );
}

// ─── Click hint ───────────────────────────────────────────────────────────────
function ClickHint({ visible }: { visible: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      color: 'rgba(255,255,255,0.45)',
      fontSize: '0.7rem',
      fontFamily: 'monospace',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      opacity: visible ? 1 : 0,
      transition: 'opacity 1s ease',
      pointerEvents: 'none',
    }}>
      click to interact
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function ThreeWallpaper({ style }: { style?: React.CSSProperties }) {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    // Only trigger clicked state if clicking on the actual canvas area or container
    if (containerRef.current && containerRef.current.contains(e.target as Node)) {
      // Prevent trigger if clicking on the picker dots
      if ((e.target as HTMLElement).tagName === 'BUTTON') return;
      
      setClicked(true);
      setShowHint(false);
    }
  }, [clicked]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
    };
  }, [handleMouseMove, handleClick]);

  // Auto-hide hint after 4s
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const onClickDone = useCallback(() => setClicked(false), []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        cursor: 'grab',
        ...style,
      }}
      onMouseDown={(e) => {
        // Change cursor to grabbing during click/drag
        if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
      }}
      onMouseUp={() => {
        if (containerRef.current) containerRef.current.style.cursor = 'grab';
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent
            sceneIndex={sceneIndex}
            mouse={mouse}
            clicked={clicked}
            onClickDone={onClickDone}
          />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.6}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
      <ScenePicker current={sceneIndex} onChange={setSceneIndex} />
      <ClickHint visible={showHint} />
    </div>
  );
}
