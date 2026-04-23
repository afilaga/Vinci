import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const Video = () => {
  return (
    <section id="video" className="py-24 md:py-32 bg-black text-white relative">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest mb-4">Живые выступления</h2>
          <p className="text-gray-400 font-light tracking-widest uppercase text-sm">Почувствуйте магию</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto aspect-video group cursor-pointer overflow-hidden border border-gray-800"
        >
          <ImageWithFallback
            src="/images/polina_performance.jpg"
            alt="Video Thumbnail"
            className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-40 transition-opacity duration-500"
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
              <Play className="w-8 h-8 md:w-10 md:h-10 ml-2" fill="currentColor" />
            </div>
          </div>
        </motion.div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <a href="#" className="text-gray-400 hover:text-white uppercase tracking-widest text-sm transition-colors">
            YouTube канал
          </a>
          <span className="text-gray-800">|</span>
          <a href="#" className="text-gray-400 hover:text-white uppercase tracking-widest text-sm transition-colors">
            Профиль Vimeo
          </a>
        </div>
      </div>
    </section>
  );
};
