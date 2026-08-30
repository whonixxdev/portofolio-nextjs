"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface PitaWorkSectionProps {
    title: string;
    imageUrl?: string;
}

export default function PitaWorkSection({ title, imageUrl }: PitaWorkSectionProps) {
    return (
        <div className="w-full h-full bg-black text-white flex items-center overflow-hidden select-none absolute inset-0">
            <motion.div
                className="flex whitespace-nowrap items-center gap-6 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 15,
                }}
            >
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center gap-6 shrink-0">
                        <span className="text-lg md:text-2xl font-light uppercase tracking-wider">
                            {title}
                        </span>
                        {imageUrl && (
                            <div className="w-16 h-8 md:w-20 md:h-10 relative rounded-full overflow-hidden border border-white/20">
                                <Image
                                    src={imageUrl}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}