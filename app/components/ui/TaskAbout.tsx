import React from 'react';
import { Map, LayoutGrid, Hexagon, Code2, Network, PenTool, ShieldCheck, UsersRound } from 'lucide-react';

// mendefinisikan untuk mengetahui apa sesuai kreteria atau tidak 
// Selalu check apakan "TaskCardProps" sudah sesuai kreteria atau belum 
interface TaskCardProps {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
}


// Variabel Status Untuk menampilkan Isi Ui data
const services: TaskCardProps[] = [
    {
        number: '01',
        title: 'Cybersecurity & Security Analysis',
        description:
            'Analyzing networks, investigating security threats, reverse engineering systems, uncovering phishing techniques, and exploring data to understand how systems work and where they can be improved.',
        icon: <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-black" />,
    },
    {
        number: '02',
        title: 'UI/UX Design & Figma',
        description:
            'Designing elegant, clean, and lightweight interfaces with a strong sense of visual balance, usability, and modern user experience using Figma.',
        icon: <PenTool className="w-5 h-5 md:w-6 md:h-6 text-black" />,
    },
    {
        number: '03',
        title: 'TypeScript, JavaScript & Modern Frameworks',
        description:
            'Building modern and scalable applications with a strong focus on TypeScript and JavaScript, backed by React and Next.js, with C++ for performance-oriented development.',
        icon: <Code2 className="w-5 h-5 md:w-6 md:h-6 text-black" />,
    },

];

export default function TaskAbout() {
    return (
        <div className="flex flex-nowrap gap-0 divide-x divide-gray-300 border-t border-b border-gray-300 bg-[#F3F3EF]">
            {services.map((card) => (
                <div
                    key={card.number}
                    className="relative p-6 md:p-8 flex flex-col justify-between min-h-[300px] md:min-h-[340px] w-[280px] sm:w-[320px] md:w-[400px] flex-shrink-0 group transition-colors duration-300 hover:bg-[#e0e0e0]"
                >
                    {/* Top Section: Icon & Number */}
                    <div className="flex justify-between items-start">
                        <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#ccff00] flex items-center justify-center shadow-sm">
                            {card.icon}
                        </div>
                        <span className="text-gray-400 font-mono text-xs md:text-sm font-medium">
                            {card.number}
                        </span>
                    </div>

                    <div className="mt-8 md:mt-12">
                        <h3 className="text-lg md:text-2xl font-semibold text-gray-900 tracking-tight leading-snug">
                            {card.title}
                        </h3>
                        <div className="w-full h-[1px] bg-gray-300 my-3 md:my-4" />
                        <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                            {card.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}