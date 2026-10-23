"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

/**
 * Tilts its child in 3D toward the pointer with a moving glare highlight.
 * Writes CSS variables directly (no re-render) and only engages for fine
 * pointers without reduced-motion — touch devices get the plain card.
 */
export default function TiltCard({
  children,
  className = "",
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
    el.dataset.tilting = "true";
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    delete el.dataset.tilting;
  }

  return (
    <div className="tilt-wrap h-full">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`tilt relative h-full ${className}`}
      >
        {children}
        <span className="tilt-glare" aria-hidden />
      </div>
    </div>
  );
}
