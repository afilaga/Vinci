import React from 'react';
import { Toaster } from 'sonner';
import { motion, useScroll } from 'motion/react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Repertoire } from './components/Repertoire';
import { Gallery } from './components/Gallery';
import { Video } from './components/Video';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Main Application Component
export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="w-full min-h-screen bg-black font-sans selection:bg-white selection:text-black">
      <CustomCursor />
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      <Toaster position="bottom-right" toastOptions={{ style: { background: 'white', color: 'black', borderRadius: '0px', border: '1px solid black' } }} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Repertoire />
        <Gallery />
        <Video />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
