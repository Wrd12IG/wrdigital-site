'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ──────────────────────────────────────────
   GLSL SHADER DEFINITIONS  (5 modes)
   ────────────────────────────────────────── */

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// 1. Plasma Aurora
const FRAG_PLASMA = `
precision mediump float;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;
uniform float u_click;

float plasma(vec2 p, float t) {
  float v = 0.0;
  v += sin(p.x * 3.0 + t);
  v += sin(p.y * 2.5 + t * 0.8);
  v += sin((p.x + p.y) * 2.0 + t * 1.2);
  v += sin(sqrt(p.x*p.x + p.y*p.y + 1.0) * 4.0 - t);
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy / u_res) * 2.0 - 1.0;
  uv.x *= u_res.x / u_res.y;
  vec2 mouse = u_mouse * 2.0 - 1.0;
  mouse.x *= u_res.x / u_res.y;

  float dist = length(uv - mouse);
  float influence = exp(-dist * 1.8) * (1.0 + u_click * 4.0);
  float t = u_time * 0.5 + influence;

  float v = plasma(uv, t);
  float n = (v + 4.0) / 8.0;

  vec3 c1 = vec3(0.38, 0.24, 0.96);   // violet
  vec3 c2 = vec3(0.05, 0.55, 0.92);   // blue
  vec3 c3 = vec3(0.98, 0.80, 0.08);   // yellow
  vec3 c4 = vec3(0.04, 0.04, 0.10);   // dark bg

  vec3 col = mix(c4, c1, smoothstep(0.0, 0.4, n));
  col      = mix(col, c2, smoothstep(0.3, 0.65, n));
  col      = mix(col, c3, smoothstep(0.6, 1.0, n));

  float glow = smoothstep(0.5, 0.0, dist) * influence * 0.6;
  col += vec3(0.98, 0.80, 0.08) * glow;

  gl_FragColor = vec4(col * 0.92, 1.0);
}
`;

// 2. Voronoi Cells
const FRAG_VORONOI = `
precision mediump float;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;
uniform float u_click;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)),
           dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 mouse = u_mouse;
  float t = u_time * 0.3;

  vec2 scaled = uv * 6.0;
  vec2 i_uv = floor(scaled);
  vec2 f_uv = fract(scaled);

  float minDist = 8.0;
  float minDist2 = 8.0;
  vec2 closestPoint;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 point = hash2(i_uv + neighbor);
      point = 0.5 + 0.5 * sin(t + 6.2831 * point);
      vec2 diff = neighbor + point - f_uv;
      float d = length(diff);
      if (d < minDist) {
        minDist2 = minDist;
        minDist = d;
        closestPoint = i_uv + neighbor + point;
      } else if (d < minDist2) {
        minDist2 = d;
      }
    }
  }

  float edge = minDist2 - minDist;
  float mouseEffect = length(uv - mouse);
  float ripple = sin(mouseEffect * 20.0 - u_time * 3.0) * 0.5 + 0.5;
  ripple *= exp(-mouseEffect * 5.0) * (1.0 + u_click * 6.0);

  vec3 bg = vec3(0.02, 0.02, 0.08);
  vec3 cellColor = vec3(0.38, 0.24, 0.96) * (1.0 - minDist * 0.6);
  cellColor = mix(cellColor, vec3(0.05, 0.55, 0.92), minDist);
  
  float edgeGlow = smoothstep(0.04, 0.0, edge) * 2.0;
  vec3 edgeColor = mix(vec3(0.98, 0.80, 0.08), vec3(1.0), edgeGlow);

  vec3 col = mix(bg, cellColor, 0.7);
  col += edgeColor * edgeGlow * 0.5;
  col += vec3(0.98, 0.80, 0.08) * ripple * 0.8;
  col = mix(col, vec3(0.0, 0.0, 0.05), minDist * 0.4);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

// 3. Fluid Wave
const FRAG_FLUID = `
precision mediump float;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;
uniform float u_click;

