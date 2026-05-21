import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import MagicRings from '../../components/MagicRings';

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden bg-black py-28 md:py-32">
      {/* Dynamic Interactive Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <MagicRings 
          color="#ffffff" 
          colorTwo="#105a64" 
          speed={0.8}
          ringCount={5}
          baseRadius={0.25}
          radiusStep={0.12}
          scaleRate={0.12}
          opacity={0.35}
          followMouse={true}
          mouseInfluence={0.06}
          hoverScale={1.1}
          parallax={0.03}
          clickBurst={true}
        />
        {/* Soft overlay gradient to ensure high readability of text and blend borders */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/6 px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.35em] text-white/75 backdrop-blur-xl"
        >
          <span>Live vocals</span>
          <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden="true" />
          <span>Saxophone duo</span>
        </motion.div>

        <div className="flex flex-col items-center justify-center mb-8">
          <motion.img
            src="images/logo_new.png"
            alt="A² Logo"
            width={320}
            height={260}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="h-36 md:h-52 w-auto object-contain brightness-0 invert drop-shadow-[0_0_32px_rgba(255,255,255,0.2)]"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="text-white/80 text-xl md:text-3xl font-light tracking-[0.35em] uppercase mt-8 text-balance"
          >
            Ardor Squared
          </motion.h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-white text-sm md:text-lg font-light tracking-[0.25em] uppercase max-w-2xl mx-auto leading-relaxed"
        >
          Дуэт вокала и саксофона
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-6 max-w-3xl mx-auto text-sm md:text-base text-white/65 leading-7 font-light"
        >
          Музыкальный проект для частных событий в Москве
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 flex items-center justify-center"
        >
          <a 
            href="#booking"
            className="relative inline-flex overflow-hidden px-12 py-5 bg-white text-black group uppercase tracking-[0.3em] text-xs font-semibold transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black shadow-[0_0_40px_rgba(255,255,255,0.16)]"
          >
            <span className="relative z-10">Забронировать</span>
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(0,0,0,0.08)_45%,rgba(255,255,255,0)_100%)] translate-x-[-120%] group-hover:translate-x-[120%] motion-reduce:transition-none transition-transform duration-700 ease-out" aria-hidden="true" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white animate-bounce motion-reduce:animate-none"
      >
        <ChevronDown size={32} strokeWidth={1} aria-hidden="true" />
      </motion.div>
    </section>
  );
};
