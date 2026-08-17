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
        icon: <ShieldCheck className="w-6 h-6 text-black" />,
    },
    {
        number: '02',
        title: 'UI/UX Design & Figma',
        description:
            'Designing elegant, clean, and lightweight interfaces with a strong sense of visual balance, usability, and modern user experience using Figma.',
        icon: <PenTool className="w-6 h-6 text-black" />,
    },
    {
        number: '03',
        title: 'TypeScript, JavaScript & Modern Frameworks',
        description:
            'Building modern and scalable applications with a strong focus on TypeScript and JavaScript, backed by React and Next.js, with C++ for performance-oriented development.',
        icon: <Code2 className="w-6 h-6 text-black" />,
    },

];

export default function TaskAbout() {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-300 border-t border-b border-gray-300 bg-[#F3F3EF]">
            {services.map((card) => (
                <div
                    key={card.number}
                    className="relative p-8 flex flex-col justify-between min-h-[320px] group transition-colors duration-300 hover:bg-[#e0e0e0]"
                >
                    {/* Top Section: Icon & Number */}
                    <div className="flex justify-between items-start">
                        <div className="w-14 h-14 rounded-full bg-[#ccff00] flex items-center justify-center shadow-sm">
                            {card.icon}
                        </div>
                        <span className="text-gray-400 font-mono text-sm font-medium">
                            {card.number}
                        </span>
                    </div>

                    <div className="mt-12">
                        <h3 className="text-2xl font-semibold text-gray-900 tracking-tight leading-snug">
                            {card.title}
                        </h3>
                        <div className="w-full h-[1px] bg-gray-300 my-4" />
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {card.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}