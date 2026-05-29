import type { Metadata } from "next";
import "./globals.css";

// import components
import Navbar from "./components/ui/navbar/Navbar"
import CustomCursor from "./components/animations/cursor_costome"


export const metadata: Metadata = {
  title: "Portofolio",
  description: "Portofolio by radea",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Navbar/>
        <CustomCursor/>
        {children}
      </body>
    </html>
  );
}
