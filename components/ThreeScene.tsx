'use client';

import { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Plane, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Delay in ms before loading the 3D scene (allows critical rendering to complete)
const SCENE_LOAD_DELAY = 3000;

// Waving Topographic Digital Grid Mesh representing Data Flow & SEO indexing
function AnimatedMesh() {
    const meshRef = useRef<THREE.Mesh>(null);
    const geomRef = useRef<THREE.BufferGeometry>(null);
    
    // Wave math and mouse tracking interaction inside frame loop
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        
        // Track mouse position in normalized coordinate bounds (-1 to 1)
        const mx = state.pointer.x;
        const my = state.pointer.y;

        // Subtle tilt of the plane towards mouse
        if (meshRef.current) {
            meshRef.current.rotation.x = -Math.PI / 3.2 + my * 0.08;
            meshRef.current.rotation.y = Math.PI / 14 + mx * 0.08;
        }

        // Deform grid geometry vertices (topographic waves)
        if (geomRef.current) {
            const pos = geomRef.current.attributes.position;
            const count = pos.count;

            for (let i = 0; i < count; i++) {
                const x = pos.getX(i);
                const y = pos.getY(i);

                // Math wave equation: multiple sine waves for organic complexity
                const wave1 = Math.sin(x * 0.22 + time * 0.6) * Math.cos(y * 0.22 + time * 0.6) * 0.45;
                const wave2 = Math.sin(x * 0.08 - time * 0.3) * 0.25;
                
                // Mouse proximity swell (displacement effect under cursor)
                // Normalize mesh coordinate scale with screen-space coordinates
                const distanceToMouse = Math.sqrt(
                    Math.pow(x - (mx * 7), 2) + Math.pow(y - (my * 4), 2)
                );
                const mouseForce = Math.max(0, 2.5 - distanceToMouse * 0.6) * 0.3;

                // Set new Z coordinate
                pos.setZ(i, wave1 + wave2 + mouseForce);
            }
            
            pos.needsUpdate = true;
            geomRef.current.computeVertexNormals();
        }
    });

    return (
        <Plane
            ref={meshRef}
            args={[18, 12, 36, 24]}
            position={[1.5, -0.8, -1]}
            rotation={[-Math.PI / 3.2, 0, Math.PI / 14]}
        >
            <planeGeometry ref={geomRef} attach="geometry" />
            <meshStandardMaterial
                wireframe
                color="#f5df4a" // Yellow/Gold identity accent
                roughness={0.2}
                metalness={0.8}
            />
        </Plane>
    );
}

// Particle field floating behind the mesh for extra depth
function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 120;

    const [positions] = useState(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = (Math.random() - 0.5) * 20;     // X
            arr[i * 3 + 1] = (Math.random() - 0.5) * 15; // Y
            arr[i * 3 + 2] = (Math.random() - 0.8) * 8;  // Z
        }
        return arr;
    });

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#a855f7" // Purple accent glow
                size={0.06}
                sizeAttenuation
                transparent
                opacity={0.4}
            />
        </points>
    );
}

// Main 3D Scene
function Scene() {
    return (
        <>
            {/* Ambient base lighting */}
            <ambientLight intensity={0.15} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
            
            {/* Color Light Setup for reflecting gradient on the wireframe */}
            <pointLight position={[-8, 8, -2]} intensity={3.5} color="#a855f7" /> {/* Neon Purple */}
            <pointLight position={[8, -8, 4]} intensity={2.5} color="#f5df4a" />  {/* Gold */}
            <pointLight position={[0, -5, 2]} intensity={2} color="#06b6d4" />    {/* Cyber Cyan */}

            {/* Dynamic Mesh */}
            <AnimatedMesh />
            
            {/* Extra Depth Particles */}
            <ParticleField />

            {/* Camera Controls - subtle auto rotation */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.15}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />
        </>
    );
}

// Loading fallback
function Loader() {
    return (
        <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="#f5df4a" wireframe />
        </mesh>
    );
}

// Exported Wrapper Component
export default function ThreeScene() {
    const [isReady, setIsReady] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const checkMobile = window.innerWidth < 768;
        setIsMobile(checkMobile);

        if (!checkMobile) {
            setIsReady(true);
        }
    }, []);

    if (isMobile) {
        return null;
    }

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            contain: 'layout style paint',
        }}>
            {isReady && (
                <Canvas
                    dpr={[1, 1.5]}
                    camera={{ position: [0, 0, 7.5], fov: 45 }}
                    style={{ background: 'transparent' }}
                    gl={{ alpha: true, antialias: true }}
                >
                    <Suspense fallback={<Loader />}>
                        <Scene />
                    </Suspense>
                </Canvas>
            )}
        </div>
    );
}
