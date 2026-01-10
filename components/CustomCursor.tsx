'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse position for precision (dot)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth mouse position for flow (ring)
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Only show custom cursor on desktop
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Simple check to reset if not on interactive element
      setIsHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [isMounted, mouseX, mouseY]);

  if (!isMounted || !isVisible) return null;

  return (
    <>
      {/* Precision Dot (Always follows mouse exactly) */}
      <motion.div
        className={styles.cursorDot}
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Fluid Ring / Crosshair */}
      <motion.div
        className={`${styles.cursorRing} ${isHovering ? styles.hovering : ''}`}
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        {/* Crosshair lines (visible only on hover) */}
        <div className={styles.crosshairVertical} />
        <div className={styles.crosshairHorizontal} />
      </motion.div>
    </>
  );
}
