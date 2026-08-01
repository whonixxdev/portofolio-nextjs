"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { FaLinkedin, FaWhatsapp, FaGithub } from "react-icons/fa";
import MagneticWrapper from "../animations/MagneticWrapper";

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
        <div className="relative h-screen w-full bg-white overflow-hidden flex flex-col items-center justify-center">
            {/* Social Links Side Navigation */}
            <div className="absolute left-6 lg:left-10 top-[59%] -translate-y-1/2 flex flex-col items-center z-10">
                <div className="hidden lg:flex flex-col items-center">
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    <div className="w-[1px] h-68 bg-neutral-800" />
                    <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </div>

                <div className="flex flex-col items-center gap-5 lg:gap-7.5 mt-0 lg:mt-10">
                    <MagneticWrapper>
                        <Link
                            href="https://linkedin.com"
                            target="_blank"
                            className="text-neutral-700 hover:text-black transition-colors duration-200 block"
                        >
                            <FaLinkedin className="w-6 h-6 lg:w-[29px] lg:h-[29px]" />
                        </Link>
                    </MagneticWrapper>

                    <MagneticWrapper>
                        <Link
                            href="https://wa.me/message/KLLVHZ5DVJANF1"
                            target="_blank"
                            className="text-neutral-700 hover:text-black transition-colors duration-200 block"
                        >
                            <FaWhatsapp className="w-6 h-6 lg:w-[29px] lg:h-[29px]" />
                        </Link>
                    </MagneticWrapper>

                    <MagneticWrapper>
                        <Link
                            href="https://github.com/whonixxdev"
                            target="_blank"
                            className="text-neutral-700 hover:text-black transition-colors duration-200 block"
                        >
                            <FaGithub className="w-6 h-6 lg:w-[29px] lg:h-[29px]" />
                        </Link>
                    </MagneticWrapper>
                </div>
            </div>

            {/* Main Hero Text */}
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col items-center justify-center pointer-events-none select-none z-10 px-4 text-center"
            >
                <div className="overflow-hidden mb-2 lg:mb-3">
                    <motion.span
                        variants={textVariants}
                        className="block font-cabinet font-light text-[16px] sm:text-[18px] lg:text-[22px] text-black/80 tracking-wide"
                    >
                        Hi! i'm Radea
                    </motion.span>
                </div>

                <h1 className="font-cabinet font-light text-[32px] xs:text-[40px] sm:text-[58px] md:text-[68px] lg:text-[84px] text-black leading-[1.2] lg:leading-[1.1] tracking-tight max-w-[95vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
                    <div className="overflow-hidden w-full block whitespace-nowrap">
                        <motion.span variants={textVariants} className="block">
                            Front-End Developer &
                        </motion.span>
                    </div>

                    <div className="overflow-hidden w-full block whitespace-nowrap">
                        <motion.span variants={textVariants} className="block">
                            Cybersecurity Analyst.
                        </motion.span>
                    </div>
                </h1>
            </motion.div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex justify-center items-center z-10">
                <span className="font-cabinet text-[18px] lg:text-[24px] leading-normal text-black/80 hover:text-black lowercase select-none transition-colors duration-200">
                    scroll down
                </span>
            </div>
        </div>
    );
}