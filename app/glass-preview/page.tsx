'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* =============================================================================
   LIQUID GLASS UI KIT — 1:1 replica of the reference render
   Every control is built as: OUTER SHELL (thick refracting glass rim)
   + INNER POOL (the flat glass surface that holds the content)
   + CAUSTIC (prismatic light spilled on the floor behind the object)
============================================================================= */

const FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", "Helvetica Neue", Arial, sans-serif';

const INK = '#22262b';

/* Prismatic dispersion: cyan -> gold -> magenta, exactly like light split by a
   thick glass edge. Kept pastel so it reads as light, not as a colored blob. */
const PRISM =
  'radial-gradient(62% 62% at 50% 50%, rgba(40,205,255,0.80) 0%, rgba(140,230,255,0.62) 20%, rgba(255,205,95,0.72) 44%, rgba(255,105,180,0.60) 66%, rgba(255,255,255,0) 86%)';

const WARM_PRISM =
  'radial-gradient(62% 62% at 50% 50%, rgba(255,140,45,0.85) 0%, rgba(255,185,80,0.62) 30%, rgba(255,110,165,0.45) 62%, rgba(255,255,255,0) 84%)';

/* --- the glass shell: thick rim, bevelled top, refracted bottom edge ------- */
function shell(radius: number): React.CSSProperties {
  return {
    position: 'relative',
    borderRadius: radius,
    background:
      'linear-gradient(148deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.30) 24%, rgba(224,234,247,0.20) 52%, rgba(255,255,255,0.55) 78%, rgba(255,255,255,0.85) 100%)',
    backdropFilter: 'blur(7px) saturate(1.6)',
    WebkitBackdropFilter: 'blur(7px) saturate(1.6)',
    border: '1px solid rgba(143,162,190,0.62)',
    boxShadow: [
      '0 2px 3px -1px rgba(40,56,82,0.12)',
      '0 14px 24px -10px rgba(34,50,76,0.30)',
      '0 34px 54px -24px rgba(22,36,58,0.38)',
      'inset 0 2.5px 1.5px -1px rgba(255,255,255,1)',
      'inset 0 -3px 3px -1.5px rgba(88,110,148,0.5)',
      'inset 3px 0 4px -2.5px rgba(255,255,255,1)',
      'inset -3px 0 4px -2.5px rgba(255,255,255,1)',
      'inset 0 0 0 1px rgba(255,255,255,0.55)',
    ].join(','),
  };
}

/* --- the inner pool: the calm glass surface inside the rim ----------------- */
function pool(radius: number): React.CSSProperties {
  return {
    position: 'relative',
    borderRadius: radius,
    background:
      'linear-gradient(180deg, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0.10) 44%, rgba(236,244,254,0.34) 100%)',
    backdropFilter: 'blur(1.5px)',
    WebkitBackdropFilter: 'blur(1.5px)',
    boxShadow:
      '0 0 0 1px rgba(128,150,182,0.45), 0 1px 2px -1px rgba(40,56,82,0.25), inset 0 1.5px 1px -0.5px rgba(255,255,255,1), inset 0 -1.5px 2px -1px rgba(104,126,162,0.35), inset 0 9px 15px -11px rgba(255,255,255,0.95)',
  };
}

/* --- light projected on the floor behind an object ------------------------ */
function Caustic({
  style,
  tone = 'prism',
  blur = 12,
  opacity = 1,
}: {
  style: React.CSSProperties;
  tone?: 'prism' | 'warm' | string;
  blur?: number;
  opacity?: number;
}) {
  const bg = tone === 'prism' ? PRISM : tone === 'warm' ? WARM_PRISM : tone;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{ zIndex: -1, background: bg, filter: `blur(${blur}px)`, opacity, ...style }}
    />
  );
}

