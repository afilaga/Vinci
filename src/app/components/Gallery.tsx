import React from 'react';
import { motion } from 'motion/react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageWithFallback } from './figma/ImageWithFallback';

const photos = [
  "/images/polina_performance.jpg",
  "/images/mikhail_2.jpg",
  "/images/duo.jpg",
  "/images/background_performance.jpg",
  "/images/polina.jpg",
  "/images/mikhail.jpg",
  "/images/logo_pattern.jpg",
];

export const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-white text-black">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest">Галерея</h2>
          <a href="#" className="hidden md:inline-block text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 transition-colors">
            Смотреть всю галерею
          </a>
        </motion.div>

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 2 }}>
          <Masonry gutter="1.5rem">
            {photos.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="overflow-hidden group cursor-pointer relative"
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                  <span className="text-white text-sm uppercase tracking-widest border border-white px-6 py-2">Смотреть</span>
                </div>
                <ImageWithFallback
                  src={src}
                  alt={`A2 Gallery ${i}`}
                  className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>

        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-block text-sm uppercase tracking-widest border-b border-black pb-1">
            Смотреть всю галерею
          </a>
        </div>
      </div>
    </section>
  );
};
