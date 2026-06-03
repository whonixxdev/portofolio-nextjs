"use client"

import type { Metadata } from "next";
import { useState, useEffect } from "react";
import "./globals.css";
import Navbar from "./components/ui/navbar/Navbar";
import CustomCursor from "./components/animations/cursor_costome";

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
    <html lang="en">
      <body className="min-h-full flex flex-col antialiased bg-white text-black">
        <Navbar />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

// export { metadata } from "./layout_metadata"