"use client"

import type { Metadata } from "next";
import { useState, useEffect } from "react";
import "./globals.css";
import Navbar from "./components/ui/Navbar";
import CustomCursor from "./components/animations/cursor_costome";
import SmoothScroll from "./components/animations/ScrollSmooth";


// import Loading from "./components/loading/loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);



  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-full flex flex-col antialiased bg-white text-black">
        <Navbar />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

// export { metadata } from "./layout_metadata"