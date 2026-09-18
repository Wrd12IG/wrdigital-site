'use client';

import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
    MeshTransmissionMaterial, 
    RoundedBox, 
    Text, 
    ContactShadows, 
    Float,
    OrbitControls 
} from '@react-three/drei';
import * as THREE from 'three';

// --- Single 3D Glass Shell Primitive ---
function GlassPill({ 
    args = [2.2, 0.7, 0.35], 
    radius = 0.35, 
    children, 
    onClick, 
    hoverScale = 1.03,
    transmissionProps = {}
}: any) {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (!meshRef.current) return;
        const targetScale = hovered ? hoverScale : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });

    return (
        <group 
            ref={meshRef}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
            onClick={onClick}
        >
            {/* Outer Thick 3D Glass Lens */}
            <RoundedBox args={args} radius={radius} smoothness={8} castShadow receiveShadow>
                <MeshTransmissionMaterial
                    backside
                    samples={6}
                    resolution={256}
                    transmission={1}
                    roughness={0.03}
                    thickness={1.5}
                    ior={1.52}
                    chromaticAberration={0.08}
                    anisotropy={0.15}
                    distortion={0.12}
                    distortionScale={0.2}
                    temporalDistortion={0}
                    color="#ffffff"
                    attenuationDistance={1.2}
                    attenuationColor="#e2e8f0"
                    {...transmissionProps}
                />
            </RoundedBox>

            {/* Nested Content / Cores */}
            {children}
        </group>
    );
}