/* --- the extruded side wall: what turns a shape into a solid object ------- */
const Edge = ({ radius, depth = 11, inset = 5 }: { radius: number; depth?: number; inset?: number }) => (
  <>
    {/* glass thickness seen below and through the bottom of the face */}
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        zIndex: -1,
        left: 1,
        right: 1,
        bottom: -depth,
        height: depth * 2.5,
        borderRadius: radius,
        background:
          'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(242,247,254,0.14) 42%, rgba(216,228,243,0.5) 68%, rgba(182,198,222,0.8) 86%, rgba(230,241,253,0.94) 96%, rgba(255,255,255,1) 100%)',
        filter: 'blur(0.6px)',
      }}
    />
    {/* light splitting inside the thickness of the glass */}
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        zIndex: -1,
        left: inset + 4,
        right: inset + 4,
        bottom: -depth + 2,
        height: depth * 1.15,
        borderRadius: radius,
        background:
          'linear-gradient(90deg, rgba(120,215,255,0.45) 0%, rgba(255,255,255,0) 24%, rgba(255,255,255,0) 70%, rgba(255,190,120,0.4) 89%, rgba(255,120,180,0.45) 100%)',
        filter: 'blur(4px)',
        opacity: 0.7,
      }}
    />
    {/* dark seam where the wall meets the floor, then the refracted lip */}
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        zIndex: -2,
        left: inset,
        right: inset,
        bottom: -depth - 2,
        height: depth,
        borderRadius: radius,
        boxShadow:
          '0 5px 9px -3px rgba(22,36,58,0.55), 0 14px 24px -8px rgba(22,36,58,0.45), 0 30px 46px -18px rgba(22,36,58,0.4)',
      }}
    />
  </>
);

/* --- specular crescent that sits on top of colored candy cores ------------- */
const Gloss = ({ inset = 12, height = '46%', radius = 999 }: { inset?: number; height?: string; radius?: number }) => (
  <div
    aria-hidden
    className="pointer-events-none absolute"
    style={{
      top: 2,
      left: inset,
      right: inset,
      height,
      borderRadius: radius,
      background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.22) 62%, rgba(255,255,255,0) 100%)',
    }}
  />
);

const row = (i: number) => ({
  initial: { opacity: 0, y: 26, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.75, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] as const },
});

