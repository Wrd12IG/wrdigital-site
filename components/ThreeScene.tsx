'use client';

import { useRef, useMemo, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Delay in ms before loading the 3D scene (allows critical rendering to complete)
const SCENE_LOAD_DELAY = 3000;

// Animated floating sphere with distortion
function AnimatedSphere({ position, color, speed = 1, distort = 0.3 }: {
    position: [number, number, number];
    color: string;
    speed?: number;
    distort?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={distort}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    );
}

// Rotating torus (ring)
function AnimatedTorus({ position, color }: {
    position: [number, number, number];
    color: string;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
            <Torus ref={meshRef} args={[1, 0.3, 16, 100]} position={position}>
                <meshStandardMaterial
                    color={color}
                    roughness={0.3}
                    metalness={0.9}
                    wireframe
                />
            </Torus>
        </Float>
    );
}

// Floating cubes
function FloatingCubes() {
    const cubesRef = useRef<THREE.Group>(null);

    const cubeData = useMemo(() => [
        { position: [-3, 2, -2] as [number, number, number], color: '#f5df4a', scale: 0.4 },
        { position: [3.5, -1.5, -1] as [number, number, number], color: '#d4c03a', scale: 0.3 },
        { position: [-2, -2, 1] as [number, number, number], color: '#f5df4a', scale: 0.25 },
        { position: [2, 2.5, 0] as [number, number, number], color: '#d4c03a', scale: 0.35 },
        { position: [0, -3, -2] as [number, number, number], color: '#f5df4a', scale: 0.2 },
    ], []);

    useFrame((state) => {
        if (cubesRef.current) {
            cubesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={cubesRef}>
            {cubeData.map((cube, index) => (
                <Float
                    key={index}
                    speed={1 + index * 0.2}
                    rotationIntensity={0.5}
                    floatIntensity={1}
                >
                    <Box
                        args={[1, 1, 1]}
                        position={cube.position}
                        scale={cube.scale}
                    >
                        <meshStandardMaterial
                            color={cube.color}
                            roughness={0.1}
                            metalness={0.9}
                            transparent
                            opacity={0.8}
                        />
                    </Box>
                </Float>
            ))}
        </group>
    );
}

// Particle field
function ParticleField() {
    const particlesRef = useRef<THREE.Points>(null);

    const particleCount = 200;
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
            particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#f5df4a"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// Main 3D Scene
function Scene() {
    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#f5df4a" />
            <pointLight position={[10, -10, 5]} intensity={0.5} color="#d4c03a" />

            {/* Main Elements */}
            <AnimatedSphere position={[2.5, 0, 0]} color="#f5df4a" distort={0.4} />
            <AnimatedTorus position={[-2.5, 0.5, -1]} color="#d4c03a" />
            <FloatingCubes />
            <ParticleField />

            {/* Camera Controls - subtle auto rotation */}
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
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

// Exported Component
export default function ThreeScene() {
    const [isReady, setIsReady] = useState(false);
    const [isMobile, setIsMobile] = useState(true); // Default to mobile to prevent SSR flash

    useEffect(() => {
        // Check if mobile
        const checkMobile = window.innerWidth < 768;
        setIsMobile(checkMobile);

        if (checkMobile) return; // Don't set timer if mobile

        // Use requestIdleCallback if available, otherwise setTimeout
        const loadScene = () => {
            setIsReady(true);
        };

        // Delay the 3D scene loading to allow critical rendering to complete
        const timer = setTimeout(() => {
            if ('requestIdleCallback' in window) {
                (window as any).requestIdleCallback(loadScene, { timeout: 1000 });
            } else {
                loadScene();
            }
        }, SCENE_LOAD_DELAY);

        return () => clearTimeout(timer);
    }, []);

    // Don't render on mobile
    if (isMobile) {
        return null;
    }

    // Don't render until delayed load is complete
    if (!isReady) {
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
        }}>
            <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 8], fov: 45 }}
                style={{ background: 'transparent' }}
                gl={{ alpha: true, antialias: true }}
            >
                <Suspense fallback={<Loader />}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
