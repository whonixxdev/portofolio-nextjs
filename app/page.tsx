"use client";

import Link from 'next/link';
import { FaLinkedin, FaWhatsapp, FaGithub } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <div className="relative min-h-screen bg-white">

        <div className="fixed left-10 top-[59%] -translate-y-1/2 flex flex-col items-center">

          <div className="flex flex-col items-center">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="w-[1px] h-58 bg-neutral-800"></div>
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
          </div>

          <div className="flex flex-col items-center gap-7.5 mt-15">
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="text-neutral-700 hover:text-black transition-colors duration-200"
            >
              <FaLinkedin size={29} />
            </Link>

            <Link
              href="https://wa.me/message/KLLVHZ5DVJANF1"
              target="_blank"
              className="text-neutral-700 hover:text-black transition-colors duration-200"
            >
              <FaWhatsapp size={29} />
            </Link>

            <Link
              href="https://github.com/whonixxdev"
              target="_blank"
              className="text-neutral-700 hover:text-black transition-colors duration-200"
            >
              <FaGithub size={29} />
            </Link>
          </div>

        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex justify-center items-center">
        <span className="font-cabinet text-[24px] leading-[32px] text-black/80 hover:text-black cursor-pointer lowercase select-none transition-colors duration-200">
          scroll down
        </span>
      </div>
    </main>
  );
}