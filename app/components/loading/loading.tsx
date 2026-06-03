"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Loading() {
    const [index, setIndex] = useState(0);

    const word = [
        "• Welcome",
        "• ようこそ",
        "• 환영합니다",
        "• Bienvenue",
        "• Bienvenido",
        "• Willkommen",
        "• أهلاً وسهلاً",
        "• Benvenuto",
        "• Welkom",
        "•  Добро пожаловать"
    ];

    useEffect(() => {
        if (index === word.length - 1) return;

        const baseDelay = 350;
        const accelerationFactor = 0.85; 
        const currentDelay = Math.max(60, baseDelay * Math.pow(accelerationFactor, index));

        const timeout = setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : currentDelay);

        return () => clearTimeout(timeout);
    }, [index]);

    return (
        <main className="fixed inset-0 bg-black w-full min-h-screen z-[9999] flex items-center justify-center select-none pointer-events-none">
            <div className="flex items-center justify-center px-10">
                <motion.p
                    key={index}
                    className="text-white text-3xl md:text-5xl font-bold tracking-wide font-['Cabinet_Grotesk',sans-serif]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                >
                    {word[index]}
                </motion.p>
            </div>
        </main>
    );
}