export default function GlassPreviewPage() {
  const [toggled, setToggled] = useState(true);
  const [checked, setChecked] = useState(true);
  const [query, setQuery] = useState('With suggestions');

  /* the whole tray is a physical object: it turns towards the viewer */
  const stage = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 18, mass: 0.7 });
  const sy = useSpring(py, { stiffness: 90, damping: 18, mass: 0.7 });
  const rotateY = useTransform(sx, [-1, 1], [-7, 7]);
  const rotateX = useTransform(sy, [-1, 1], [7, -3]);

  const track = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = stage.current?.getBoundingClientRect();
    if (!r) return;
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const release = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div
      ref={stage}
      onMouseMove={track}
      onMouseLeave={release}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-5 py-16 select-none"
      style={{ background: '#e9ebee', fontFamily: FONT, color: INK, perspective: 1500 }}
    >
      {/* studio lighting on the backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.95) 0%, rgba(243,245,247,0.55) 45%, rgba(225,228,233,0.0) 75%), radial-gradient(90% 60% at 50% 110%, rgba(206,211,219,0.55) 0%, rgba(236,238,240,0) 70%)',
        }}
      />
      {/* film grain */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{
          opacity: 0.22,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
        }}
      />

      <style>{`
        .glass-kit { width: 520px; }
        @media (max-width: 620px) { .glass-kit { zoom: 0.88; } }
        @media (max-width: 540px) { .glass-kit { zoom: 0.76; } }
        @media (max-width: 460px) { .glass-kit { zoom: 0.66; } }
        @media (max-width: 400px) { .glass-kit { zoom: 0.58; } }
        @media (max-width: 340px) { .glass-kit { zoom: 0.5; } }
      `}</style>

      <motion.div
        className="glass-kit relative flex flex-col gap-[26px]"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformOrigin: '50% 60%' }}
      >
        {/* ===================================================================
            ROW 1 — START PROJECT · SECONDARY · POWER
        =================================================================== */}
        <motion.div {...row(0)} className="flex items-center gap-[22px]">
          {/* START PROJECT */}
          <button
            className="relative group flex-[1.52] transition-transform duration-200 active:scale-[0.985]"
            style={{ ...shell(999), height: 74, padding: 10 }}
          >
            <Edge radius={999} depth={12} inset={6} />
            <Caustic
              tone="warm"
              blur={14}
              style={{ left: '12%', right: '4%', bottom: -13, height: 26, borderRadius: 999 }}
            />
            <Caustic
              blur={9}
              opacity={0.85}
              style={{ right: -14, bottom: -10, width: 76, height: 42, borderRadius: 999 }}
            />
            <span
              className="relative flex h-full w-full items-center justify-center overflow-hidden"
              style={{
                borderRadius: 999,
                background:
                  'linear-gradient(180deg, #ff9a4d 0%, #fd7028 30%, #f25411 62%, #d83e05 100%)',
                boxShadow:
                  'inset 0 2px 2px -0.5px rgba(255,255,255,0.9), inset 0 -3px 5px -1px rgba(138,38,0,0.75), 0 6px 16px -4px rgba(226,84,20,0.6)',
              }}
            >
              <Gloss inset={16} height="44%" />
              <span
                className="relative"
                style={{ color: '#fff', fontSize: 19, fontWeight: 500, letterSpacing: '-0.01em', textShadow: '0 1px 2px rgba(120,35,0,0.35)' }}
              >
                Start project
              </span>
            </span>
          </button>

          {/* SECONDARY */}
          <button
            className="relative flex-[1] transition-transform duration-200 active:scale-[0.985]"
            style={{ ...shell(999), height: 74, padding: 10 }}
          >
            <Edge radius={999} depth={12} inset={6} />
            <Caustic
              tone="radial-gradient(60% 60% at 50% 50%, rgba(90,185,255,0.72) 0%, rgba(175,215,255,0.5) 45%, rgba(255,255,255,0) 80%)"
              blur={13}
              style={{ left: '16%', right: '4%', bottom: -11, height: 24, borderRadius: 999 }}
            />
            <Caustic blur={9} opacity={0.9} style={{ right: -12, bottom: -8, width: 62, height: 38, borderRadius: 999 }} />
            <span
              className="flex h-full w-full items-center justify-center"
              style={{
                ...pool(999),
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.66) 0%, rgba(228,240,252,0.4) 48%, rgba(196,220,246,0.55) 100%)',
              }}
            >
              <span style={{ fontSize: 18.5, fontWeight: 500, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Secondary</span>
            </span>
          </button>

          {/* POWER */}
          <button
            className="relative shrink-0 transition-transform duration-200 active:scale-[0.97]"
            style={{ ...shell(24), width: 78, height: 74, padding: 10 }}
          >
            <Edge radius={24} depth={12} inset={5} />
            <Caustic blur={10} style={{ right: -14, bottom: -12, width: 64, height: 46, borderRadius: 999 }} />
            <span className="flex h-full w-full items-center justify-center" style={pool(18)}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round">
                <path d="M12 3.2v8.2" />
                <path d="M18.4 6.6a8.6 8.6 0 1 1-12.8 0" />
              </svg>
            </span>
          </button>
        </motion.div>

        {/* ===================================================================
            ROW 2 — SEARCH FIELD WITH SUGGESTIONS + ADD
        =================================================================== */}
        <motion.div {...row(1)} className="relative" style={{ ...shell(999), height: 86, padding: 11 }}>
          <Edge radius={999} depth={13} inset={8} />
            <Caustic blur={14} style={{ right: -16, top: 4, bottom: -14, width: 120, borderRadius: 999 }} />
          <Caustic
            tone="radial-gradient(60% 60% at 50% 50%, rgba(160,205,255,0.4) 0%, rgba(255,255,255,0) 78%)"
            blur={14}
            opacity={0.5}
            style={{ left: '22%', right: '26%', bottom: -11, height: 22, borderRadius: 999 }}
          />

          <div className="flex h-full w-full items-stretch">
            {/* recessed white field */}
            <div
              className="flex flex-1 items-center gap-[14px] pl-[22px] pr-4"
              style={{
                ...pool(999),
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.72) 55%, rgba(248,251,255,0.8) 100%)',
                boxShadow:
                  'inset 0 2px 3px -1px rgba(120,140,175,0.28), inset 0 -1.5px 1px -0.5px rgba(255,255,255,0.95), inset 0 0 0 1px rgba(255,255,255,0.6)',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round">
                <circle cx="10.8" cy="10.8" r="6.6" />
                <path d="m15.8 15.8 4 4" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="With suggestions"
                className="w-full bg-transparent outline-none"
                style={{ fontSize: 18.5, fontWeight: 400, letterSpacing: '-0.01em', color: INK }}
              />
            </div>

            {/* glass cap with the add affordance */}
            <button className="relative flex items-center justify-center" style={{ width: 84 }}>
              <span
                aria-hidden
                className="absolute left-0 top-[9%] bottom-[9%]"
                style={{ width: 1, background: 'linear-gradient(180deg, rgba(160,178,205,0), rgba(150,170,200,0.45), rgba(160,178,205,0))' }}
              />
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round">
                <path d="M12 5.4v13.2M5.4 12h13.2" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* ===================================================================
            ROW 3 — SELECT (WITH CHECK) · TOGGLE
        =================================================================== */}
        <motion.div {...row(2)} className="flex items-center gap-[22px]">
          {/* SELECT */}
          <div
            onClick={() => setChecked((v) => !v)}
            className="relative flex-1 cursor-pointer transition-transform duration-200 active:scale-[0.99]"
            style={{ ...shell(999), height: 80, padding: 10 }}
          >
            <Edge radius={999} depth={13} inset={7} />
            <Caustic blur={13} opacity={0.6} style={{ left: '26%', right: '8%', bottom: -11, height: 24, borderRadius: 999 }} />

            <div className="flex h-full w-full items-stretch" style={pool(999)}>
              <div className="flex flex-1 items-center gap-[14px] pl-[20px]">
                {/* hexagonal spinner mark */}
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.9 9.3V7.6L12 3.6 5.1 7.6v8l6.9 4 6.9-4v-1.7" />
                </svg>
                <span style={{ fontSize: 18.5, fontWeight: 500, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Select</span>
              </div>

              <div className="relative flex items-center pl-4 pr-[7px]">
                <span
                  aria-hidden
                  className="absolute left-0 top-[14%] bottom-[14%]"
                  style={{ width: 1, background: 'linear-gradient(180deg, rgba(160,178,205,0), rgba(150,170,200,0.4), rgba(160,178,205,0))' }}
                />
                <span
                  className="flex items-center justify-center transition-transform duration-200"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 13,
                    background: checked
                      ? 'linear-gradient(180deg, #4fd6a4 0%, #22c08a 48%, #12a173 100%)'
                      : 'linear-gradient(180deg, rgba(255,255,255,0.7), rgba(225,232,242,0.7))',
                    boxShadow: checked
                      ? 'inset 0 1.5px 1.5px -0.5px rgba(255,255,255,0.9), inset 0 -2.5px 4px -1px rgba(4,110,78,0.6), 0 5px 14px -5px rgba(16,160,115,0.75)'
                      : 'inset 0 1px 1px rgba(255,255,255,0.9), inset 0 0 0 1px rgba(160,178,205,0.35)',
                  }}
                >
                  {checked && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5.5 12.5 4.2 4.2 8.8-9.4" />
                    </svg>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* TOGGLE */}
          <div
            onClick={() => setToggled((v) => !v)}
            className="relative shrink-0 cursor-pointer"
            style={{ ...shell(999), width: 134, height: 78, padding: 9 }}
          >
            <Edge radius={999} depth={12} inset={5} />
            <Caustic
              tone={
                toggled
                  ? 'radial-gradient(60% 60% at 50% 50%, rgba(20,196,142,0.85) 0%, rgba(120,228,192,0.55) 45%, rgba(255,255,255,0) 80%)'
                  : 'radial-gradient(60% 60% at 50% 50%, rgba(150,170,195,0.4) 0%, rgba(255,255,255,0) 80%)'
              }
              blur={13}
              style={{ left: '6%', right: '-4%', bottom: -12, height: 32, borderRadius: 999 }}
            />
            <div
              className="relative h-full w-full transition-colors duration-300"
              style={{
                ...pool(999),
                background: toggled
                  ? 'linear-gradient(180deg, rgba(120,228,186,0.85) 0%, rgba(46,196,148,0.8) 45%, rgba(20,158,118,0.85) 100%)'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(214,222,234,0.7) 100%)',
                boxShadow:
                  'inset 0 2px 2px -0.5px rgba(255,255,255,0.85), inset 0 -2.5px 4px -1px rgba(6,96,72,0.35), inset 0 0 0 1px rgba(255,255,255,0.5)',
              }}
            >
              <motion.span
                className="absolute top-0 block"
                animate={{ x: toggled ? 54 : 0 }}
                transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 999,
                  background: 'radial-gradient(circle at 34% 24%, #ffffff 0%, #f6f8fb 52%, #d8dee8 100%)',
                  boxShadow:
                    '0 6px 14px -4px rgba(12,60,46,0.4), 0 2px 4px -1px rgba(12,60,46,0.22), inset 0 1.5px 1px -0.5px #ffffff',
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* ===================================================================
            ROW 4 — TABS · TOAST
        =================================================================== */}
        <motion.div {...row(3)} className="flex items-center gap-[22px]">
          {/* TABS */}
          <button
            className="relative flex-1 transition-transform duration-200 active:scale-[0.99]"
            style={{ ...shell(999), height: 74, padding: 10 }}
          >
            <Edge radius={999} depth={12} inset={6} />
            <Caustic blur={12} opacity={0.75} style={{ left: '30%', right: '4%', bottom: -11, height: 24, borderRadius: 999 }} />
            <span className="flex h-full w-full items-center justify-center gap-[13px]" style={pool(999)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7.4 9.6 12 5l4.6 4.6" />
                <path d="M16.6 14.4 12 19l-4.6-4.6" />
              </svg>
              <span style={{ fontSize: 18.5, fontWeight: 500, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Tabs</span>
            </span>
          </button>

          {/* TOAST */}
          <button
            className="relative flex-[1.05] transition-transform duration-200 active:scale-[0.99]"
            style={{ ...shell(999), height: 74, padding: 10 }}
          >
            <Edge radius={999} depth={12} inset={6} />
            <Caustic blur={12} style={{ right: -12, bottom: -12, width: 92, height: 44, borderRadius: 999 }} />
            <Caustic blur={12} opacity={0.6} style={{ left: 0, bottom: -12, width: 90, height: 34, borderRadius: 999 }} />
            <span
              className="flex h-full w-full items-center justify-center gap-[11px]"
              style={{
                ...pool(999),
                boxShadow:
                  'inset 0 0 0 1.5px rgba(232,140,66,0.85), inset 0 1.5px 1px -0.5px rgba(255,255,255,0.9), 0 0 12px -4px rgba(232,140,66,0.5)',
              }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="rgba(240,160,100,0.35)" stroke="rgba(226,128,58,0.9)" strokeWidth="1.5" strokeLinejoin="round">
                <path d="M12 3.2 15.2 12 12 20.8 8.8 12 12 3.2Z" />
                <path d="M3.2 12 12 8.8 20.8 12 12 15.2 3.2 12Z" />
              </svg>
              <span style={{ fontSize: 18.5, fontWeight: 500, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Toast</span>
            </span>
          </button>
        </motion.div>

        {/* ===================================================================
            ROW 5 — GLASS CARD · FIND FILES DIALOG
        =================================================================== */}
        <motion.div {...row(4)} className="flex items-stretch gap-[22px]">
          {/* CARD */}
          <div
            className="relative flex-1 transition-transform duration-200 hover:-translate-y-[2px]"
            style={{ ...shell(36), height: 200, padding: 13 }}
          >
            <Edge radius={36} depth={17} inset={8} />
            <Caustic blur={16} opacity={0.75} style={{ left: '26%', right: '-3%', bottom: -15, height: 38, borderRadius: 40 }} />
            <Caustic blur={12} opacity={0.9} style={{ left: -14, bottom: 18, width: 58, height: 96, borderRadius: 999 }} />

            <div className="relative flex h-full w-full items-end justify-end overflow-hidden p-[18px]" style={pool(27)}>
              {/* diagonal specular sweep across the slab */}
              <div
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  inset: 0,
                  borderRadius: 27,
                  background:
                    'linear-gradient(138deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.72) 14%, rgba(255,255,255,0.18) 30%, rgba(255,255,255,0) 46%), radial-gradient(85% 65% at 14% 6%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 58%), linear-gradient(200deg, rgba(255,255,255,0) 58%, rgba(206,222,238,0.35) 100%)',
                }}
              />
              {/* faint internal iridescence */}
              <div
                aria-hidden
                className="pointer-events-none absolute"
                style={{
                  inset: 0,
                  borderRadius: 27,
                  opacity: 0.4,
                  background:
                    'radial-gradient(60% 50% at 16% 88%, rgba(255,160,200,0.4) 0%, rgba(255,255,255,0) 60%), radial-gradient(60% 50% at 88% 84%, rgba(120,210,255,0.4) 0%, rgba(255,255,255,0) 60%)',
                }}
              />
              <span className="relative" style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
                Card
              </span>
            </div>
          </div>

          {/* FIND FILES DIALOG */}
          <div className="relative flex-[1.05]" style={{ ...shell(36), height: 200, padding: 12 }}>
            <Edge radius={36} depth={17} inset={8} />
            <Caustic blur={16} opacity={0.75} style={{ left: '30%', right: '-3%', bottom: -15, height: 36, borderRadius: 40 }} />
            <Caustic blur={12} opacity={0.85} style={{ right: -14, bottom: 26, width: 54, height: 90, borderRadius: 999 }} />

            <div className="flex h-full w-full flex-col justify-between px-[18px] py-[17px]" style={pool(28)}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.15 }}>Find files...</div>
                  <div style={{ fontSize: 16.5, fontWeight: 400, color: '#5b616a', marginTop: 8 }}>Add collaborator</div>
                </div>
                <button className="mt-[2px] text-[#5b616a] transition-colors hover:text-[#22262b]" aria-label="Close">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                    <path d="m6 6 12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>

              <button
                className="relative w-full overflow-hidden transition-transform duration-200 active:scale-[0.985]"
                style={{
                  height: 52,
                  borderRadius: 999,
                  background: 'linear-gradient(180deg, #4aa6f5 0%, #1d76e2 40%, #0f52c4 74%, #0b3ea4 100%)',
                  boxShadow:
                    'inset 0 2px 2px -0.5px rgba(255,255,255,0.85), inset 0 -3px 5px -1px rgba(6,40,110,0.8), 0 7px 18px -6px rgba(20,90,200,0.7)',
                }}
              >
                <Gloss inset={14} height="44%" />
                <span
                  className="relative"
                  style={{ color: '#fff', fontSize: 18.5, fontWeight: 500, letterSpacing: '-0.01em', textShadow: '0 1px 2px rgba(6,30,80,0.35)' }}
                >
                  Pro plan
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
