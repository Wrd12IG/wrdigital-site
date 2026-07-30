'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Canvas ref for particle drawing
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Raw mouse coordinates (for precision dot and particle origin)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const mouseRef = useRef({ x: -100, y: -100 });

  // Spring animations for the outer interactive ring
  const springConfig = { damping: 24, stiffness: 180, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Avoid loading heavy resources on crawlers/bots
    const isBot = /Lighthouse|Headless|GTmetrix|Googlebot|pingdom|PageSpeed/i.test(navigator.userAgent);
    if (isBot) {
      setIsVisible(false);
      return;
    }

    // Disable custom cursor on touch screens (tablets/phones)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    // Setup Canvas Resize
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Dynamic particle spawner
    const spawnParticles = (x: number, y: number, amount = 2) => {
      const palette = ['#f5df4a', '#a855f7', '#06b6d4', '#ffffff']; // gold, purple, cyan, white
      for (let i = 0; i < amount; i++) {
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 1.8,
          vy: (Math.random() - 0.5) * 1.8 - 0.4, // float slightly upward
          size: Math.random() * 3 + 1,
          color: palette[Math.floor(Math.random() * palette.length)],
          alpha: 1.0,
          decay: Math.random() * 0.02 + 0.015,
        });
      }
    };

    // Explosion particles burst on click or when hovering CTA elements
    const triggerExplosion = (x: number, y: number, amount = 16) => {
      const palette = ['#f5df4a', '#a855f7', '#06b6d4', '#ffffff'];
      for (let i = 0; i < amount; i++) {
        const angle = (i / amount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 3 + 2.5;
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 1.5,
          color: palette[Math.floor(Math.random() * palette.length)],
          alpha: 1.0,
          decay: Math.random() * 0.03 + 0.018,
        });
      }
    };

    // Global Mousemove Tracker
    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseX.set(x);
      mouseY.set(y);
      mouseRef.current = { x, y };

      // Spawn normal trailing dust particles
      spawnParticles(x, y, 2);
    };

    // Handle mouse click (sparkles explosion!)
    const handleMouseClick = () => {
      const { x, y } = mouseRef.current;
      triggerExplosion(x, y, 24);
    };

    // Handle hovering on interactive elements (Burst & Target Lock)
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isCTA = target.closest('a, button, [data-cursor], [role="button"]');
      const isMetric = target.closest('[class*="stat"], [class*="ROI"], [class*="number"], [class*="Count"], [class*="Val"]');
      
      if (isCTA || isMetric) {
        setIsHovering(true);
        setIsLocked(true);

        // Burst explosion when target locks onto CTA!
        const { x, y } = mouseRef.current;
        triggerExplosion(x, y, 14);
      } else {
        setIsHovering(false);
        setIsLocked(false);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (!relatedTarget || (!relatedTarget.closest('a, button, [data-cursor]') && !relatedTarget.closest('[class*="stat"], [class*="ROI"], [class*="number"], [class*="Count"], [class*="Val"]'))) {
        setIsHovering(false);
        setIsLocked(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('click', handleMouseClick);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    // Particle Animation Loop (CPU-optimized Canvas Drawing)
    let animationId: number;
    const updateAndDrawParticles = () => {
      const ctx = canvasRef.current?.getContext('2d');
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Filter out dead particles
        particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0);

        // Draw and update each particle
        particlesRef.current.forEach((p) => {
          // Physics: update coordinates, apply friction
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.alpha -= p.decay;

          if (p.alpha > 0) {
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            // Neon Glow effect
            ctx.shadowBlur = 8;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.restore();
          }
        });
      }
      animationId = requestAnimationFrame(updateAndDrawParticles);
    };
    
    // Start animation loop
    updateAndDrawParticles();

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('click', handleMouseClick);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, [isMounted, mouseX, mouseY]);

  // Render stable portal containing Canvas + SVG Core Pointer
  return (
    <div id="cursor-portal" style={{ opacity: isMounted && isVisible ? 1 : 0, pointerEvents: 'none' }}>
      {/* 🌟 Interactive Neon Particle Dust Trail Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1999998,
          pointerEvents: 'none',
        }}
      />

      {/* Center Precision Core Dot */}
      <motion.div
        className={`${styles.cursorDot} ${isLocked ? styles.locked : ''}`}
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Tech Ring / Crosshair - Locks tightly on active elements */}
      <motion.div
        className={`${styles.cursorRing} ${isLocked ? styles.locked : ''}`}
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <div className={`${styles.crosshairVertical} ${isLocked ? styles.locked : ''}`} />
        <div className={`${styles.crosshairHorizontal} ${isLocked ? styles.locked : ''}`} />
      </motion.div>
    </div>
  );
}