// --- 1. Start Project Button ---
function StartProjectButton({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <GlassPill args={[2.5, 0.8, 0.4]} radius={0.4}>
                {/* Inner High-Gloss Orange Core */}
                <RoundedBox args={[2.2, 0.58, 0.28]} radius={0.29} position={[0, 0, 0]}>
                    <meshPhysicalMaterial
                        color="#ff5511"
                        emissive="#d43800"
                        emissiveIntensity={0.25}
                        roughness={0.12}
                        metalness={0.1}
                        clearcoat={1}
                        clearcoatRoughness={0.05}
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
function SecondaryButton({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <GlassPill args={[1.8, 0.8, 0.4]} radius={0.4}>
                {/* Inner Frosted Clear Core */}
                <RoundedBox args={[1.56, 0.58, 0.25]} radius={0.29} position={[0, 0, 0]}>
                    <meshPhysicalMaterial
                        color="#f1f5f9"
                        roughness={0.2}
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
function PowerButton({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <GlassPill args={[0.8, 0.8, 0.4]} radius={0.25}>
                <Text
                    position={[0, 0, 0.1]}
                    fontSize={0.34}
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
function SearchBar({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <GlassPill args={[5.3, 0.82, 0.4]} radius={0.41}>
                {/* Inner Cutout */}
                <RoundedBox args={[4.2, 0.62, 0.28]} radius={0.31} position={[-0.4, 0, 0]}>
                    <meshPhysicalMaterial color="#ffffff" roughness={0.15} transmission={0.1} />
                </RoundedBox>
                
                {/* Search Text */}
                <Text
                    position={[-1.2, 0, 0.16]}
                    fontSize={0.2}
                    color="#475569"
                    anchorX="left"
                    anchorY="middle"
                >
                    🔍  With suggestions
                </Text>

                {/* Right Plus Button Cap */}
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
function SelectPill({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <GlassPill args={[3.2, 0.78, 0.38]} radius={0.39}>
                <Text
                    position={[-0.6, 0, 0.14]}
                    fontSize={0.21}
                    color="#334155"
                    anchorX="center"
                    anchorY="middle"
                >
                    ↻  Select
                </Text>

                {/* Green Checkbox Core */}
                <RoundedBox args={[0.55, 0.55, 0.28]} radius={0.14} position={[1.1, 0, 0]}>
                    <meshPhysicalMaterial
                        color="#059669"
                        emissive="#047857"
                        emissiveIntensity={0.2}
                        roughness={0.15}
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
function ToggleSwitch({ position }: { position: [number, number, number] }) {
    const [toggled, setToggled] = useState(true);
    const knobRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!knobRef.current) return;
        const targetX = toggled ? 0.45 : -0.45;
        knobRef.current.position.x = THREE.MathUtils.lerp(knobRef.current.position.x, targetX, 0.15);
    });

    return (
        <group position={position} onClick={() => setToggled(!toggled)}>
            {/* Emerald Translucent Jelly Glass Body */}
            <GlassPill 
                args={[1.7, 0.76, 0.38]} 
                radius={0.38}
                transmissionProps={{
                    color: '#0d9488',
                    attenuationColor: '#0f766e',
                    attenuationDistance: 0.5,
                    transmission: 0.9,
                    roughness: 0.05,
                    ior: 1.48
                }}
            >
                {/* 3D Ceramic Glossy Knob */}
                <group ref={knobRef} position={[0.45, 0, 0.05]}>
                    <cylinderGeometry args={[0.26, 0.26, 0.32, 32]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        roughness={0.1}
                        clearcoat={1}
                        clearcoatRoughness={0.05}
                    />
                </group>
            </GlassPill>
        </group>
    );
}

// --- 7. Tabs Pill ---
function TabsPill({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <GlassPill args={[2.5, 0.72, 0.36]} radius={0.36}>
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
function ToastPill({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <GlassPill args={[2.5, 0.72, 0.36]} radius={0.36}>
                {/* Inner Amber Bezel */}
                <RoundedBox args={[2.3, 0.54, 0.24]} radius={0.27} position={[0, 0, 0]}>
                    <meshPhysicalMaterial
                        color="#fef3c7"
                        roughness={0.2}
                        transmission={0.5}
                        thickness={0.6}
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
function PureGlassCard({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <GlassPill 
                args={[2.5, 1.8, 0.38]} 
                radius={0.35}
                transmissionProps={{
                    thickness: 2.2,
                    chromaticAberration: 0.12,
                    roughness: 0.02,
                    ior: 1.54
                }}
            >
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
function ProPlanDialog({ position }: { position: [number, number, number] }) {
    return (
        <group position={position}>
            <GlassPill args={[2.5, 1.8, 0.38]} radius={0.35}>
                {/* Title */}
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

                {/* Cobalt Blue Pro Plan Core Capsule */}
                <RoundedBox args={[2.1, 0.5, 0.26]} radius={0.25} position={[0, -0.42, 0]}>
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

// --- Scene Inner Component ---
function SceneInner() {
    return (
        <>
            {/* Studio Lighting */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[6, 8, 7]} intensity={2.2} castShadow shadow-mapSize={1024} />
            <directionalLight position={[-6, 4, 4]} intensity={1.0} color="#e0f2fe" />
            <pointLight position={[0, 3, 4]} intensity={1.5} />

            <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
                <group position={[0, 0, 0]}>
                    {/* Row 1: Start Project (y=2.2) */}
                    <StartProjectButton position={[-1.4, 2.2, 0]} />
                    <SecondaryButton position={[1.1, 2.2, 0]} />
                    <PowerButton position={[2.4, 2.2, 0]} />

                    {/* Row 2: Search Bar (y=1.1) */}
                    <SearchBar position={[0, 1.1, 0]} />

                    {/* Row 3: Select & Toggle (y=0.0) */}
                    <SelectPill position={[-1.0, 0.0, 0]} />
                    <ToggleSwitch position={[1.8, 0.0, 0]} />

                    {/* Row 4: Tabs & Toast (y=-1.0) */}
                    <TabsPill position={[-1.4, -1.0, 0]} />
                    <ToastPill position={[1.4, -1.0, 0]} />

                    {/* Row 5: Card & Pro Plan (y=-2.4) */}
                    <PureGlassCard position={[-1.4, -2.4, 0]} />
                    <ProPlanDialog position={[1.4, -2.4, 0]} />
                </group>
            </Float>

            {/* Soft Floor Shadow */}
            <ContactShadows 
                position={[0, -3.8, 0]} 
                opacity={0.6} 
                scale={14} 
                blur={2.5} 
                far={8} 
            />

            {/* 3D Orbit Controls */}
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

// --- Main 3D Canvas Stage ---
export default function LiquidGlass3DScene() {
    return (
        <div className="w-full h-[650px] md:h-[750px] relative rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-gradient-to-b from-[#f8fafc] via-[#e2e8f0] to-[#cbd5e1]">
            <Canvas
                shadows
                camera={{ position: [0, 0, 7.5], fov: 42 }}
                gl={{ alpha: true, antialias: true, toneMappingExposure: 1.1 }}
            >
                <Suspense fallback={null}>
                    <SceneInner />
                </Suspense>
            </Canvas>
        </div>
    );
}
