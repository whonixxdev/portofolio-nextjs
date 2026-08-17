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
        description: "Strengthening software engineering fundamentals through hands-on projects, collaborative development, and continuous learning in backend, frontend, and mobile technologies.",
        date: "JUL 2025 - PRESENT",
        align: "left",
    },
    {
        title: "SMK TI BALI GLOBAL BADUNG",
        role: "Software Engineering Student\n(Rekayasa Perangkat Lunak)",
        description:
            "Strengthening software engineering fundamentals through hands-on projects, collaborative development, and continuous learning in backend, frontend, and mobile technologies.",
        date: "JUN 2026 - DEC 2025",
        align: "right",
    },
    {
        title: "Trivox Studio",
        role: "Freelance Front-End Developer",
        description:
            "Built and delivered custom dashboards for client projects, developing responsive interfaces, backend services, authentication systems, and data management features.",
        date: " 2026- PRESENT",
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

            const titles = sectionRef.current?.querySelectorAll("h2, h3");

            // --- ANIMASI GSAP TIMELINE TRANSISI BACKGROUND ---
            const bgTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: true,
                },
            });

            // Ubah dari background terang ke gelap
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

            // Ubah kembali dari gelap ke terang di bagian bawah
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

            const curvePoints = [
                { x: -w * 0.1, y: introH * 0.9 },
                { x: w * 0.45, y: introH * 0.75 },
                { x: w * 0.88, y: introH * 1.05 },
                ...EXPERIENCES.map((exp, i) => ({
                    x: exp.align === "left" ? w * 0.75 : w * 0.25,
                    y: introH + entryH * i + entryH * 0.5,
                })),
            ];
            curveRef.current!.setAttribute("d", buildSmoothPath(curvePoints));

            const spineX = w * 0.5;
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
                    { opacity: 0, y: 48 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.08,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 70%",
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
                                start: "top 55%",
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
            {/* Soft Blur & Gradient Blur Top Overlay */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 z-30 bg-gradient-to-b from-[#F3F3EF] via-[#F3F3EF]/60 to-transparent backdrop-blur-[2px]" />

            {/* Soft Blur & Gradient Blur Bottom Overlay */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 z-30 bg-gradient-to-t from-[#e3e3e3] via-[#e3e3e3]/60 to-transparent backdrop-blur-[2px]" />

            <svg
                ref={svgRef}
                className="pointer-events-none absolute inset-0 h-full w-full"
                width={dims.width || undefined}
                height={dims.height || undefined}
            >
                <path
                    ref={curveRef}
                    fill="none"
                    stroke="#97b437"
                    strokeWidth={Math.max(20, Math.min(56, (dims.width || 0) * 0.035))}
                    strokeLinecap="round"
                />
                <path
                    ref={spineRef}
                    fill="none"
                    stroke="#cbf541"
                    strokeWidth={2}
                />
            </svg>

            <div ref={introRef} className="relative z-10 flex items-center justify-center px-6 pt-32 pb-20 text-center">
                <h2 className="font-cabinet max-w-4xl text-4xl font-extrabold leading-tight md:text-6xl tracking-tight">
                    Explore my journey and the technologies that define my craft.
                </h2>
            </div>

            <div className="relative z-10">
                {EXPERIENCES.map((exp, i) => {
                    const isLeft = exp.align === "left";
                    return (
                        <div
                            key={exp.title}
                            ref={(el) => {
                                itemRefs.current[i] = el;
                            }}
                            className="relative flex min-h-[70vh] items-center px-6 md:px-12 py-12"
                        >
                            <div
                                ref={(el) => {
                                    dotRefs.current[i] = el;
                                }}
                                className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#cbf541] shadow-[0_0_15px_rgba(203,245,65,0.8)] z-20"
                            />

                            <div className="w-full grid grid-cols-2 gap-8 items-center">
                                <div
                                    className={`col-span-1 ${isLeft
                                        ? "col-start-1 text-left pr-6 md:pr-10"
                                        : "col-start-2 text-left pl-6 md:pl-10"
                                        }`}
                                >
                                    <h3 data-reveal className="font-cabinet text-3xl font-extrabold tracking-tight md:text-5xl">
                                        {exp.title}
                                    </h3>
                                    <p
                                        data-reveal
                                        className="mt-3 whitespace-pre-line text-lg font-medium text-neutral-400 md:text-2xl"
                                    >
                                        {exp.role}
                                    </p>
                                    <p data-reveal className="mt-4 text-sm leading-relaxed text-neutral-400 md:text-base max-w-lg">
                                        {exp.description}
                                    </p>
                                    <p data-reveal className="mt-4 text-xs font-semibold tracking-widest text-neutral-500 md:text-sm">
                                        {exp.date}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}