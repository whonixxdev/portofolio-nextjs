"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Experience = {
    title: string;
    role: string;
    description: string;
    date: string;
    align: "left" | "right";
};

const EXPERIENCES: Experience[] = [
    {
        title: "SMK TI BALI GLOBAL SINGARAJA",
        role: "Software Engineering Student\n(Rekayasa Perangkat Lunak)",
        description:
            "Studied software engineering fundamentals through hands-on projects and collaborative development, with a focus on frontend, backend, and mobile technologies.",
        date: "JUL 2025 - 2026",
        align: "left",
    },
    {
        title: "Trivox Studio",
        role: "Freelance Front-End Developer",
        description:
            "Contributed to client projects by building responsive websites and dashboards, implementing frontend interfaces, backend services, authentication, and data management features.",
        date: "2026 - PRESENT",
        align: "right",
    },
    {
        title: "SMK TI BALI GLOBAL BADUNG",
        role: "Software Engineering Student\n(Rekayasa Perangkat Lunak)",
        description:
            "Continuing software engineering studies with a focus on practical development, collaborative projects, and expanding skills across frontend, backend, and mobile technologies.",
        date: "2026 - PRESENT",
        align: "left",
    },
];

function buildSmoothPath(points: { x: number; y: number }[]) {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] ?? points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] ?? p2;
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
}

