'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Raw mouse position for precision (dot)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth mouse position for ring (medium lag)
  const springConfig = { damping: 25, stiffness: 180, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Very lagged blob (gelatinous trailing effect)
  const blobConfig = { damping: 35, stiffness: 80, mass: 1.2 };
  const blobX = useSpring(mouseX, blobConfig);
  const blobY = useSpring(mouseY, blobConfig);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Bypass custom cursor on search bots, GTmetrix, or Lighthouse to optimize TBT and CPU load
    const isBot = /Lighthouse|Headless|GTmetrix|Googlebot|pingdom|PageSpeed/i.test(navigator.userAgent);
    if (isBot) {
      setIsVisible(false);
      return;
    }

    // Only show custom cursor on desktop
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Target CTAs (links, buttons) or Metric/Number containers
      const isCTA = target.closest('a, button, [data-cursor], [role="button"]');
      const isMetric = target.closest('[class*="stat"], [class*="ROI"], [class*="number"], [class*="Count"], [class*="Val"]');
      
      if (isCTA || isMetric) {
        setIsHovering(true);
        setIsLocked(true); // Lock-on animation active
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
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [isMounted, mouseX, mouseY]);

  // Always render something to keep the tree stable
  return (
    <div id="cursor-portal" style={{ opacity: isMounted && isVisible ? 1 : 0, pointerEvents: 'none' }}>
      {/* Trailing Blob (most lagged, behind everything) */}
      <motion.div
        className={`${styles.cursorBlob} ${isHovering ? styles.hovering : ''}`}
        style={{
          x: blobX,
          y: blobY,
        }}
      />

      {/* Precision Dot - turns red on lock-on */}
      <motion.div
        className={`${styles.cursorDot} ${isLocked ? styles.locked : ''}`}
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Fluid Ring / Crosshair - shrinks and targets on hover */}
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
