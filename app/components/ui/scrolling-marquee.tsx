import { motion } from "framer-motion";

const MarqueeRow = ({ text, direction = "left" }: { text: string; direction?: "left" | "right" }) => {
    return (
        <div className="flex overflow-hidden whitespace-nowrap bg-gray-950 text-gray-200 py-5 text-xl md:text-2xl font-black uppercase tracking-wider font-['CabinetGrotesk-Extrabold',_sans-serif]">
            <motion.div
                animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="flex gap-8 pr-8 min-w-full shrink-0 items-center"
            >
                <span>{text}</span>
                <span className="text-[#D2F535]">★</span>
                <span>{text}</span>
                <span className="text-[#D2F535]">★</span>
                <span>{text}</span>
                <span className="text-[#D2F535]">★</span>
                <span>{text}</span>
                <span className="text-[#D2F535]">★</span>
            </motion.div>
        </div>
    );
};

export default function InfiniteMarqueeSection() {
    return (
        <div className="relative w-full py-32 overflow-hidden flex items-center justify-center">
            <div className="absolute w-[130%] -rotate-6 z-10 shadow-xl">
                <MarqueeRow text="BUILT WITH CODE CUSTOM WEB EXPERIENCES DRIVEN BY PASSION" direction="left" />
            </div>

            <div className="absolute w-[130%] rotate-6 z-0 shadow-xl">
                <MarqueeRow text="DEVELOPMENT FOR YOU CREATIVE SOLUTIONS MODERN DESIGN" direction="right" />
            </div>
        </div>
    );
}