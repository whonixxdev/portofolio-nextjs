"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
    // 1. Menyimpan koordinat X dan Y mouse menggunakan Motion Value
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // 2. Menambahkan efek spring agar gerakan bulatannya mulus dan ada efek jeda halus (inertia)
    const springConfig = { damping: 70, stiffness: 400, mass: 0.4 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 24);
            cursorY.set(e.clientY - 24);
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="fixed top-0 left-0 w-9 h-9 border border-black rounded-full pointer-events-none z-[9999]"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        />
    );
}