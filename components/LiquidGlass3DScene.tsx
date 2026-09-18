'use client';

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
    RoundedBox, 
    Text, 
    ContactShadows, 
    Float,
    OrbitControls 
} from '@react-three/drei';
import * as THREE from 'three';

// --- Shared High-Performance Optical Glass Material ---
// Uses native hardware-accelerated WebGL2 Physical Transmission (zero FBO stalls)
function useOpticalGlassMaterial(options = {}) {
    return useMemo(() => new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#ffffff'),
        transmission: 0.95,
        opacity: 1,
        transparent: true,
        roughness: 0.03,
        ior: 1.52,
        thickness: 1.4,
        specularIntensity: 1.0,
        specularColor: new THREE.Color('#ffffff'),
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        attenuationColor: new THREE.Color('#e0f2fe'),
        attenuationDistance: 1.5,
        ...options
    }), [options]);
}

// --- Glass Pill Shell ---
function GlassPill({ 
    args = [2.2, 0.7, 0.35], 
    radius = 0.35, 
    children, 
    material,
    hoverScale = 1.03
}: any) {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (!meshRef.current) return;
        const target = hovered ? hoverScale : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15);
    });

    return (
        <group 
            ref={meshRef}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        >
            <RoundedBox args={args} radius={radius} smoothness={6} material={material} castShadow receiveShadow />
            {children}
        </group>
    );
}

// --- 1. Start Project Button ---
function StartProjectButton({ position, glassMat }: any) {
    return (
        <group position={position}>
            <GlassPill args={[2.5, 0.8, 0.38]} radius={0.39} material={glassMat}>
                {/* Inner Orange Core */}
                <RoundedBox args={[2.2, 0.58, 0.26]} radius={0.29} position={[0, 0, 0]}>
                    <meshPhysicalMaterial
                        color="#ff5511"
                        emissive="#d43800"
                        emissiveIntensity={0.3}
                        roughness={0.1}
                        metalness={0.05}
                        clearcoat={1}
                    />
                </RoundedBox>
                <Text
                    position={[0, 0, 0.16]}
                    fontSize={0.22}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    Start project
                </Text>
            </GlassPill>
        </group>
    );
}

// --- 2. Secondary Button ---
function SecondaryButton({ position, glassMat }: any) {
    return (
        <group position={position}>
            <GlassPill args={[1.8, 0.8, 0.38]} radius={0.39} material={glassMat}>
                <RoundedBox args={[1.56, 0.58, 0.24]} radius={0.29} position={[0, 0, 0]}>
                    <meshPhysicalMaterial
                        color="#f8fafc"
                        roughness={0.15}
                        transmission={0.4}
                        thickness={0.5}
                        ior={1.4}
                    />
                </RoundedBox>
                <Text
                    position={[0, 0, 0.16]}
                    fontSize={0.2}
                    color="#1e293b"
                    anchorX="center"
                    anchorY="middle"
                >
                    Secondary
                </Text>
            </GlassPill>
        </group>
    );
}

// --- 3. Power Button ---
function PowerButton({ position, glassMat }: any) {
    return (
        <group position={position}>
            <GlassPill args={[0.8, 0.8, 0.38]} radius={0.25} material={glassMat}>
                <Text
                    position={[0, 0, 0.1]}
                    fontSize={0.32}
                    color="#334155"
                    anchorX="center"
                    anchorY="middle"
                >
                    ⏻
                </Text>
            </GlassPill>
        </group>
    );
}

// --- 4. Search Bar ---
function SearchBar({ position, glassMat }: any) {
    return (
        <group position={position}>
            <GlassPill args={[5.3, 0.82, 0.38]} radius={0.4} material={glassMat}>
                {/* Inner Cutout */}
                <RoundedBox args={[4.2, 0.62, 0.26]} radius={0.3} position={[-0.4, 0, 0]}>
                    <meshPhysicalMaterial color="#ffffff" roughness={0.1} transmission={0.1} />
                </RoundedBox>
                
                <Text
                    position={[-1.2, 0, 0.16]}
                    fontSize={0.2}
                    color="#475569"
                    anchorX="left"
                    anchorY="middle"
                >
                    🔍  With suggestions
                </Text>

                <Text
                    position={[2.1, 0, 0.16]}
                    fontSize={0.28}
                    color="#334155"
                    anchorX="center"
                    anchorY="middle"
                >
                    +
                </Text>
            </GlassPill>
        </group>
    );
}

