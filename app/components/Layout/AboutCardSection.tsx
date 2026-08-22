"use client";

import {
    motion,
    useScroll,
    useTransform,
    useInView,
    animate,
    useVelocity,
    useSpring,
    useAnimationFrame,
    useMotionValue
} from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TaskAbout from "../ui/TaskAbout";

gsap.registerPlugin(ScrollTrigger);

function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

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

function SmoothMarqueeTask({
    children,
    baseVelocity = 0.5
}: {
    children: React.ReactNode;
    baseVelocity?: number
}) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 60,
        stiffness: 180,
    });

    const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-2, 1, 2], {
        clamp: false,
    });

    const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        const currentVelocity = velocityFactor.get();

        if (currentVelocity < 0) {
            directionFactor.current = 1;
        } else if (currentVelocity > 0) {
            directionFactor.current = -1;
        }

        moveBy += directionFactor.current * Math.abs(currentVelocity) * (delta / 1000) * 1.5;
        baseX.set(baseX.get() - moveBy);
    });

    return (
        <div className="overflow-hidden w-full relative flex flex-nowrap select-none">
            <motion.div className="flex flex-nowrap w-max" style={{ x }}>
                <div className="flex-shrink-0 flex items-stretch">{children}</div>
                <div className="flex-shrink-0 flex items-stretch">{children}</div>
            </motion.div>
        </div>
    );
}

export default function AboutCardSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
    const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["40px", "20px"]);

    return (
        <div ref={sectionRef} className="w-full bg-[#1E1E1E] relative z-20">
            <motion.section
                style={{
                    scale,
                    borderTopLeftRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                }}
                className="w-full bg-[#F3F3EF] text-black pt-8 md:pt-10 pb-16 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden"
            >
                <div className="w-full overflow-hidden whitespace-nowrap border-b border-black/10 pb-6 md:pb-8 pt-2 md:pt-4 select-none">
                    <motion.div
                        className="inline-flex gap-4 sm:gap-8 items-center text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase font-cabinet"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        }}
                    >
                        <span>FRONT-END DEVELOPER</span>
                        <span className="text-[#D2F535] text-xl sm:text-3xl">✦</span>
                        <span>CYBERSECURITY ANALYST</span>
                        <span className="text-[#D2F535] text-xl sm:text-3xl">✦</span>
                        <span>FRONT-END DEVELOPER</span>
                        <span className="text-[#D2F535] text-xl sm:text-3xl">✦</span>
                    </motion.div>
                </div>

                {/* Profile Photo */}
                <div className="relative max-w-4xl mx-auto my-8 sm:my-12 flex justify-center items-center">
                    <div className="relative w-[220px] xs:w-[260px] sm:w-[350px] md:w-[420px] aspect-[3/4] overflow-hidden">
                        <Image
                            src="/assets/Photo.svg"
                            alt="Profile Photo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 my-8 sm:my-16 border-b border-black/10 pb-12 sm:pb-16">
                    <div>
                        <h2 className="text-xl sm:text-3xl md:text-4xl font-cabinet font-medium leading-tight">
                            Driving measurable growth and engagement through thoughtful design and engineering.
                        </h2>
                    </div>
                    <div className="text-neutral-700 text-sm sm:text-lg leading-relaxed flex flex-col gap-3 sm:gap-4 font-sans">
                        <p>
                            Every product I build starts with understanding user goals and translating them into intuitive, high-performance experiences.
                        </p>
                        <p>
                            From concept to launch, I focus on meaningful results—boosting user engagement, retention, and overall business impact.
                        </p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                    <div>
                        <p className="text-[10px] sm:text-sm text-neutral-500 font-mono uppercase tracking-wider mb-1 sm:mb-2">
                            Years of Experience
                        </p>
                        <p className="text-4xl sm:text-6xl lg:text-7xl font-bold font-cabinet tracking-tight">
                            <AnimatedCounter to={2} suffix="+" />
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] sm:text-sm text-neutral-500 font-mono uppercase tracking-wider mb-1 sm:mb-2">
                            Projects Completed
                        </p>
                        <p className="text-4xl sm:text-6xl lg:text-7xl font-bold font-cabinet tracking-tight">
                            <AnimatedCounter to={14} suffix="+" />
                        </p>
                    </div>
                </div>

                <div className="mt-16 sm:mt-30 md:mt-55 w-full">
                    <div className="max-w-6xl mx-auto mb-8 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-cabinet font-normal text-black max-w-3xl leading-tight">
                            Transforming ideas into exceptional digital experiences through expertise and innovation
                        </h2>
                    </div>
                    <SmoothMarqueeTask baseVelocity={1.5}>
                        <TaskAbout />
                    </SmoothMarqueeTask>
                </div>
            </motion.section>
        </div>
    );
}