float wave(vec2 p, vec2 origin, float t, float freq, float speed) {
  float d = length(p - origin);
  return sin(d * freq - t * speed) / (d * 3.0 + 1.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_res.x / u_res.y;
  vec2 mouse = u_mouse * 2.0 - 1.0;
  mouse.x *= u_res.x / u_res.y;

  float t = u_time;
  float clickBoost = 1.0 + u_click * 8.0;

  float w = 0.0;
  w += wave(p, mouse * 1.0, t, 8.0 * clickBoost, 4.0) * clickBoost;
  w += wave(p, vec2(0.0),   t * 0.7, 5.0, 2.5);
  w += wave(p, vec2(-0.8, 0.5), t * 0.9, 6.0, 3.0);
  w += wave(p, vec2(0.8, -0.5), t * 0.6, 7.0, 2.0);

  float n = w * 0.5 + 0.5;

  vec3 deep  = vec3(0.01, 0.02, 0.12);
  vec3 mid   = vec3(0.38, 0.24, 0.96);
  vec3 peak  = vec3(0.98, 0.80, 0.08);
  vec3 crest = vec3(1.0, 1.0, 1.0);

  vec3 col = deep;
  col = mix(col, mid,   smoothstep(0.2, 0.5, n));
  col = mix(col, peak,  smoothstep(0.5, 0.75, n));
  col = mix(col, crest, smoothstep(0.8, 1.0, n));

  float mouseDist = length(p - mouse);
  col += vec3(0.38, 0.24, 0.96) * exp(-mouseDist * 2.0) * 0.4;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

// 4. Digital Rain / Glitch Grid
const FRAG_GLITCH = `
precision mediump float;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;
uniform float u_click;

float rand(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float grid(vec2 uv, float size) {
  vec2 g = fract(uv * size);
  float lx = step(0.97, g.x);
  float ly = step(0.97, g.y);
  return max(lx, ly);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 mouse = u_mouse;
  float t = u_time;

  // Scanlines
  float scan = sin(uv.y * u_res.y * 3.14159 * 2.0) * 0.5 + 0.5;
  scan = mix(0.85, 1.0, scan * 0.15);

  // Grid layers
  float g1 = grid(uv, 20.0) * 0.6;
  float g2 = grid(uv, 5.0) * 0.3;

  // Mouse proximity glow on cells
  float cellSize = 1.0 / 20.0;
  vec2 cellUV = floor(uv / cellSize) * cellSize + cellSize * 0.5;
  float mouseDist = length(cellUV - mouse);
  float cellGlow = exp(-mouseDist * 12.0) * (1.0 + u_click * 5.0);

  // Random glitch per column
  float col_i = floor(uv.x * 40.0);
  float glitchTime = floor(t * 2.0);
  float glitch = step(0.94, rand(vec2(col_i, glitchTime)));
  float glitchIntensity = rand(vec2(col_i, glitchTime + 0.5)) * glitch;

  // Data stream in cells (random chars metaphor)
  vec2 charCell = floor(uv * vec2(60.0, 30.0));
  float charRand = rand(charCell + floor(t * 0.5));
  float charOn = step(0.5 - glitchIntensity * 0.3, charRand);

  // Build color
  vec3 bg = vec3(0.01, 0.02, 0.06);
  vec3 gridCol = mix(bg, vec3(0.38, 0.24, 0.96), g1 + g2);
  gridCol = mix(gridCol, vec3(0.98, 0.80, 0.08), cellGlow * 0.9);
  gridCol += vec3(0.0, 0.8, 0.4) * charOn * glitchIntensity * 0.6;
  gridCol = mix(gridCol, vec3(0.05, 0.55, 0.92), glitchIntensity * 0.4);

  // Vignette
  float vign = length(uv - 0.5) * 1.4;
  vign = 1.0 - smoothstep(0.3, 1.0, vign);

  vec3 final = gridCol * scan * vign;
  final += vec3(0.38, 0.24, 0.96) * exp(-length(uv - mouse) * 5.0) * 0.3;

  gl_FragColor = vec4(clamp(final, 0.0, 1.0), 1.0);
}
`;

// 5. Nebula / Cosmic Smoke
const FRAG_NEBULA = `
precision mediump float;
uniform vec2  u_res;
uniform vec2  u_mouse;
uniform float u_time;
uniform float u_click;

float hash(float n) { return fract(sin(n) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n = i.x + i.y * 57.0;
  return mix(
    mix(hash(n),       hash(n + 1.0),  f.x),
    mix(hash(n + 57.0),hash(n + 58.0), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p *= 2.1;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 mouse = u_mouse;
  float t = u_time * 0.15;

  vec2 q = vec2(fbm(uv + t * 0.3), fbm(uv + vec2(1.7, 9.2) + t * 0.25));
  float clickDist = length(uv - mouse);
  float clickWarp = u_click * 0.4 * exp(-clickDist * 4.0);
  q += (uv - mouse) * clickWarp;

  vec2 r = vec2(
    fbm(uv + q + vec2(1.7, 9.2) + t * 0.2),
    fbm(uv + q + vec2(8.3, 2.8) + t * 0.18)
  );

  // Mouse distorts r
  r += (mouse - uv) * exp(-clickDist * 3.0) * 0.15;

  float f = fbm(uv + r);

  vec3 dark   = vec3(0.01, 0.01, 0.08);
  vec3 nebula = vec3(0.38, 0.24, 0.96);
  vec3 bright = vec3(0.98, 0.80, 0.08);
  vec3 teal   = vec3(0.05, 0.75, 0.72);

  vec3 col = mix(dark,   nebula, smoothstep(0.2,  0.5,  f));
  col      = mix(col,    teal,   smoothstep(0.45, 0.65, f));
  col      = mix(col,    bright, smoothstep(0.7,  0.9,  f));

  // Star field
  float star = step(0.998, noise(uv * 400.0));
  col += star * vec3(1.0);

  // Mouse glow
  col += vec3(0.38, 0.24, 0.96) * exp(-clickDist * 4.0) * 0.5 * (1.0 + u_click * 3.0);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

const SHADERS = [
  { name: 'Aurora Plasma',  frag: FRAG_PLASMA   },
  { name: 'Voronoi Cells',  frag: FRAG_VORONOI  },
  { name: 'Fluid Waves',    frag: FRAG_FLUID    },
  { name: 'Glitch Grid',    frag: FRAG_GLITCH   },
  { name: 'Nebula',         frag: FRAG_NEBULA   },
];

/* ──────────────────────────────────────────
   WebGL HELPERS
   ────────────────────────────────────────── */

function compileShader(gl: WebGLRenderingContext, src: string, type: number): WebGLShader | null {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn('Shader error:', gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

function buildProgram(gl: WebGLRenderingContext, fragSrc: string): WebGLProgram | null {
  const vert = compileShader(gl, VERT, gl.VERTEX_SHADER);
  const frag = compileShader(gl, fragSrc, gl.FRAGMENT_SHADER);
  if (!vert || !frag) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vert);
  gl.attachShader(prog, frag);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.warn('Program link error:', gl.getProgramInfoLog(prog));
    return null;
  }
  gl.deleteShader(vert);
  gl.deleteShader(frag);
  return prog;
}

/* ──────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────── */

interface ShaderWallpaperProps {
  /** 0-4, which shader to render */
  shaderIndex?: number;
  style?: React.CSSProperties;
  className?: string;
}

export function ShaderWallpaper({ shaderIndex = 0, style, className }: ShaderWallpaperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef     = useRef<WebGLRenderingContext | null>(null);
  const progRef   = useRef<WebGLProgram | null>(null);
  const rafRef    = useRef<number>(0);
  const startRef  = useRef<number>(performance.now());
  const mouseRef  = useRef<[number, number]>([0.5, 0.5]);
  const clickRef  = useRef<number>(0);
  const idxRef    = useRef<number>(shaderIndex);

  // Build / rebuild WebGL program when shader index changes
  const initGL = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Reuse or create context
    if (!glRef.current) {
      const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
      if (!gl) return;
      glRef.current = gl;

      // Full-screen quad
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    }

    const gl = glRef.current;
    if (progRef.current) gl.deleteProgram(progRef.current);

    const prog = buildProgram(gl, SHADERS[idx].frag);
    progRef.current = prog;

    if (prog) {
      gl.useProgram(prog);
      const pos = gl.getAttribLocation(prog, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    }
  }, []);

  // Sync when prop changes
  useEffect(() => {
    idxRef.current = shaderIndex;
    initGL(shaderIndex);
  }, [shaderIndex, initGL]);

  // Main render loop + resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initGL(idxRef.current);

    const resize = () => {
      const w = canvas.clientWidth  * window.devicePixelRatio;
      const h = canvas.clientHeight * window.devicePixelRatio;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width  = w;
        canvas.height = h;
        glRef.current?.viewport(0, 0, w, h);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const render = () => {
      const gl   = glRef.current;
      const prog = progRef.current;
      if (!gl || !prog) { rafRef.current = requestAnimationFrame(render); return; }

      const t = (performance.now() - startRef.current) / 1000;
      gl.useProgram(prog);

      const setU2 = (name: string, x: number, y: number) => {
        const loc = gl.getUniformLocation(prog, name);
        if (loc) gl.uniform2f(loc, x, y);
      };
      const setU1 = (name: string, v: number) => {
        const loc = gl.getUniformLocation(prog, name);
        if (loc) gl.uniform1f(loc, v);
      };

      setU2('u_res',   gl.drawingBufferWidth, gl.drawingBufferHeight);
      setU2('u_mouse', mouseRef.current[0], mouseRef.current[1]);
      setU1('u_time',  t);
      setU1('u_click', clickRef.current);

      // Decay click
      clickRef.current = Math.max(0, clickRef.current - 0.04);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    // Mouse
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = [
        (e.clientX - r.left) / r.width,
        1.0 - (e.clientY - r.top) / r.height,
      ];
    };

    // Touch
    const onTouch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      if (!t) return;
      mouseRef.current = [
        (t.clientX - r.left) / r.width,
        1.0 - (t.clientY - r.top) / r.height,
      ];
    };

    const onDown = () => { clickRef.current = 1.0; };

    // Window-level tracking so pointer-events:none canvas still reads mouse
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('touchstart', onDown, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('touchstart', onDown);
    };
  }, [initGL]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

/* ──────────────────────────────────────────
   PICKER OVERLAY (shown on Hero)
   ────────────────────────────────────────── */

interface ShaderPickerProps {
  current: number;
  onChange: (i: number) => void;
}

export function ShaderPicker({ current, onChange }: ShaderPickerProps) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '24px',
      right: '24px',
      zIndex: 10,
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      pointerEvents: 'auto', // Ensure picker is clickable even if content blocks pointer-events
    }}>
      {SHADERS.map((s, i) => (
        <button
          key={i}
          title={s.name}
          onClick={() => onChange(i)}
          style={{
            // Hard resets to bypass global CSS button styling
            padding: 0,
            margin: 0,
            minWidth: 0,
            minHeight: 0,
            width: i === current ? '36px' : '8px',
            height: '8px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            background: i === current
              ? 'linear-gradient(90deg, #6333F6, #FACC15)'
              : 'rgba(255,255,255,0.25)',
            transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
            flexShrink: 0,
            outline: 'none',
            boxShadow: 'none',
            appearance: 'none',
            WebkitAppearance: 'none',
          }}
        />
      ))}
      <span style={{
        marginLeft: '8px',
        fontSize: '10px',
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.45)',
        userSelect: 'none',
        whiteSpace: 'nowrap', // Force name on single line
      }}>
        {SHADERS[current].name}
      </span>
    </div>
  );
}
