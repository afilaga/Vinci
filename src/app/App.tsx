import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import { motion, useScroll } from 'motion/react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Repertoire } from './components/Repertoire';
import { DemoPlayer } from './components/DemoPlayer';
import { Playlist } from './components/Playlist';
import { Gallery } from './components/Gallery';
import { Video } from './components/Video';
import { Riders } from './components/Riders';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

// Main Application Component
export default function App() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-foreground font-sans selection:bg-foreground selection:text-background transition-colors duration-500 relative">
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
        <DemoPlayer />
        <Playlist />
        <Gallery />
        <Video />
        <Riders />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
