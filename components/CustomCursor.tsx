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
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

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

  // Always render something to keep the tree stable
  return (
    <div id="cursor-portal" style={{ opacity: isMounted && isVisible ? 1 : 0, pointerEvents: 'none' }}>
      {/* Precision Dot */}
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
        <div className={styles.crosshairVertical} />
        <div className={styles.crosshairHorizontal} />
      </motion.div>
    </div>
  );
}