// --- 5. Select Pill ---
function SelectPill({ position, glassMat }: any) {
    return (
        <group position={position}>
            <GlassPill args={[3.2, 0.78, 0.36]} radius={0.38} material={glassMat}>
                <Text
                    position={[-0.6, 0, 0.14]}
                    fontSize={0.21}
                    color="#334155"
                    anchorX="center"
                    anchorY="middle"
                >
                    ↻  Select
                </Text>

                <RoundedBox args={[0.52, 0.52, 0.26]} radius={0.14} position={[1.1, 0, 0]}>
                    <meshPhysicalMaterial
                        color="#059669"
                        emissive="#047857"
                        emissiveIntensity={0.2}
                        roughness={0.1}
                        clearcoat={0.8}
                    />
                </RoundedBox>
                <Text
                    position={[1.1, 0, 0.18]}
                    fontSize={0.26}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    ✓
                </Text>
            </GlassPill>
        </group>
    );
}

// --- 6. Emerald Toggle Switch ---
function ToggleSwitch({ position, emeraldMat }: any) {
    const [toggled, setToggled] = useState(true);
    const knobRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!knobRef.current) return;
        const targetX = toggled ? 0.45 : -0.45;
        knobRef.current.position.x = THREE.MathUtils.lerp(knobRef.current.position.x, targetX, 0.15);
    });

    return (
        <group position={position} onClick={() => setToggled(!toggled)}>
            <GlassPill args={[1.7, 0.76, 0.36]} radius={0.38} material={emeraldMat}>
                <group ref={knobRef} position={[0.45, 0, 0.05]}>
                    <cylinderGeometry args={[0.26, 0.26, 0.3, 24]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        roughness={0.1}
                        clearcoat={1}
                    />
                </group>
            </GlassPill>
        </group>
    );
}

// --- 7. Tabs Pill ---
function TabsPill({ position, glassMat }: any) {
    return (
        <group position={position}>
            <GlassPill args={[2.5, 0.72, 0.35]} radius={0.35} material={glassMat}>
                <Text
                    position={[0, 0, 0.14]}
                    fontSize={0.2}
                    color="#334155"
                    anchorX="center"
                    anchorY="middle"
                >
                    ⬍  Tabs
                </Text>
            </GlassPill>
        </group>
    );
}

// --- 8. Toast Pill ---
function ToastPill({ position, glassMat }: any) {
    return (
        <group position={position}>
            <GlassPill args={[2.5, 0.72, 0.35]} radius={0.35} material={glassMat}>
                <RoundedBox args={[2.3, 0.54, 0.22]} radius={0.26} position={[0, 0, 0]}>
                    <meshPhysicalMaterial
                        color="#fef3c7"
                        roughness={0.2}
                        transmission={0.4}
                        thickness={0.5}
                    />
                </RoundedBox>
                <Text
                    position={[0, 0, 0.15]}
                    fontSize={0.2}
                    color="#334155"
                    anchorX="center"
                    anchorY="middle"
                >
                    ✨  Toast
                </Text>
            </GlassPill>
        </group>
    );
}

// --- 9. Pure Crystal Card ---
function PureGlassCard({ position, glassMat }: any) {
    return (
        <group position={position}>
            <GlassPill args={[2.5, 1.8, 0.36]} radius={0.35} material={glassMat}>
                <Text
                    position={[0.7, -0.55, 0.14]}
                    fontSize={0.22}
                    color="#334155"
                    anchorX="center"
                    anchorY="middle"
                >
                    Card
                </Text>
            </GlassPill>
        </group>
    );
}

