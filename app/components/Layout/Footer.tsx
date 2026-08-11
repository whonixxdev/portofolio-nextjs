"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface IntlDateTimeFormatOptions {
    timeZone: String;
    hour: Number;
    minute: Number;
    hour12: String;
}

export default function Footer() {
    const [time, setTime] = useState<string>("");

    const navLink = [
        { list: "Home", href: "/" },
        { list: "Work", href: "/work" },
        { list: "About", href: "/about" },
        { list: "Contact", href: "/contact" },
    ];

    const socialLinks = [
        { list: "Email", href: "mailto:mradea@gmail.com" },
        { list: "Linkedin", href: "https://linkedin.com" },
        { list: "Whatsapp", href: "https://wa.me/message/KLLVHZ5DVJANF1" },
        { list: "Github", href: "https://github.com/whonixxdev" },
    ];

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Asia/Jakarta",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            };
            const timeString = now.toLocaleTimeString("en-US", options);
            setTime(`${timeString} UTC+7`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-full bg-[#141414] text-white pt-16 pb-16 px-6 md:px-12 lg:px-20 border-t border-neutral-800/60 relative z-30">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-8 items-start">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 flex-1 w-full">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                            LINKS
                        </h4>
                        <ul className="flex flex-col gap-2.5 text-sm md:text-base font-light text-neutral-300">
                            {navLink.map((item) => (
                                <li key={item.list}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        {item.list}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                            SOCIALS
                        </h4>
                        <ul className="flex flex-col gap-2.5 text-sm md:text-base font-light text-neutral-300">
                            {socialLinks.map((item) => (
                                <li key={item.list}>
                                    <a
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-white transition-colors duration-200"
                                    >
                                        {item.list}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                            LOCAL TIME
                        </h4>
                        <p className="text-sm md:text-base font-light text-neutral-300 select-none">
                            {time || "2:45 PM UTC+7"}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500">
                            VERSION
                        </h4>
                        <p className="text-sm md:text-base font-light text-neutral-300 select-none">
                            2026 © Edition
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 items-start lg:items-end w-full lg:w-auto">
                    <a
                        href="https://wa.me/message/KLLVHZ5DVJANF1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-full border border-neutral-700/80 hover:border-white text-xs md:text-sm font-light text-neutral-200 hover:text-white transition-all duration-300 bg-neutral-900/40 hover:bg-neutral-800/60"
                    >
                        +6283114650422
                    </a>
                    <a
                        href="mailto:mradea@gmail.com"
                        className="px-6 py-3 rounded-full border border-neutral-700/80 hover:border-white text-xs md:text-sm font-light text-neutral-200 hover:text-white transition-all duration-300 bg-neutral-900/40 hover:bg-neutral-800/60"
                    >
                        mradea@gmail.com
                    </a>
                </div>
            </div>
        </footer>
    );
}