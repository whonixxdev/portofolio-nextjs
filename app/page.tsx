"use client";

import { useRef } from "react";

import HeroSection from "./components/Layout/HeroSection";
import AboutSection from "./components/Layout/AboutSection";
import AboutCardSection from "./components/Layout/AboutCardSection"
import Footer from './components/Layout/Footer'
import MusicPlayer from "./components/Layout/MusicPlayer";
import ExperienceSection from './components/animations/ExperienceSection'
import PitaSection from './components/ui/PitaSection'


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main
      ref={containerRef}
      className="bg-white min-h-screen w-full overflow-x-hidden relative [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <HeroSection />

      <AboutSection containerRef={containerRef} />

      <AboutCardSection />

      <ExperienceSection />

      <PitaSection />
      
      <MusicPlayer />
      <Footer />
    </main>
  );
}