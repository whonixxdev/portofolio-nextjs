"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

// Titik-titik kelokan (fraksi dari lebar & tinggi container)
// Ubah xFrac / yFrac di sini kalau mau bentuk lekukannya beda
const POINTS: { x: number; y: number }[] = [
    { x: 0.8, y: 0.0 },
    { x: 0.48, y: 0.11 },
    { x: 0.7, y: 0.22 },
    { x: 0.28, y: 0.35 },
    { x: 0.76, y: 0.48 },
    { x: 0.4, y: 0.6 },
    { x: 0.14, y: 0.72 },
    { x: 0.55, y: 0.86 },
    { x: 0.32, y: 1.0 },
];

function buildSnakePath(w: number, h: number) {
    if (!w || !h) return "";
    const pts = POINTS.map((p) => ({ x: p.x * w, y: p.y * h }));
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i];
        const p2 = pts[i + 1];
        const midY = p1.y + (p2.y - p1.y) / 2;
        d += ` C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
    }
    return d;
}

export default function ScrollLine() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dims, setDims] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const update = () =>
            setDims({ width: el.offsetWidth, height: el.offsetHeight });

        update();
        const ro = new ResizeObserver(update);
        ro.observe(el);
        window.addEventListener("resize", update);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", update);
        };
    }, []);

    // Progress scroll dihitung dari section INI sendiri, bukan seluruh halaman
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 0.85", "end 0.6"], // mulai gambar saat section mulai kelihatan, selesai sebelum section habis
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const path = useMemo(
        () => buildSnakePath(dims.width, dims.height),
        [dims]
    );

    return (
        <div
            ref={containerRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-30 w-full h-full"
        >
            {dims.width > 0 && (
                <svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${dims.width} ${dims.height}`}
                    fill="none"
                    className="w-full h-full"
                >
                    <motion.path
                        d={path}
                        stroke="#D2F535"
                        strokeWidth={Math.max(dims.width * 0.012, 10)}
                        strokeLinecap="round"
                        style={{ pathLength }}
                    />
                </svg>
            )}
        </div>
    );
}