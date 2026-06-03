"use client";

import { useRef, useState } from 'react';
import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { FiMusic } from 'react-icons/fi';
import { FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa';

import Link from 'next/link';
import MagneticWrapper from "./components/animations/MagneticWrapper"

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const curveControlPoint = useTransform(scrollYProgress, [0, 1], [100, -180]);

  const toggleMusic = () => {
    if (!audioRef.current) {
      const audio = new Audio("/songs/music/Music.mp3");
      audio.loop = true;
      audioRef.current = audio;
    }

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch((error) => console.log("audio play blocked:", error))
    }
    setIsPlaying(!isPlaying);
  }

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const textVariants: Variants = {
    initial: {
      y: "100%",
      opacity: 0
    },
    animate: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    },
  };

  return (
    <main ref={containerRef} className="bg-white min-h-screen w-full overflow-x-hidden relative">

      <div className="relative h-screen w-full bg-white overflow-hidden flex flex-col items-center justify-center">

        <div className="absolute left-6 lg:left-10 top-[59%] -translate-y-1/2 flex flex-col items-center z-10">
          <div className="hidden lg:flex flex-col items-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="w-[1px] h-68 bg-neutral-800"></div>
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
          </div>

          <div className="flex flex-col items-center gap-5 lg:gap-7.5 mt-0 lg:mt-10">
            <MagneticWrapper>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-neutral-700 hover:text-black transition-colors duration-200 block"
              >
                <FaLinkedin className="w-6 h-6 lg:w-[29px] lg:h-[29px]" />
              </Link>
            </MagneticWrapper>

            <MagneticWrapper>
              <Link
                href="https://wa.me/message/KLLVHZ5DVJANF1"
                target="_blank"
                className="text-neutral-700 hover:text-black transition-colors duration-200 block"
              >
                <FaWhatsapp className="w-6 h-6 lg:w-[29px] lg:h-[29px]" />
              </Link>
            </MagneticWrapper>

            <MagneticWrapper>
              <Link
                href="https://github.com/whonixxdev"
                target="_blank"
                className="text-neutral-700 hover:text-black transition-colors duration-200 block"
              >
                <FaGithub className="w-6 h-6 lg:w-[29px] lg:h-[29px]" />
              </Link>
            </MagneticWrapper>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center justify-center pointer-events-none select-none z-10 px-4 text-center"
        >
          <div className="overflow-hidden mb-2 lg:mb-3">
            <motion.span
              variants={textVariants}
              className="block font-cabinet font-light text-[16px] sm:text-[18px] lg:text-[22px] text-black/80 tracking-wide"
            >
              Hi! i'm Radea
            </motion.span>
          </div>

          <h1 className="font-cabinet font-light text-[32px] xs:text-[40px] sm:text-[58px] md:text-[68px] lg:text-[84px] text-black leading-[1.2] lg:leading-[1.1] tracking-tight max-w-[95vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl">
            <div className="overflow-hidden w-full block whitespace-nowrap">
              <motion.span
                variants={textVariants}
                className="block"
              >
                Front-End Developer &
              </motion.span>
            </div>

            <div className="overflow-hidden w-full block whitespace-nowrap">
              <motion.span
                variants={textVariants}
                className="block"
              >
                Cybersecurity Analyst.
              </motion.span>
            </div>
          </h1>
        </motion.div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex justify-center items-center z-10">
          <span className="font-cabinet text-[18px] lg:text-[24px] leading-normal text-black/80 hover:text-black lowercase select-none transition-colors duration-200">
            scroll down
          </span>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50">
        <MagneticWrapper>
          <button
            onClick={toggleMusic}
            className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl lg:rounded-full bg-[#1a1a1a] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 group"
          >
            <FiMusic className={`w-5 h-5 lg:w-[22px] lg:h-[22px] ${isPlaying ? "animate-spin" : ""}`} />
            <span className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full transition-colors duration-300 ${isPlaying ? "bg-green-400" : "bg-red-500"}`} />
          </button>
        </MagneticWrapper>
      </div>

      <section className="relative bg-black w-full min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-32 text-white z-20">

        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%] pointer-events-none select-none">
          <svg
            viewBox="0 0 1440 100"
            className="relative block w-full h-[100px] md:h-[150px] lg:h-[200px]"
            preserveAspectRatio="none"
          >
            <motion.path
              d={useTransform(curveControlPoint, (val) => `M0,100 Q720,${val} 1440,100 L1440,100 L0,100 Z`)}
              fill="#000000"
            ></motion.path>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-cabinet font-light tracking-tight leading-tight">
              Crafting secure, high-performance digital solutions with engineering precision.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-800">
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
              I specialize in bridging the gap between visually stunning user interfaces and robust cybersecurity infrastructure, ensuring applications are both highly interactive and safe from vulnerabilities.
            </p>
            <div className="flex flex-col gap-6 justify-between items-start md:items-end">
              <p className="text-neutral-500 text-sm font-mono">
                NEXT.JS / TS / GSAP / TAILWIND / PENETRATION TESTING
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 px-6 py-3 rounded-full text-sm font-medium transition-colors"
              >
                Learn More About Me
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}