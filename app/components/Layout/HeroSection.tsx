"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import MagneticWrapper from "../animations/MagneticWrapper";

// ==========================================================
// import FluidBlob from "../animations/FluidBlob"; >> Rebuild
// ==========================================================

const containerVariants: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const textVariants: Variants = {
    initial: { y: "100%", opacity: 0 },
    animate: {
        y: "0%",
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1],
        },
    },
};

export default function HeroSection() {
    return (
        <div className="relative h-screen min-h-[600px] w-full overflow-hidden flex flex-col items-center justify-center">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover mix-blend-multiply scale-105 sm:scale-110 md:scale-100"
                >
                    <source src="/assets/glassyObj.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Social Links Side Navigation */}
            <div className="absolute left-4 sm:left-6 lg:left-10 top-1/2 lg:top-[59%] -translate-y-1/2 flex flex-col items-center z-20">
                {/* Decorative Line (Desktop Only) */}
                <div className="hidden lg:flex flex-col items-center">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    <div className="w-[1px] h-68 bg-neutral-800" />
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </div>

                {/* Icons */}
                <div className="flex flex-col items-center gap-4 sm:gap-5 lg:gap-7.5 mt-0 lg:mt-10">
                    <MagneticWrapper>
                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            className="text-neutral-700 hover:text-black transition-colors duration-200 block p-1"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[29px] lg:h-[29px]" />
                        </Link>
                    </MagneticWrapper>

                    <MagneticWrapper>
                        <Link
                            href="https://wa.me/message/KLLVHZ5DVJANF1"
                            target="_blank"
                            className="text-neutral-700 hover:text-black transition-colors duration-200 block p-1"
                            aria-label="WhatsApp"
                        >
                            <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[29px] lg:h-[29px]" />
                        </Link>
                    </MagneticWrapper>

                    <MagneticWrapper>
                        <Link
                            href="https://github.com/whonixxdev"
                            target="_blank"
                            className="text-neutral-700 hover:text-black transition-colors duration-200 block p-1"
                            aria-label="GitHub"
                        >
                            <FaGithub className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[29px] lg:h-[29px]" />
                        </Link>
                    </MagneticWrapper>
                </div>
            </div>

            {/* Main Hero Text */}
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center justify-center pointer-events-none select-none z-10 px-6 sm:px-8 text-center max-w-full"
            >
                <div className="overflow-hidden mb-2 lg:mb-3">
                    <motion.span
                        variants={textVariants}
                        className="block font-cabinet font-light text-[14px] xs:text-[16px] sm:text-[18px] lg:text-[22px] text-black/80 tracking-wide"
                    >
                        Hi! i'm Radea
                    </motion.span>
                </div>

                <h1 className="font-cabinet font-light text-[28px] xs:text-[36px] sm:text-[52px] md:text-[68px] lg:text-[84px] text-black leading-[1.25] sm:leading-[1.2] lg:leading-[1.1] tracking-tight max-w-[90vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
                    <div className="overflow-hidden w-full block whitespace-normal lg:whitespace-nowrap">
                        <motion.span variants={textVariants} className="block">
                            Front-End Developer &
                        </motion.span>
                    </div>

                    <div className="overflow-hidden w-full block whitespace-normal lg:whitespace-nowrap">
                        <motion.span variants={textVariants} className="block">
                            Cybersecurity Analyst.
                        </motion.span>
                    </div>
                </h1>
            </motion.div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-8 sm:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 flex justify-center items-center z-10">
                <span className="font-cabinet text-[14px] sm:text-[18px] lg:text-[24px] leading-normal text-black/80 hover:text-black lowercase select-none transition-colors duration-200">
                    scroll down
                </span>
            </div>
        </div>
    );
}