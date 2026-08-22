"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
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
            <section className="sticky top-0 bg-[#1E1E1E] w-full min-h-screen h-auto md:h-screen pt-16 md:pt-24 pb-8 md:pb-12 px-4 sm:px-6 md:px-16 lg:px-32 text-white z-10 flex flex-col justify-between items-center">
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%] pointer-events-none select-none">
                    <svg
                        viewBox="0 0 1440 100"
                        className="relative block w-full h-[60px] sm:h-[100px] md:h-[150px] lg:h-[200px]"
                        preserveAspectRatio="none"
                    >
                        <motion.path
                            d={useTransform(
                                curveControlPoint,
                                (val) => `M0,100 Q720,${val} 1440,100 L1440,100 L0,100 Z`
                            )}
                            fill="#1E1E1E"
                        />
                    </svg>
                </div>

                <div className="max-w-5xl mx-auto flex flex-col gap-6 md:gap-10 items-center my-auto w-full">
                    <div className="flex flex-col gap-5 md:gap-9 max-w-4xl text-center mx-auto">
                        <p className="font-cabinet text-2xl sm:text-3xl md:text-3xl lg:text-[60px] font-medium leading-tight tracking-tight">
                            As a Junior Front-end Developer, I focus on creating fast, responsive, and visually appealing websites.
                        </p>

                        <p className="text-neutral-400 text-sm sm:text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
                            As a Junior Front-end Developer, I focus on Next.js, React, and modern UI design, creating responsive and visually engaging digital experiences with clean and maintainable code.
                        </p>
                    </div>

                    <div className="w-full flex justify-center pt-2">
                        <MagneticWrapper>
                            <div
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <Link
                                    href="/about"
                                    className="relative bg-[#fff] text-white text-[14px] sm:text-[15px] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full flex items-center justify-center overflow-hidden border border-neutral-800 hover:border-neutral-700 shadow-sm"
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
                                        {"about-me".split("").map((char, index) => (
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

                                <div className="relative bg-[#fff] text-white p-3 sm:p-4 rounded-full aspect-square flex items-center justify-center overflow-hidden border border-neutral-800 hover:border-neutral-700 shadow-sm">
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
                                        <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                </div>
                            </div>
                        </MagneticWrapper>
                    </div>
                </div>

                <div className="w-full flex justify-between items-center text-xs sm:text-sm text-neutral-300 font-light pt-4 md:pt-6 pb-2 md:pb-4 border-b border-neutral-800/80">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <FiArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>Scroll to Explore</span>
                    </div>
                    <div>
                        <span>My Short Story</span>
                    </div>
                </div>
            </section>
        </div>
    );
}