"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// WebGL is client-only; keep three.js out of the server bundle and the
// first paint. The gradient backdrop behind it covers the loading gap.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/** Mounts the 3D hero and pauses rendering while it is off-screen. */
export default function HeroCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    const c = document.createElement("canvas");
    setWebgl(Boolean(c.getContext("webgl2") || c.getContext("webgl")));

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden>
      {webgl && <HeroScene paused={!visible} />}
    </div>
  );
}
