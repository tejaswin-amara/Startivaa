"use client";

import { useEffect, useRef } from "react";
import { LAND_MASK_BASE64, LAND_MASK_WIDTH, LAND_MASK_HEIGHT } from "./LandMask";

/* ═══════════════════════════════════════════════════════════════════
   🌍 ACCURATE EARTH GLOBE — Pure Canvas 2D Dot-Matrix Renderer
   No WebGL. No external dependencies. High-fidelity land bitmap.
   Optimized with ResizeObserver & static dot caching.
   ═══════════════════════════════════════════════════════════════════ */

// ── Decode land mask bitmap on demand ──────────────────────────────
let decodedMask: Uint8Array | null = null;

function getDecodedMask(): Uint8Array {
  if (decodedMask) return decodedMask;

  const binaryString = atob(LAND_MASK_BASE64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const totalPixels = LAND_MASK_WIDTH * LAND_MASK_HEIGHT;
  const mask = new Uint8Array(totalPixels);
  for (let i = 0; i < totalPixels; i++) {
    const byteIdx = Math.floor(i / 8);
    const bitIdx = i % 8;
    const isLand = (bytes[byteIdx] & (1 << bitIdx)) !== 0;
    mask[i] = isLand ? 1 : 0;
  }

  decodedMask = mask;
  return mask;
}

function isLand(lat: number, lng: number): boolean {
  const mask = getDecodedMask();
  
  // lng ∈ [-180, 180] -> [0, LAND_MASK_WIDTH - 1]
  let x = Math.floor((lng + 180) * (LAND_MASK_WIDTH / 360));
  x = Math.max(0, Math.min(LAND_MASK_WIDTH - 1, x));

  // lat ∈ [-90, 90] -> [0, LAND_MASK_HEIGHT - 1] (where 90 is y=0)
  let y = Math.floor((90 - lat) * (LAND_MASK_HEIGHT / 180));
  y = Math.max(0, Math.min(LAND_MASK_HEIGHT - 1, y));

  return mask[y * LAND_MASK_WIDTH + x] === 1;
}

// ── City markers ──────────────────────────────────────────────────
interface City {
  lat: number;
  lng: number;
  name: string;
  isPrimary?: boolean;
}

const CITIES: City[] = [
  { lat: 17.3850, lng: 78.4867, name: "Hyderabad", isPrimary: true }, // Startivaa HQ
  { lat: 19.0760, lng: 72.8777, name: "Mumbai" },
  { lat: 28.6139, lng: 77.2090, name: "Delhi" },
  { lat: 12.9716, lng: 77.5946, name: "Bangalore" },
  { lat: 1.3521, lng: 103.8198, name: "Singapore" },
  { lat: 25.2048, lng: 55.2708, name: "Dubai" },
  { lat: 51.5074, lng: -0.1278, name: "London" },
  { lat: 40.7128, lng: -74.0060, name: "New York" },
  { lat: 37.7749, lng: -122.4194, name: "San Francisco" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo" },
  { lat: -33.8688, lng: 151.2093, name: "Sydney" },
  { lat: -23.5505, lng: -46.6333, name: "São Paulo" },
];

// ── Connection arcs (draw lines between indices of CITIES) ───────
const ARCS: [number, number][] = [
  [0, 1], // Hyderabad <-> Mumbai
  [0, 2], // Hyderabad <-> Delhi
  [0, 3], // Hyderabad <-> Bangalore
  [0, 4], // Hyderabad <-> Singapore
  [0, 5], // Hyderabad <-> Dubai
  [0, 6], // Hyderabad <-> London
  [0, 7], // Hyderabad <-> New York
  [5, 6], // Dubai <-> London
  [6, 7], // London <-> New York
  [7, 8], // New York <-> San Francisco
  [4, 9], // Singapore <-> Tokyo
  [9, 10], // Tokyo <-> Sydney
];

// ── 3D projection helper ──────────────────────────────────────────
function latLngTo3D(
  lat: number,
  lng: number,
  rotation: number,
  radius: number
): { x: number; y: number; z: number } {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + rotation) * Math.PI) / 180;
  // Standard non-mirrored spherical projection
  const x = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.cos(theta);
  return { x, y, z };
}

