"use client";

import { gsap } from "gsap";
import React, { useState, useEffect, useRef } from "react";
import { FiArrowUpRight, FiX, FiPlus } from 'react-icons/fi';
import { motion, Variants, useMotionValue, useSpring, AnimatePresence } from "motion/react";

import Link from "next/link";
import Image from "next/image";
import MagneticWrapper from "../animations/MagneticWrapper"

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0); 
    const [isHovered, setIsHovered] = useState(false);
    const [contactHovered, setContactHovered] = useState(false);
    const [isNavbarHidden, setIsNavbarHidden] = useState(false);
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [sidebarHoveredIndex, setSidebarHoveredIndex] = useState<number | null>(null);

    const navLink = [
        { list: "Home", href: "/" },
        { list: "About", href: "/about" },
        { list: "Works", href: "/work" },
    ];

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobileOrTablet(window.innerWidth < 1024);
        };
        checkScreenSize();
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 20) {
                setIsNavbarHidden(true);
            } else {
                setIsNavbarHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("resize", checkScreenSize);
        window.addEventListener("scroll", handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener("resize", checkScreenSize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    return (
        <>
            <motion.div 
                animate={{ y: (isNavbarHidden && !isMobileOrTablet) ? "-100%" : "0%" }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="fixed top-0 left-0 right-0 z-50 w-full px-6 lg:px-12 py-6 lg:py-10 pointer-events-none"
            >
                <nav className="flex items-center justify-between w-full bg-transparent pointer-events-auto">
                    <Link href="/">
                        <Image
                            src="/assets/logo.webp"
                            alt="logo"
                            width={36}
                            height={36}
                            className="object-contain w-8 h-8 lg:w-9 lg:h-9"
                        />
                    </Link>
                    
                    <div className="hidden lg:flex items-center gap-11">
                        <div className="flex items-center gap-6">
                            {navLink.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="text-xs lg:text-sm font-medium text-neutral-700 hover:text-black transition-colors overflow-hidden h-[20px] leading-[20px] flex"
                                >
                                    {link.list.toUpperCase().split("").map((char, charIndex) => (
                                        <span key={charIndex} className="relative block h-full">
                                            <motion.span
                                                className="block text-neutral-700"
                                                animate={{ y: hoveredIndex === index ? "-100%" : "0%" }}
                                                transition={{
                                                    type: "tween",
                                                    ease: [0.215, 0.61, 0.355, 1],
                                                    duration: 0.3,
                                                    delay: charIndex * 0.02
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                            <motion.span
                                                className="absolute top-full left-0 block text-black"
                                                animate={{ y: hoveredIndex === index ? "-100%" : "0%" }}
                                                transition={{
                                                    type: "tween",
                                                    ease: [0.215, 0.61, 0.355, 1],
                                                    duration: 0.3,
                                                    delay: charIndex * 0.02
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        </span>
                                    ))}
                                </Link>
                            ))}
                        </div>

                        <div className="hidden lg:block">
                            <MagneticWrapper>
                                <div
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="flex items-center gap-1 cursor-pointer"
                                >
                                    <Link
                                        href="/contact"
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
                    </div>
                </nav>
            </motion.div>

            <AnimatePresence>
                {(isMobileOrTablet || isNavbarHidden) && (
                    <motion.div
                        initial={{ x: "150%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "150%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 24, restDelta: 0.001 }}
                        className="fixed top-5 right-5 lg:top-10 lg:right-12 z-50"
                    >
                        <button
                            onClick={() => setOpen(true)}
                            className="w-14 h-14 lg:w-16 lg:h-16 bg-[#1a1a1a] border border-neutral-800 text-white rounded-3xl flex flex-col gap-1 items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform"
                        >
                            <span className="w-6 h-[2px] bg-white block rounded-full" />
                            <span className="w-6 h-[2px] bg-white block rounded-full" />
                            <span className="w-6 h-[2px] bg-white block rounded-full" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
                        className="fixed inset-y-0 right-0 w-full sm:w-[450px] lg:w-[500px] bg-[#1c1c1c] z-[999] text-white p-6 lg:p-12 flex flex-col justify-between shadow-2xl font-sans"
                    >
                        <div className="flex justify-end w-full">
                            <button
                                onClick={() => setOpen(false)}
                                className="w-14 h-14 bg-neutral-800 text-white rounded-3xl flex items-center justify-center hover:bg-neutral-700 transition-colors"
                            >
                                <FiX size={26} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-5 my-auto pl-2 lg:pl-6">
                            <span className="text-neutral-500 uppercase tracking-widest text-xs border-b border-white/10 pb-4 font-mono">Navigation</span>
                            
                            {navLink.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    onMouseEnter={() => setSidebarHoveredIndex(idx)}
                                    onMouseLeave={() => setSidebarHoveredIndex(null)}
                                    className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-wide flex items-center justify-between border-b border-white/5 pb-4 pr-4 transition-colors group"
                                >
                                    <span className="relative overflow-hidden h-[48px] sm:h-[60px] lg:h-[72px] block w-full">
                                        <motion.span
                                            className="block text-neutral-400 group-hover:text-white"
                                            animate={{ y: sidebarHoveredIndex === idx ? "-100%" : "0%" }}
                                            transition={{ type: "tween", ease: [0.215, 0.61, 0.355, 1], duration: 0.35 }}
                                        >
                                            {link.list}
                                        </motion.span>
                                        <motion.span
                                            className="absolute top-full left-0 block text-white"
                                            animate={{ y: sidebarHoveredIndex === idx ? "-100%" : "0%" }}
                                            transition={{ type: "tween", ease: [0.215, 0.61, 0.355, 1], duration: 0.35 }}
                                        >
                                            {link.list}
                                        </motion.span>
                                    </span>
                                    <FiPlus size={24} className="text-white/20 group-hover:text-white transition-colors flex-shrink-0" />
                                </Link>
                            ))}

                            <Link
                                href="/contact"
                                onClick={() => setOpen(false)}
                                onMouseEnter={() => setContactHovered(true)}
                                onMouseLeave={() => setContactHovered(false)}
                                className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-wide flex items-center justify-between border-b border-white/5 pb-4 pr-4 transition-colors group"
                            >
                                <span className="relative overflow-hidden h-[48px] sm:h-[60px] lg:h-[72px] block w-full">
                                    <motion.span
                                        className="block text-neutral-400 group-hover:text-white"
                                        animate={{ y: contactHovered ? "-100%" : "0%" }}
                                        transition={{ type: "tween", ease: [0.215, 0.61, 0.355, 1], duration: 0.35 }}
                                    >
                                        Contact
                                    </motion.span>
                                    <motion.span
                                        className="absolute top-full left-0 block text-white"
                                        animate={{ y: contactHovered ? "-100%" : "0%" }}
                                        transition={{ type: "tween", ease: [0.215, 0.61, 0.355, 1], duration: 0.35 }}
                                    >
                                        Contact
                                    </motion.span>
                                </span>
                                <FiPlus size={24} className="text-white/20 group-hover:text-white transition-colors flex-shrink-0" />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-2 border-t border-white/10 pt-6">
                            <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-mono">Socials</span>
                            <div className="flex gap-5 text-sm text-neutral-400">
                                <a href="https://linkedin.com" target="_blank" className="hover:text-white transition-colors">LinkedIn</a>
                                <a href="https://github.com/whonixxdev" target="_blank" className="hover:text-white transition-colors">GitHub</a>
                                <a href="https://wa.me/message/KLLVHZ5DVJANF1" target="_blank" className="hover:text-white transition-colors">WhatsApp</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}