// --- 10. Pro Plan Dialog Window ---
function ProPlanDialog({ position, glassMat }: any) {
    return (
        <group position={position}>
            <GlassPill args={[2.5, 1.8, 0.36]} radius={0.35} material={glassMat}>
                <Text
                    position={[-0.9, 0.55, 0.14]}
                    fontSize={0.18}
                    color="#0f172a"
                    anchorX="left"
                    anchorY="middle"
                >
                    Find files...
                </Text>
                <Text
                    position={[-0.9, 0.32, 0.14]}
                    fontSize={0.14}
                    color="#64748b"
                    anchorX="left"
                    anchorY="middle"
                >
                    Add collaborator
                </Text>
                <Text
                    position={[0.9, 0.55, 0.14]}
                    fontSize={0.16}
                    color="#64748b"
                    anchorX="right"
                    anchorY="middle"
                >
                    ✕
                </Text>

                <RoundedBox args={[2.1, 0.5, 0.24]} radius={0.24} position={[0, -0.42, 0]}>
                    <meshPhysicalMaterial
                        color="#0284c7"
                        emissive="#0369a1"
                        emissiveIntensity={0.25}
                        roughness={0.1}
                        clearcoat={1}
                    />
                </RoundedBox>
                <Text
                    position={[0, -0.42, 0.16]}
                    fontSize={0.18}
                    color="#ffffff"
                    anchorX="center"
                    anchorY="middle"
                >
                    Pro plan
                </Text>
            </GlassPill>
        </group>
    );
}

// --- 3D Scene Assembly ---
function SceneContainer() {
    const glassMat = useOpticalGlassMaterial();
    const emeraldMat = useOpticalGlassMaterial({
        color: new THREE.Color('#0d9488'),
        attenuationColor: new THREE.Color('#0f766e'),
        attenuationDistance: 0.6,
        roughness: 0.04
    });

    return (
        <>
            <ambientLight intensity={1.4} />
            <directionalLight position={[6, 9, 8]} intensity={2.5} castShadow shadow-mapSize={512} />
            <directionalLight position={[-6, 4, 4]} intensity={1.2} color="#e0f2fe" />
            <pointLight position={[0, 4, 5]} intensity={1.8} />

            <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.1}>
                <group position={[0, 0, 0]}>
                    <StartProjectButton position={[-1.4, 2.2, 0]} glassMat={glassMat} />
                    <SecondaryButton position={[1.1, 2.2, 0]} glassMat={glassMat} />
                    <PowerButton position={[2.4, 2.2, 0]} glassMat={glassMat} />

                    <SearchBar position={[0, 1.1, 0]} glassMat={glassMat} />

                    <SelectPill position={[-1.0, 0.0, 0]} glassMat={glassMat} />
                    <ToggleSwitch position={[1.8, 0.0, 0]} emeraldMat={emeraldMat} />

                    <TabsPill position={[-1.4, -1.0, 0]} glassMat={glassMat} />
                    <ToastPill position={[1.4, -1.0, 0]} glassMat={glassMat} />

                    <PureGlassCard position={[-1.4, -2.4, 0]} glassMat={glassMat} />
                    <ProPlanDialog position={[1.4, -2.4, 0]} glassMat={glassMat} />
                </group>
            </Float>

            <ContactShadows 
                position={[0, -3.8, 0]} 
                opacity={0.55} 
                scale={14} 
                blur={2.2} 
                far={7} 
            />

            <OrbitControls 
                enableZoom={false} 
                maxPolarAngle={Math.PI / 1.8} 
                minPolarAngle={Math.PI / 2.4}
                maxAzimuthAngle={Math.PI / 8}
                minAzimuthAngle={-Math.PI / 8}
            />
        </>
    );
}

// --- Main Export ---
export default function LiquidGlass3DScene() {
    return (
        <div className="w-full h-[650px] md:h-[750px] relative rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]">
            <Canvas
                shadows
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 7.5], fov: 42 }}
                gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
            >
                <SceneContainer />
            </Canvas>
        </div>
    );
}
