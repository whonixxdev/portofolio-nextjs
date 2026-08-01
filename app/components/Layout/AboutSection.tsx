"use client";

import { useState } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import MagneticWrapper from "../animations/MagneticWrapper";

interface AboutSectionProps {
    containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function AboutSection({ containerRef }: AboutSectionProps) {
    const [isHovered, setIsHovered] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const curveControlPoint = useTransform(scrollYProgress, [0, 1], [100, -180]);

    return (
        <div className="relative w-full">
            <section className="sticky top-0 bg-black w-full h-screen pt-32 pb-24 px-6 md:px-16 lg:px-32 text-white z-10 flex flex-col justify-center items-center">
                {/* Curved Top Border SVG */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%] pointer-events-none select-none">
                    <svg
                        viewBox="0 0 1440 100"
                        className="relative block w-full h-[100px] md:h-[150px] lg:h-[200px]"
                        preserveAspectRatio="none"
                    >
                        <motion.path
                            d={useTransform(
                                curveControlPoint,
                                (val) => `M0,100 Q720,${val} 1440,100 L1440,100 L0,100 Z`
                            )}
                            fill="#000000"
                        />
                    </svg>
                </div>

                {/* Content Inside Black Card */}
                <div className="max-w-6xl mx-auto flex flex-col gap-4 items-center">
                    <div className="flex flex-col gap-4 max-w-3xl text-center mx-auto">
                        <p className="font-cabinet text-3xl">
                            As a Junior Front-end Developer, I focus on creating fast, responsive, and visually appealing websites. I value clean code, intuitive user experiences, and continuous learning to stay up to date with modern web development.
                        </p>
                    </div>

                    <div className="w-full flex justify-center pt-8 border-t border-neutral-800">
                        <MagneticWrapper>
                            <div
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                {/* About Me Animated Button */}
                                <Link
                                    href="/about"
                                    className="relative bg-[#fff] text-white text-[15px] px-8 py-3.5 rounded-full flex items-center justify-center overflow-hidden border border-neutral-800 hover:border-neutral-700 shadow-sm"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-[#D2F535] shadow-[0_0_20px_rgba(255,255,255,0.6)] z-0"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: isHovered ? "0%" : "100%" }}
                                        transition={{
                                            type: "tween",
                                            ease: "easeInOut",
                                            duration: 0.25,
                                        }}
                                        style={{
                                            left: isHovered ? "0%" : "auto",
                                        }}
                                    />
                                    <span className="relative z-10 font-medium lowercase select-none mix-blend-difference flex overflow-hidden h-[22px] leading-[22px]">
                                        {"About-Me".split("").map((char, index) => (
                                            <span key={index} className="relative block h-full">
                                                <motion.span
                                                    className="block"
                                                    animate={{ y: isHovered ? "-100%" : "0%" }}
                                                    transition={{
                                                        type: "tween",
                                                        ease: [0.215, 0.61, 0.355, 1],
                                                        duration: 0.3,
                                                        delay: index * 0.02,
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
                                                        delay: index * 0.02,
                                                    }}
                                                >
                                                    {char}
                                                </motion.span>
                                            </span>
                                        ))}
                                    </span>
                                </Link>

                                {/* Arrow Icon Badge */}
                                <div className="relative bg-[#fff] text-white p-4 rounded-full aspect-square flex items-center justify-center overflow-hidden border border-neutral-800 hover:border-neutral-700 shadow-sm">
                                    <motion.div
                                        className="absolute inset-0 bg-[#D2F535] shadow-[0_0_20px_rgba(255,255,255,0.6)] z-0"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: isHovered ? "0%" : "100%" }}
                                        transition={{
                                            type: "tween",
                                            ease: "easeInOut",
                                            duration: 0.25,
                                        }}
                                        style={{
                                            left: isHovered ? "0%" : "auto",
                                        }}
                                    />
                                    <div className="relative z-10 flex items-center justify-center mix-blend-difference">
                                        <FiArrowUpRight size={20} />
                                    </div>
                                </div>
                            </div>
                        </MagneticWrapper>
                    </div>
                </div>
            </section>
        </div>
    );
}