// ── Accurate Indian Subcontinent Outer Polygon (20 vertices) ────────
const INDIA_POLYGON = [
  { lat: 37.0, lng: 74.5 },   // Kashmir north tip
  { lat: 35.5, lng: 78.0 },   // Ladakh east
  { lat: 29.5, lng: 91.5 },   // Tibet/Arunachal border
  { lat: 28.5, lng: 97.3 },   // Arunachal east tip
  { lat: 22.0, lng: 93.2 },   // Mizoram / Myanmar
  { lat: 20.8, lng: 92.5 },   // Bangladesh/Myanmar
  { lat: 20.0, lng: 86.5 },   // Odisha coast
  { lat: 16.0, lng: 81.3 },   // Andhra coast
  { lat: 10.2, lng: 79.9 },   // Tamil Nadu (Point Calimere)
  { lat: 8.0, lng: 77.5 },    // Kanyakumari (South tip)
  { lat: 10.0, lng: 76.2 },   // Kerala coast (Kochi)
  { lat: 13.0, lng: 74.8 },   // Karnataka coast (Mangalore)
  { lat: 16.0, lng: 73.5 },   // Goa coast
  { lat: 19.0, lng: 72.8 },   // Mumbai coast
  { lat: 21.0, lng: 69.0 },   // Gujarat coast (Kathiawar)
  { lat: 22.3, lng: 68.9 },   // Dwarka coast
  { lat: 23.8, lng: 68.1 },   // Rann of Kutch west tip
  { lat: 27.0, lng: 69.5 },   // Jaisalmer (Rajasthan west)
  { lat: 31.0, lng: 72.5 },   // Punjab west border
  { lat: 34.5, lng: 73.5 },   // Kashmir west border
];

