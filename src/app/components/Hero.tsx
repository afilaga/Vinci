import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import MagicRings from '../../components/MagicRings';

export const Hero = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Initial check
    setIsDark(document.documentElement.classList.contains('dark'));

    // Observe class changes on <html>
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="relative min-h-dvh w-full flex items-center justify-center overflow-hidden bg-background py-28 md:py-32 transition-colors duration-500">
      {/* Dynamic Interactive Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <MagicRings 
          color={isDark ? "#ffffff" : "#030213"} 
          colorTwo={isDark ? "#105a64" : "#0ea5e9"} 
          speed={0.8}
          ringCount={5}
          baseRadius={0.25}
          radiusStep={0.12}
          scaleRate={0.12}
          opacity={isDark ? 0.35 : 0.6}
          followMouse={true}
          mouseInfluence={0.06}
          hoverScale={1.1}
          parallax={0.03}
          clickBurst={true}
        />
        {/* Soft overlay gradient to ensure high readability of text and blend borders */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background pointer-events-none transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-3 border border-foreground/15 bg-foreground/5 px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.35em] text-foreground/75 backdrop-blur-xl transition-colors duration-500"
        >
          <span>Live vocals</span>
          <span className="h-1 w-1 rounded-full bg-foreground/40 transition-colors duration-500" aria-hidden="true" />
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
            className="h-36 md:h-52 w-auto object-contain brightness-0 dark:invert transition-all duration-500 dark:drop-shadow-[0_0_32px_rgba(255,255,255,0.2)] drop-shadow-[0_0_32px_rgba(0,0,0,0.12)]"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="text-foreground/80 text-xl md:text-3xl font-light tracking-[0.35em] uppercase mt-8 text-balance transition-colors duration-500"
          >
            Ardor Squared
          </motion.h1>
        </div>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="text-foreground text-sm md:text-lg font-light tracking-[0.25em] uppercase max-w-2xl mx-auto leading-relaxed transition-colors duration-500"
        >
          Дуэт вокала и саксофона
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-6 max-w-3xl mx-auto text-sm md:text-base text-foreground/65 leading-7 font-light transition-colors duration-500"
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
            className="relative inline-flex overflow-hidden px-12 py-5 bg-foreground text-background group uppercase tracking-[0.3em] text-xs font-semibold transition-colors duration-500 hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background shadow-[0_0_40px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(255,255,255,0.16)]"
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
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-foreground/65 transition-colors duration-500 animate-bounce motion-reduce:animate-none"
      >
        <ChevronDown size={32} strokeWidth={1} aria-hidden="true" />
      </motion.div>
    </section>
  );
};
