"use client";

import { motion, Variants } from "framer-motion";
import Footer from '../components/Layout/Footer'
import PitaSection from "../components/ui/PitaSection";

const wordContainerVariants: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.009,
        },
    },
};

const wordVariants: Variants = {
    initial: { y: "100%", opacity: 0 },
    animate: {
        y: "0%",
        opacity: 1,
        transition: {
            duration: 0.9,
            ease: [0.215, 0.61, 0.355, 1],
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

const containerVariants: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const TextMarqueeRow = ({
    text,
    direction = "left",
}: {
    text: string;
    direction?: "left" | "right";
}) => {
    return (
        <div className="mt-[60px] flex overflow-hidden whitespace-nowrap text-black font-black uppercase tracking-tight text-5xl md:text-7xl lg:text-[80pt] font-cabinet leading-none">
            <motion.div
                animate={{
                    x: direction === "left"
                        ? ["0%", "-50%"]
                        : ["-50%", "0%"]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 45,
                    ease: "linear"
                }}
                className="flex gap-10 pr-10 min-w-full shrink-0 items-center"
            >
                <span>{text}</span>
                <span className="text-[#D2F535]"></span>
                <span>{text}</span>
                <span className="text-[#D2F535]"></span>
                <span>{text}</span>
                <span className="text-[#D2F535]"></span>
                <span>{text}</span>
                <span className="text-[#D2F535]"></span>
            </motion.div>
        </div>
    );
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#e3e3e3] text-gray-900 font-cabinet selection:bg-[#D2F535] selection:text-black flex flex-col justify-between pt-24 md:pt-38">
            <motion.div
                variants={containerVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col items-start justify-start z-10 px-6 md:px-16 w-full max-w-7xl mx-auto"
            >
                <div className="overflow-hidden w-full mb-8">
                    <motion.h1
                        variants={textVariants}
                        className="text-4xl md:text-6xl font-black tracking-tight text-black font-cabinet text-left"
                    >
                        About Me
                    </motion.h1>
                </div>

                <div className="w-full">
                    <motion.p
                        variants={wordContainerVariants}
                        className="text-base md:text-lg text-gray-600 leading-relaxed font-medium tracking-normal font-cabinet max-w-4xl text-left flex flex-wrap"
                    >
                        {`I'm a full-stack developer who enjoys building things that genuinely make life easier for users and businesses. Most of my work sits at the intersection of AI, SaaS, and interactive 3D experiences. I like taking ideas from the first concept all the way to a polished product—whether that means designing a clean React interface or structuring reliable backend microservices. I focus heavily on real results. In past projects, I've helped cut AI response times by about 40% and built automations that removed nearly 80% of the manual work for teams. My goal is always the same: create fast, scalable, and meaningful tools that people actually enjoy using.`
                            .replace(/\s+/g, " ")
                            .trim()
                            .split(" ")
                            .map((word, index) => (
                                <span key={index} className="overflow-hidden inline-block mr-[0.25em] pb-1">
                                    <motion.span variants={wordVariants} className="inline-block">
                                        {word}
                                    </motion.span>
                                </span>
                            ))}
                    </motion.p>
                </div>
            </motion.div>

            <div className="w-full overflow-hidden pt-12 pb-8">
                <TextMarqueeRow text="DESIGNER FULL-STACK DEV" direction="left" />
            </div>
            {/* Page 2 */}
            <section className="min-h-screen w-full flex flex-col justify-between px-6 md:px-16 max-w-7xl mx-auto py-24 md:py-32 space-y-48">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 w-full">
                    <div className="flex flex-col items-start border-t border-gray-300 pt-6">
                        <span className="text-sm font-medium text-gray-400 mb-6 font-cabinet">01</span>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-black font-cabinet mb-6 text-left">
                            Full-Stack JS & TS Development
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium font-cabinet text-left">
                            I specialize in building modern, flexible, and scalable web applications using the JavaScript and TypeScript ecosystems—ranging from interactive frontends built with React and Next.js to high-performance backends powered by Node.js. With structured architecture and strict type-safety, I ensure codebases remain maintainable, efficient, and production-ready.
                        </p>
                    </div>

                    <div className="flex flex-col items-start border-t border-gray-300 pt-6">
                        <span className="text-sm font-medium text-gray-400 mb-6 font-cabinet">02</span>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-black font-cabinet mb-6 text-left">
                            Web Security & Penetration Testing
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium font-cabinet text-left">
                            Beyond building features, I ensure applications are resilient against security exploits right from the early stages. Through proactive penetration testing, I identify vulnerabilities like OWASP Top 10 risks, test authentication mechanisms, and simulate real-world attack scenarios to fortify web applications prior to deployment.
                        </p>
                    </div>

                    <div className="flex flex-col items-start border-t border-gray-300 pt-6">
                        <span className="text-sm font-medium text-gray-400 mb-6 font-cabinet">03</span>
                        <h3 className="text-2xl md:text-3xl font-black tracking-tight text-black font-cabinet mb-6 text-left">
                            Cybersecurity Analysis & Defense
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium font-cabinet text-left">
                            As a cybersecurity analyst, I evaluate threat landscapes, perform routine security audits, and architect robust risk mitigation strategies. My core focus lies in bridging software development with security best practices to protect data integrity, safeguard user privacy, and ensure rapid incident response.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-col items-center justify-center text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black font-cabinet mb-4">
                            Technology Arsenal
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 font-medium font-cabinet max-w-2xl">
                            A comprehensive toolkit for building modern, secure, and scalable applications
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <div className="p-8 bg-transparent rounded-3xl border border-black/10 flex flex-col items-start">
                            <h3 className="text-xl font-black text-black font-cabinet mb-6">
                                Languages & Frameworks
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {["JavaScript", "TypeScript", "PHP", "React", "Next.js", "NestJS", "Vue.js", "Laravel"].map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-5 py-2.5 bg-white/80 rounded-full text-sm font-bold text-gray-800 border border-gray-200 shadow-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-transparent rounded-3xl border border-black/10 flex flex-col items-start">
                            <h3 className="text-xl font-black text-black font-cabinet mb-6">
                                Interactive & Motion
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {["Three.js", "Framer Motion", "GSAP"].map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-5 py-2.5 bg-white/80 rounded-full text-sm font-bold text-gray-800 border border-gray-200 shadow-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-transparent rounded-3xl border border-black/10 flex flex-col items-start">
                            <h3 className="text-xl font-black text-black font-cabinet mb-6">
                                3D & Asset Creation
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {["Blender", "Web 3D Assets"].map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-5 py-2.5 bg-white/80 rounded-full text-sm font-bold text-gray-800 border border-gray-200 shadow-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-transparent rounded-3xl border border-black/10 flex flex-col items-start">
                            <h3 className="text-xl font-black text-black font-cabinet mb-6">
                                UI, Styling & Database
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {["Tailwind CSS", "Framer Motion", "phpMyAdmin", "MongoDB", "Prisma ORM"].map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-5 py-2.5 bg-white/80 rounded-full text-sm font-bold text-gray-800 border border-gray-200 shadow-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <PitaSection />
            <Footer />
        </main>

    );
}