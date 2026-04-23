import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Prism from './Prism';

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 0]);

  const titleText = "A²";

  return (
    <section id="home" ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Prism Background Component */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Prism
            animationType="rotate"
            timeScale={0.5}
            height={3.5}
            baseWidth={3.6}
            scale={3.6}
            hueShift={0}
            colorFrequency={1}
            noise={0}
            glow={1}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex overflow-hidden">
            {titleText.split("").map((char, index) => (
              <motion.h1
                key={index}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
                className="text-white text-8xl md:text-[10rem] font-bold tracking-tighter leading-none"
              >
                {char}
              </motion.h1>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-gray-400 text-xl md:text-3xl font-light tracking-[0.3em] uppercase mt-4"
          >
            Ardor Squared
          </motion.div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-gray-300 text-sm md:text-lg font-light tracking-widest uppercase max-w-2xl mx-auto"
        >
          Дуэт вокала и саксофона <br className="md:hidden" />
          <span className="hidden md:inline"> • </span>
          Минимум средств, максимум выразительности
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12"
        >
          <a 
            href="#booking"
            className="relative inline-flex overflow-hidden px-12 py-5 bg-white/5 backdrop-blur-md border border-white/20 text-white group uppercase tracking-[0.3em] text-xs font-medium transition-all hover:border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-500 delay-75">Забронировать</span>
            <div className="absolute inset-0 bg-white transform scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white animate-bounce"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
};
