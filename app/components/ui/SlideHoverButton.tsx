// "use client";

// import { motion } from "motion/react";
// import React, { useState } from "react";
// import Link from "next/link";

// interface SlideButtonProps {
//     href: string;
//     text: string;
//     icon: React.ReactNode;
// }

// export default function SlideHoverButton({ href, text, icon }: SlideButtonProps) {
//     const [isHovered, setIsHovered] = useState(false);

//     return (
//         <div
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             className="flex items-center gap-1 cursor-pointer"
//         >
//             <Link
//                 href={href}
//                 className="relative bg-[#1a1a1a] text-white text-[15px] px-7 py-3 rounded-full flex items-center justify-center overflow-hidden border border-transparent hover:border-neutral-200/50 shadow-sm"
//             >
//                 <motion.div
//                     className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)] z-0"
//                     initial={{ x: "-100%" }}
//                     animate={{ x: isHovered ? "0%" : "100%" }}
//                     transition={{
//                         type: "tween",
//                         ease: "easeInOut",
//                         duration: 0.25
//                     }}
//                     style={{
//                         left: isHovered ? "0%" : "auto"
//                     }}
//                 />
//                 <span className="relative z-10 font-medium lowercase select-none mix-blend-difference">
//                     {text}
//                 </span>
//             </Link>

//             <div className="relative bg-[#1a1a1a] text-white p-3.5 rounded-full aspect-square flex items-center justify-center overflow-hidden border border-transparent hover:border-neutral-200/50 shadow-sm">
//                 <motion.div
//                     className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)] z-0"
//                     initial={{ x: "-100%" }}
//                     animate={{ x: isHovered ? "0%" : "100%" }}
//                     transition={{
//                         type: "tween",
//                         ease: "easeInOut",
//                         duration: 0.25
//                     }}
//                     style={{
//                         left: isHovered ? "0%" : "auto"
//                     }}
//                 />
//                 <div className="relative z-10 flex items-center justify-center mix-blend-difference">
//                     {icon}
//                 </div>
//             </div>
//         </div>
//     );
// }