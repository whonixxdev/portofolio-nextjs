"use client"
import { motion } from "framer-motion";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import MagneticWrapper from "./MagneticWrapper";
import Link from "next/link";



export default function magnetSection() {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <>
            <div className="hidden lg:block">
                <MagneticWrapper>
                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="flex items-center gap-1 cursor-pointer"
                    >
                        <Link
                            href="/about"
                            className="relative bg-[#1a1a1a] text-white text-[15px] px-7 py-3 rounded-full flex items-center justify-center overflow-hidden border border-transparent hover:border-neutral-200/50 shadow-sm"
                        >
                            <motion.div
                                className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)] z-0"
                                initial={{ x: "-100%" }}
                                animate={{ x: isHovered ? "0%" : "100%" }}
                                transition={{
                                    type: "tween",
                                    ease: "easeInOut",
                                    duration: 0.25
                                }}
                                style={{
                                    left: isHovered ? "0%" : "auto"
                                }}
                            />
                            <span className="relative z-10 font-medium lowercase select-none mix-blend-difference flex overflow-hidden h-[22px] leading-[22px]">
                                {"contact".split("").map((char, index) => (
                                    <span key={index} className="relative block h-full">
                                        <motion.span
                                            className="block"
                                            animate={{ y: isHovered ? "-100%" : "0%" }}
                                            transition={{
                                                type: "tween",
                                                ease: [0.215, 0.61, 0.355, 1],
                                                duration: 0.3,
                                                delay: index * 0.02
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                        <motion.span
                                            className="absolute top-full left-0 block"
                                            animate={{ y: isHovered ? "-100%" : "0%" }}
                                            transition={{
                                                type: "tween",
                                                ease: [0.215, 0.61, 0.355, 1],
                                                duration: 0.3,
                                                delay: index * 0.02
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    </span>
                                ))}
                            </span>
                        </Link>

                        <div className="relative bg-[#1a1a1a] text-white p-3.5 rounded-full aspect-square flex items-center justify-center overflow-hidden border border-transparent hover:border-neutral-200/50 shadow-sm">
                            <motion.div
                                className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)] z-0"
                                initial={{ x: "-100%" }}
                                animate={{ x: isHovered ? "0%" : "100%" }}
                                transition={{
                                    type: "tween",
                                    ease: "easeInOut",
                                    duration: 0.25
                                }}
                                style={{
                                    left: isHovered ? "0%" : "auto"
                                }}
                            />
                            <div className="relative z-10 flex items-center justify-center mix-blend-difference">
                                <FiArrowUpRight size={18} />
                            </div>
                        </div>
                    </div>
                </MagneticWrapper>
            </div>
        </>
    )
}