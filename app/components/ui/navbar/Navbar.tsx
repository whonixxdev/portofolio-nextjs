"use client";

import { gsap } from "gsap";
import { useState, useEffect } from "react";
import { FiArrowUpRight } from 'react-icons/fi';
import { motion, Variants } from "motion/react";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [audio, setAudio] = useState(false);
    const [scrol, setScroll] = useState(false);

    const navLink = [
        { list: "HOME", href: "/" },
        { list: "ABOUT", href: "/about" },
        { list: "WORK", href: "/work" },
    ];

    const playHoverSound = () => { };

    const textHoverVariants: Variants = {};

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full px-12 py-10">
            <nav className="flex items-center justify-between w-full bg-transparent">
                <Link href="/">
                    <Image
                        src="/assets/logo.webp"
                        alt="logo"
                        width={36}
                        height={36}
                        className="object-contain"
                    />
                </Link>
                <div className="flex items-center gap-11">
                    <div className="flex items-center gap-6">
                        {navLink.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className="text-xs md:text-sm font-medium text-neutral-700 hover:text-black transition-colors"
                            >
                                {link.list}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer">
                        <Link href="/contact" className="bg-[#1a1a1a] text-white  text-[15px] px-7 py-3 rounded-full flex items-center justify-center">
                            contact
                        </Link>
                        <div className="bg-[#1a1a1a] text-white p-3.5 rounded-full aspect-square flex items-center justify-center">
                            <FiArrowUpRight size={18} />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}