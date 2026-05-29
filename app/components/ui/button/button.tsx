"use client";

import { FiArrowUpRight } from 'react-icons/fi';

import Link from "next/link";

export default function button() {
    return (
        <div className="flex items-center gap-1 cursor-pointer">
            <Link href="/contact" className="bg-[#1a1a1a] text-white  text-[15px] px-7 py-3 rounded-full flex items-center justify-center">
                
            </Link>
            <div className="bg-[#1a1a1a] text-white p-3.5 rounded-full aspect-square flex items-center justify-center">
                <FiArrowUpRight size={18} />
            </div>
        </div>
    )
}