function isPointInIndia(lat: number, lng: number): boolean {
  let inside = false;
  for (let i = 0, j = INDIA_POLYGON.length - 1; i < INDIA_POLYGON.length; j = i++) {
    const xi = INDIA_POLYGON[i].lng, yi = INDIA_POLYGON[i].lat;
    const xj = INDIA_POLYGON[j].lng, yj = INDIA_POLYGON[j].lat;

    const intersect = ((yi > lat) !== (yj > lat))
        && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

interface DotPoint {
  lat: number;
  lng: number;
  land: boolean;
  isIndia: boolean;
}

// ── Static dot grid caching ───────────────────────────────────────
let cachedDotGrid: DotPoint[] | null = null;

function getDotGrid(step: number): DotPoint[] {
  if (cachedDotGrid) return cachedDotGrid;

  const dots: DotPoint[] = [];
  for (let lat = -90; lat <= 90; lat += step) {
    // Fewer dots near poles (proportional to cos(lat))
    const rad = (lat * Math.PI) / 180;
    const lngStep = step / Math.max(Math.cos(rad), 0.12);
    for (let lng = -180; lng < 180; lng += lngStep) {
      const land = isLand(lat, lng);
      // High-accuracy geographic mapping of India
      const isInd = land && isPointInIndia(lat, lng);
      dots.push({ lat, lng, land, isIndia: isInd });
    }
  }

  cachedDotGrid = dots;
  return dots;
}

export default function EarthGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use 3-degree step for high-density, accurate coastline representation (~4,500 dots)
    const dots = getDotGrid(3);

    let rotation = -80; // Start facing India/Asia
    let animId: number;
    let width = 0;
    let height = 0;

    // Interactive Dragging State
    let isDragging = false;
    let dragStartX = 0;
    let startRotation = 0;
    let dragVelocity = 0;
    let lastDragX = 0;
    let lastDragTime = 0;

    canvas.style.cursor = "grab";

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      canvas.style.cursor = "grabbing";
      dragStartX = e.clientX;
      startRotation = rotation;
      dragVelocity = 0;
      lastDragX = e.clientX;
      lastDragTime = performance.now();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const now = performance.now();
      const dt = now - lastDragTime;
      const dx = e.clientX - dragStartX;
      
      const sensitivity = 0.45; 
      rotation = startRotation - dx * sensitivity;
      
      if (dt > 0) {
        dragVelocity = (e.clientX - lastDragX) / dt;
      }
      
      lastDragX = e.clientX;
      lastDragTime = now;
    };

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        canvas.style.cursor = "grab";
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      isDragging = true;
      dragStartX = e.touches[0].clientX;
      startRotation = rotation;
      dragVelocity = 0;
      lastDragX = e.touches[0].clientX;
      lastDragTime = performance.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const now = performance.now();
      const dt = now - lastDragTime;
      const dx = e.touches[0].clientX - dragStartX;
      const sensitivity = 0.55;
      rotation = startRotation - dx * sensitivity;
      if (dt > 0) {
        dragVelocity = (e.touches[0].clientX - lastDragX) / dt;
      }
      lastDragX = e.touches[0].clientX;
      lastDragTime = now;
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Setup ResizeObserver to prevent layout thrashing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        width = Math.floor(rect.width);
        height = Math.floor(rect.height || rect.width);
      }
    });
    resizeObserver.observe(container);

    const render = () => {
      if (width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const size = Math.min(width, height);
      
      // Update canvas dimensions only if they changed
      if (canvas.width !== size * dpr) {
        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = `${size}px`;
        canvas.style.height = `${size}px`;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.43;

      // ── 1. Globe base sphere gradient ──
      const baseGrad = ctx.createRadialGradient(
        cx - radius * 0.2,
        cy - radius * 0.2,
        radius * 0.05,
        cx,
        cy,
        radius
      );
      baseGrad.addColorStop(0, "rgba(20, 10, 45, 0.95)");
      baseGrad.addColorStop(0.6, "rgba(8, 5, 22, 0.98)");
      baseGrad.addColorStop(1, "rgba(4, 2, 10, 1)");

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = baseGrad;
      ctx.fill();

      // ── 2. Latitude/Longitude Grid Lines ──
      ctx.strokeStyle = "rgba(124, 58, 237, 0.04)";
      ctx.lineWidth = 0.5;

      // Lat lines
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lng = -180; lng <= 180; lng += 3) {
          const p = latLngTo3D(lat, lng, rotation, radius);
          if (p.z > 0) {
            const sx = cx + p.x;
            const sy = cy - p.y;
            if (!started) {
              ctx.moveTo(sx, sy);
              started = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Lng lines
      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 3) {
          const p = latLngTo3D(lat, lng, rotation, radius);
          if (p.z > 0) {
            const sx = cx + p.x;
            const sy = cy - p.y;
            if (!started) {
              ctx.moveTo(sx, sy);
              started = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // ── 3. Render Dot Grid (Accurate Land Mask) ──
      for (const dot of dots) {
        const p = latLngTo3D(dot.lat, dot.lng, rotation, radius);
        if (p.z <= 0) continue; // back-facing

        const sx = cx + p.x;
        const sy = cy - p.y;

        // Depth-based size scaling (dots near edges are smaller/flatter)
        const depth = p.z / radius;
        const alpha = dot.land 
          ? (dot.isIndia ? 0.7 + 0.3 * depth : 0.45 + 0.55 * depth)
          : 0.05 + 0.08 * depth;

        let dotRadius = dot.land ? 1.4 * depth + 0.4 : 0.6 * depth + 0.15;
        if (dot.isIndia) {
          dotRadius *= 1.25; // Highlight India dots slightly larger
        }

        ctx.beginPath();
        ctx.arc(sx, sy, dotRadius, 0, Math.PI * 2);

        if (dot.isIndia) {
          // India rose premium highlight
          ctx.fillStyle = `rgba(244, 63, 94, ${alpha * 0.95})`;
        } else if (dot.land) {
          // Accurate continents in soft vibrant violet
          ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        } else {
          // Water dots in dim indigo
          ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
        }
        ctx.fill();
      }

      // ── 4. Connection Arcs ──
      ctx.lineWidth = 1;
      const arcGlowTime = Date.now() / 1000;
      for (const [fromIdx, toIdx] of ARCS) {
        const c1 = CITIES[fromIdx];
        const c2 = CITIES[toIdx];

        const pFrom = latLngTo3D(c1.lat, c1.lng, rotation, radius);
        const pTo = latLngTo3D(c2.lat, c2.lng, rotation, radius);

        // Only draw if both points are visible
        if (pFrom.z <= 0 || pTo.z <= 0) continue;

        const sx1 = cx + pFrom.x;
        const sy1 = cy - pFrom.y;
        const sx2 = cx + pTo.x;
        const sy2 = cy - pTo.y;

        // Bulge arc outward
        const midX = (sx1 + sx2) / 2;
        const midY = (sy1 + sy2) / 2;
        const dist = Math.hypot(sx2 - sx1, sy2 - sy1);
        const bulge = dist * 0.22;
        const ctrlX = midX;
        const ctrlY = midY - bulge;

        const minDepth = Math.min(pFrom.z, pTo.z) / radius;
        const arcAlpha = minDepth * 0.25;

        // Pulsing light along connection paths
        const pathGrad = ctx.createLinearGradient(sx1, sy1, sx2, sy2);
        const glowPos = (arcGlowTime * 0.5) % 1.5; // slow pulse along path
        
        pathGrad.addColorStop(0, `rgba(139, 92, 246, ${arcAlpha})`);
        if (glowPos >= 0 && glowPos <= 1) {
          pathGrad.addColorStop(glowPos, `rgba(244, 63, 94, ${arcAlpha * 1.8})`);
        }
        pathGrad.addColorStop(1, `rgba(139, 92, 246, ${arcAlpha * 0.5})`);

        ctx.strokeStyle = pathGrad;
        ctx.beginPath();
        ctx.moveTo(sx1, sy1);
        ctx.quadraticCurveTo(ctrlX, ctrlY, sx2, sy2);
        ctx.stroke();
      }

      // ── 5. City Markers & PulsingHQ ──
      for (const city of CITIES) {
        const p = latLngTo3D(city.lat, city.lng, rotation, radius);
        if (p.z <= 0) continue;

        const sx = cx + p.x;
        const sy = cy - p.y;
        const depth = p.z / radius;

        if (city.isPrimary) {
          // ── HQ (Hyderabad) Special Pulsing Ripple ──
          const time = Date.now();
          const ripple1 = (time % 2000) / 2000;
          const ripple2 = ((time + 1000) % 2000) / 2000;

          // Hyderabad primary pulse core
          const hqGlow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 12 * depth);
          hqGlow.addColorStop(0, `rgba(244, 63, 94, ${0.8 * depth})`);
          hqGlow.addColorStop(0.3, `rgba(244, 63, 94, ${0.4 * depth})`);
          hqGlow.addColorStop(1, "rgba(244, 63, 94, 0)");

          ctx.beginPath();
          ctx.arc(sx, sy, 12 * depth, 0, Math.PI * 2);
          ctx.fillStyle = hqGlow;
          ctx.fill();

          // Ripple 1
          ctx.beginPath();
          ctx.arc(sx, sy, 30 * ripple1 * depth, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(244, 63, 94, ${(1 - ripple1) * 0.6 * depth})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Ripple 2
          ctx.beginPath();
          ctx.arc(sx, sy, 30 * ripple2 * depth, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(244, 63, 94, ${(1 - ripple2) * 0.3 * depth})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          // Gold Core dot
          ctx.beginPath();
          ctx.arc(sx, sy, 3.5 * depth, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
        } else {
          // Standard city marker
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 7 * depth);
          glow.addColorStop(0, `rgba(168, 85, 247, ${0.55 * depth})`);
          glow.addColorStop(1, "rgba(168, 85, 247, 0)");

          ctx.beginPath();
          ctx.arc(sx, sy, 7 * depth, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(sx, sy, 2 * depth, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 204, 255, ${0.9 * depth})`;
          ctx.fill();
        }
      }

      // ── 6. Atmospheric Rim Glow ──
      const rimGrad = ctx.createRadialGradient(cx, cy, radius * 0.82, cx, cy, radius * 1.08);
      rimGrad.addColorStop(0, "transparent");
      rimGrad.addColorStop(0.5, "rgba(139, 92, 246, 0.05)");
      rimGrad.addColorStop(0.8, "rgba(139, 92, 246, 0.18)");
      rimGrad.addColorStop(0.96, "rgba(139, 92, 246, 0.08)");
      rimGrad.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.08, 0, Math.PI * 2);
      ctx.fillStyle = rimGrad;
      ctx.fill();

      // ── 7. Specular highlight ──
      const specGrad = ctx.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.3,
        0,
        cx - radius * 0.3,
        cy - radius * 0.3,
        radius * 0.65
      );
      specGrad.addColorStop(0, "rgba(224, 204, 255, 0.05)");
      specGrad.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = specGrad;
      ctx.fill();

      // Slow elegant spin (or inertia drag decay)
      if (isDragging) {
        // drag movement drives rotation
      } else if (Math.abs(dragVelocity) > 0.01) {
        rotation += dragVelocity * 8; // coast smoothly by velocity
        dragVelocity *= 0.92; // smooth friction decay
      } else {
        rotation += 0.12; // slow default elegant spin
      }
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{ aspectRatio: "1", minHeight: 300 }}
    >
      {/* Premium back glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.16) 0%, transparent 68%)",
          borderRadius: "50%",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          filter: "drop-shadow(0 0 35px rgba(124,58,237,0.28))",
        }}
      />
    </div>
  );
}
