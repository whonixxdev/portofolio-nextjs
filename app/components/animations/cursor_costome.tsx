"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
    const [isDesktop, setIsDesktop] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 70, stiffness: 400, mass: 0.4 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const checkDevice = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkDevice();
        window.addEventListener("resize", checkDevice);

        const moveCursor = (e: MouseEvent) => {
            if (window.innerWidth >= 1024) {
                cursorX.set(e.clientX - 18);
                cursorY.set(e.clientY - 18);
            }
        };

        window.addEventListener("mousemove", moveCursor);

        return () => {
            window.removeEventListener("resize", checkDevice);
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY]);

    if (!isDesktop) return null;

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