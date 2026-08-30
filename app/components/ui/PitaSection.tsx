"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS_TOP = [
    "BUILT WITH CODE",
    "CUSTOM WEB EXPERIENCES",
    "BUILT WITH CODE",
    "CUSTOM WEB EXPERIENCES",
];

const ITEMS_BOTTOM = [
    "BUILT WITH PASSION",
    "MADE FOR YOU",
    "BUILT WITH PASSION",
    "MADE FOR YOU",
];

export default function PitaWorkSetion() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackTopRef = useRef<HTMLDivElement>(null);
    const trackBottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const trackTop = trackTopRef.current;
            const trackBottom = trackBottomRef.current;

            if (!trackTop || !trackBottom) return;

            const loopTop = gsap.to(trackTop, {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "none",
            });

            const loopBottom = gsap.to(trackBottom, {
                xPercent: 0,
                repeat: -1,
                duration: 20,
                ease: "none",
            });
            gsap.set(trackBottom, { xPercent: -50 });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top bottom",
                end: "bottom top",
                onUpdate: (self) => {
                    const velocity = self.getVelocity() / 100;
                    const timeScale = velocity < 0 ? velocity - 1 : velocity + 1;

                    gsap.to([loopTop, loopBottom], {
                        timeScale: timeScale,
                        duration: 0.3,
                        overwrite: true,
                        onComplete: () => {
                            gsap.to([loopTop, loopBottom], {
                                timeScale: 1,
                                duration: 0.8,
                            });
                        },
                    });
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full bg-[#e5e5e5] overflow-hidden flex items-center justify-center font-cabinet"
        >
            <div className="absolute w-[120vw] bg-[#141414] text-white py-4 shadow-2xl rotate-[-5deg] z-20 overflow-hidden border-y border-neutral-800">
                <div ref={trackTopRef} className="flex whitespace-nowrap w-max gap-8 items-center">
                    {[...ITEMS_TOP, ...ITEMS_TOP].map((item, index) => (
                        <div key={index} className="flex items-center gap-8">
                            <span className="text-xl md:text-3xl font-black tracking-wider uppercase">
                                {item}
                            </span>
                            <span className="text-[#cbf541] text-lg md:text-2xl">✦</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="absolute w-[120vw] bg-[#141414] text-white py-4 shadow-2xl rotate-[5deg] z-10 overflow-hidden border-y border-neutral-800">
                <div ref={trackBottomRef} className="flex whitespace-nowrap w-max gap-8 items-center">
                    {[...ITEMS_BOTTOM, ...ITEMS_BOTTOM].map((item, index) => (
                        <div key={index} className="flex items-center gap-8">
                            <span className="text-xl md:text-3xl font-black tracking-wider uppercase">
                                {item}
                            </span>
                            <span className="text-[#cbf541] text-lg md:text-2xl">✦</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}