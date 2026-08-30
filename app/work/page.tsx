"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PitaWorkSection from "../components/ui/PitaWorkSection";
import PitaSection from "../components/ui/PitaSection";
import Footer from "../components/Layout/Footer";

interface Project {
    id: string;
    title: string;
    bannerImage: string;
}

const projects: Project[] = [
    {
        id: "1",
        title: "Paperplay Company Profile",
        bannerImage: "",
    },
    {
        id: "2",
        title: "SMKN 8 Graduation Website",
        bannerImage: "",
    },
    {
        id: "3",
        title: "Kelas Kita",
        bannerImage: "",
    },
    {
        id: "4",
        title: "Sis Absensi",
        bannerImage: "",
    },
];

export default function WorkPage() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="w-full min-h-screen bg-[#e2e2e2] text-black overflow-x-hidden">
            <main className="pt-36 md:pt-40 pb-20 px-6 md:px-16">
                <section className="max-w-4xl mb-24">
                    <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-6">
                        My Work
                    </h1>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl font-light">
                        Discover my latest works where design, technology, and creativity come
                        together to craft engaging digital experiences. Below is a collection
                        of my favourites.
                    </p>
                </section>

                <section className="flex flex-col border-t border-gray-400 -mx-6 md:-mx-16">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="relative w-full py-8 md:py-10 border-b border-gray-400 flex justify-center items-center cursor-pointer overflow-hidden px-6 md:px-16"
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <h2 className="text-lg md:text-2xl font-light uppercase tracking-widest text-center text-black">
                                {project.title}
                            </h2>

                            <AnimatePresence>
                                {hoveredId === project.id && (
                                    <motion.div
                                        initial={{ clipPath: "inset(50% 0 50% 0)" }}
                                        animate={{ clipPath: "inset(0% 0 0% 0)" }}
                                        exit={{ clipPath: "inset(50% 0 50% 0)" }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="absolute inset-0 z-10"
                                    >
                                        <PitaWorkSection
                                            title={project.title}
                                            imageUrl={project.bannerImage}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </section>
            </main>

            <div className="w-full overflow-hidden">
                <PitaSection />
            </div>
            <Footer />
        </div>
    );
}