export default function ExperienceSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const curveRef = useRef<SVGPathElement>(null);
    const spineRef = useRef<SVGPathElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

    const [dims, setDims] = useState({ width: 0, height: 0, introH: 0 });

    useLayoutEffect(() => {
        const measure = () => {
            if (!sectionRef.current || !introRef.current) return;
            setDims({
                width: sectionRef.current.offsetWidth,
                height: sectionRef.current.offsetHeight,
                introH: introRef.current.offsetHeight,
            });
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (sectionRef.current) ro.observe(sectionRef.current);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, []);

    useEffect(() => {
        if (!dims.width || !dims.height || !curveRef.current || !spineRef.current) return;

        const ctx = gsap.context(() => {
            const { width: w, height: h, introH } = dims;
            const entryH = (h - introH) / EXPERIENCES.length;
            const isMobile = w < 768;

            const titles = sectionRef.current?.querySelectorAll("h2, h3");

            // BG Transition Timeline
            const bgTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: true,
                },
            });

            bgTimeline.to(sectionRef.current, {
                backgroundColor: "#1a1a1a",
                ease: "none",
                duration: 0.2,
            }, 0);

            if (titles) {
                bgTimeline.to(titles, {
                    color: "#ffffff",
                    ease: "none",
                    duration: 0.2,
                }, 0);
            }

            bgTimeline.to(sectionRef.current, {
                backgroundColor: "#e3e3e3",
                ease: "none",
                duration: 0.2,
            }, 0.8);

            if (titles) {
                bgTimeline.to(titles, {
                    color: "#1a1a1a",
                    ease: "none",
                    duration: 0.2,
                }, 0.8);
            }

            // Path calculation - Dimulai dari jauh di luar kiri (-100px)
            const curvePoints = isMobile
                ? [
                    { x: -100, y: introH * 0.5 }, // Mulai dari luar layar kiri
                    { x: -20, y: introH * 0.8 },  // Mengalir masuk dari kiri
                    { x: w * 0.5, y: introH * 0.95 },
                    ...EXPERIENCES.map((exp, i) => ({
                        x: exp.align === "left" ? 28 : w * 0.45,
                        y: introH + entryH * i + entryH * 0.5,
                    })),
                ]
                : [
                    { x: -w * 0.2, y: introH * 0.5 }, // Mulai dari luar layar kiri di desktop
                    { x: w * 0.2, y: introH * 0.75 },
                    { x: w * 0.85, y: introH * 1.05 },
                    ...EXPERIENCES.map((exp, i) => ({
                        x: exp.align === "left" ? w * 0.75 : w * 0.25,
                        y: introH + entryH * i + entryH * 0.5,
                    })),
                ];

            curveRef.current!.setAttribute("d", buildSmoothPath(curvePoints));

            const spineX = isMobile ? 28 : w * 0.5;
            const spineD = `M ${spineX} ${introH} L ${spineX} ${h}`;
            spineRef.current!.setAttribute("d", spineD);

            const curveLength = curveRef.current!.getTotalLength();
            const spineLength = spineRef.current!.getTotalLength();

            gsap.set(curveRef.current, {
                strokeDasharray: curveLength,
                strokeDashoffset: curveLength,
            });
            gsap.set(spineRef.current, {
                strokeDasharray: spineLength,
                strokeDashoffset: spineLength,
            });

            gsap.to(curveRef.current, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                },
            });

            gsap.to(spineRef.current, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                },
            });

            itemRefs.current.forEach((item, i) => {
                if (!item) return;
                const children = item.querySelectorAll("[data-reveal]");
                gsap.fromTo(
                    children,
                    { opacity: 0, y: 32 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );

                const dot = dotRefs.current[i];
                if (dot) {
                    gsap.fromTo(
                        dot,
                        { scale: 0, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 0.4,
                            ease: "back.out(3)",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 60%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }
            });

            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, [dims]);

    return (
        <div
            ref={sectionRef}
            className="font-cabinet relative bg-[#e3e3e3] text-[#1a1a1a] overflow-hidden"
        >
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-24 sm:h-32 z-30 bg-gradient-to-b from-[#F3F3EF] via-[#F3F3EF]/60 to-transparent backdrop-blur-[2px]" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 sm:h-32 z-30 bg-gradient-to-t from-[#e3e3e3] via-[#e3e3e3]/60 to-transparent backdrop-blur-[2px]" />

            <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                width={dims.width || undefined}
                height={dims.height || undefined}
            >
                <path
                    ref={curveRef}
                    fill="none"
                    stroke="#97b437"
                    strokeWidth={Math.max(14, Math.min(56, (dims.width || 0) * 0.035))}
                    strokeLinecap="round"
                />
                <path
                    ref={spineRef}
                    fill="none"
                    stroke="#cbf541"
                    strokeWidth={2}
                />
            </svg>

            {/* Title Section */}
            <div ref={introRef} className="relative z-10 flex items-center justify-center px-6 pt-36 sm:pt-40 pb-12 sm:pb-20 text-center">
                <h2 className="font-cabinet max-w-4xl text-2xl sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                    Explore my journey and the technologies that define my craft.
                </h2>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
                {EXPERIENCES.map((exp, i) => {
                    const isLeft = exp.align === "left";
                    return (
                        <div
                            key={exp.title}
                            ref={(el) => {
                                itemRefs.current[i] = el;
                            }}
                            className="relative flex min-h-[50vh] md:min-h-[70vh] items-center pl-8 md:pl-0 py-8 md:py-12"
                        >
                            {/* Dot timeline */}
                            <div
                                ref={(el) => {
                                    dotRefs.current[i] = el;
                                }}
                                className="absolute left-[28px] md:left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#cbf541] shadow-[0_0_15px_rgba(203,245,65,0.8)] z-20"
                            />

                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                                <div
                                    className={`col-span-1 ${isLeft
                                        ? "md:col-start-1 text-left md:pr-12"
                                        : "md:col-start-2 text-left md:pl-12"
                                        }`}
                                >
                                    <div className="relative p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl">
                                        <div className="absolute right-4 top-4 text-4xl sm:text-6xl font-black text-white/5 select-none pointer-events-none">
                                            0{i + 1}
                                        </div>

                                        <h3 data-reveal className="font-cabinet text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                                            {exp.title}
                                        </h3>
                                        <p
                                            data-reveal
                                            className="mt-2 whitespace-pre-line text-sm sm:text-lg md:text-xl font-medium text-neutral-300"
                                        >
                                            {exp.role}
                                        </p>
                                        <p data-reveal className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-neutral-400">
                                            {exp.description}
                                        </p>
                                        <div data-reveal className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                                            <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest text-[#cbf541]">
                                                {exp.date}
                                            </span>
                                            <svg className="w-4 h-4 text-[#cbf541]/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}