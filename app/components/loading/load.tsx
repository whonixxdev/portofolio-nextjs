// "use client";

// import { useEffect, useState } from "react";
// import {
//     motion,
//     useMotionValue,
//     useTransform,
//     animate,
//     AnimatePresence,
// } from "framer-motion";

// const CURTAIN_COLOR = "#1E1E1E";
// const BASELINE = 100; // sama dgn y endpoint di path -> hasilnya flat/lurus

// interface CurveLoaderProps {
//     children: React.ReactNode;
//     duration?: number; // durasi tirai "diam" sebelum mulai reveal (ms)
// }

// export default function CurveLoader({ children, duration = 1200 }: CurveLoaderProps) {
//     const [isLoading, setIsLoading] = useState(true);
//     const curveControlPoint = useMotionValue(BASELINE);
//     const y = useMotionValue(0);

//     const path = useTransform(
//         curveControlPoint,
//         (val) => `M0,100 Q720,${val} 1440,100 L1440,100 L0,100 Z`
//     );

//     useEffect(() => {
//         let cancelled = false;

//         const run = async () => {
//             await new Promise((r) => setTimeout(r, duration));
//             if (cancelled) return;

//             // 1) wind-up
//             await animate(curveControlPoint, BASELINE - 90, {
//                 duration: 0.4,
//                 ease: [0.6, 0, 0.9, 0.2],
//             });
//             if (cancelled) return;

//             // 2) release
//             animate(y, "-100%", {
//                 duration: 1,
//                 ease: [0.76, 0, 0.24, 1],
//                 onComplete: () => setIsLoading(false),
//             });
//             animate(curveControlPoint, BASELINE, {
//                 type: "spring",
//                 stiffness: 120,
//                 damping: 14,
//             });
//         };

//         run();
//         return () => {
//             cancelled = true;
//         };
//     }, [duration]);

//     return (
//         <>
//             {/* konten sudah ter-render dari awal, tinggal ketutup tirai di atasnya */}
//             {children}

//             <AnimatePresence>
//                 {isLoading && (
//                     <motion.div
//                         style={{ y }}
//                         className="fixed inset-0 z-[9999] flex flex-col"
//                     >
//                         <div className="flex-1" style={{ backgroundColor: CURTAIN_COLOR }} />
//                         <svg
//                             viewBox="0 0 1440 100"
//                             preserveAspectRatio="none"
//                             className="relative block w-full h-[60px] sm:h-[100px] md:h-[150px] lg:h-[200px] -mt-px"
//                         >
//                             <motion.path d={path} fill={CURTAIN_COLOR} />
//                         </svg>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </>
//     );
// }