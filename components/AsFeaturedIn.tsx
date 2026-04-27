'use client';

import Image from 'next/image';

export default function AsFeaturedIn() {
  return (
    <section className="py-8 border-y border-white/5 bg-black/50 backdrop-blur-sm overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center">
        <p className="text-sm text-gray-400 font-medium tracking-widest uppercase mb-6 text-center">
          Hanno parlato di noi
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 hover:opacity-100 transition-opacity duration-300">
          
          <a 
            href="https://www.mbnews.it/dal-territorio/wrdigital-il-partner-digitale-per-far-crescere-le-aziende-di-monza-e-brianza/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            {/* MBNews Logo (Text or actual logo if available) */}
            <div className="text-xl md:text-2xl font-black tracking-tighter text-white group-hover:text-yellow-400 transition-colors">
              MBNews<span className="text-yellow-400">.it</span>
            </div>
            <span className="text-xs border border-white/20 px-2 py-1 rounded-full text-gray-300 group-hover:border-yellow-400/50 transition-colors hidden sm:inline-block">
              Quotidiano Online
            </span>
          </a>

          <a 
            href="https://tiktok.com/@monzabrianzanews/video/7512796961825738006" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
          >
            <svg className="w-6 h-6 text-white group-hover:text-[#00f2fe] transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.34 6.32 6.32 6.32 0 0 0 6.2-6.32V8.9a8.1 8.1 0 0 0 4.46 1.34V6.8a4.34 4.34 0 0 1-2.41-.11z"/>
            </svg>
            <div className="font-bold text-white group-hover:text-[#00f2fe] transition-colors">
              MonzaBrianzaNews
            </div>
          </a>

        </div>
      </div>
    </section>
  );
}
