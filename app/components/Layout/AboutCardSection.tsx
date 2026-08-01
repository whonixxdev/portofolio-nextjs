"use client";

import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";

interface AnimatedCounterProps {
    from?: number;
    to: number;
    suffix?: string;
    duration?: number;
}

function AnimatedCounter({
    from = 0,
    to,
    suffix = "+",
    duration = 1.8,
}: AnimatedCounterProps) {
    const nodeRef = useRef<HTMLSpanElement>(null);

    const isInView = useInView(nodeRef, { margin: "-50px 0px" });

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        if (isInView) {
            const controls = animate(from, to, {
                duration: duration,
                ease: "easeOut",
                onUpdate(value) {
                    node.textContent = Math.floor(value) + suffix;
                },
            });
            return () => controls.stop();
        } else {
            node.textContent = from + suffix;
        }
    }, [isInView, from, to, suffix, duration]);

    return <span ref={nodeRef}>{from}{suffix}</span>;
}

export default function AboutCardSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const borderRadius = useTransform(scrollYProgress, [0, 1], ["80px", "40px"]);

    return (
        <div ref={sectionRef} className="w-full bg-black relative z-20">
            <motion.section
                style={{
                    scale,
                    borderTopLeftRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                }}
                className="w-full bg-[#F3F3EF] text-black shadow-[0_-20px_50px_rgba(0,0,0,0.5)] pt-10 pb-24 px-6 md:px-12 lg:px-20 overflow-hidden"
            >
                <div className="w-full overflow-hidden whitespace-nowrap border-b border-black/10 pb-8 pt-4 select-none">
                    <motion.div
                        className="inline-flex gap-8 items-center text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase font-cabinet"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        }}
                    >
                        <span>FRONT-END DEVLOPER</span>
                        <span className="text-[#D2F535] text-3xl">✦</span>
                        <span>CYBERSECURITY ANALYST</span>
                        <span className="text-[#D2F535] text-3xl">✦</span>
                        <span>FRONT-END DEVELOPER</span>
                        <span className="text-[#D2F535] text-3xl">✦</span>
                    </motion.div>
                </div>

                <div className="relative max-w-4xl mx-auto my-12 flex justify-center items-center">
                    <div className="relative z-0 w-[280px] sm:w-[350px] md:w-[420px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-neutral-200">
                        <Image
                            src="/assets/profile.jpg"
                            alt="Profile Photo"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 my-16 border-b border-black/10 pb-16">
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-cabinet font-medium leading-tight">
                            Driving measurable growth and engagement through thoughtful design and engineering.
                        </h2>
                    </div>
                    <div className="text-neutral-700 text-base sm:text-lg leading-relaxed flex flex-col gap-4 font-sans">
                        <p>
                            Every product I build starts with understanding user goals and translating them into intuitive, high-performance experiences.
                        </p>
                        <p>
                            From concept to launch, I focus on meaningful results—boosting user engagement, retention, and overall business impact.
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <p className="text-xs sm:text-sm text-neutral-500 font-mono uppercase tracking-wider mb-2">
                            Years of Experience
                        </p>
                        <p className="text-5xl sm:text-6xl lg:text-7xl font-bold font-cabinet tracking-tight">
                            <AnimatedCounter to={2} suffix="+" />
                        </p>
                    </div>

                    <div>
                        <p className="text-xs sm:text-sm text-neutral-500 font-mono uppercase tracking-wider mb-2">
                            Projects Completed
                        </p>
                        <p className="text-5xl sm:text-6xl lg:text-7xl font-bold font-cabinet tracking-tight">
                            <AnimatedCounter to={29} suffix="+" />
                        </p>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}