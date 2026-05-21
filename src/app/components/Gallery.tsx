import React, { useState } from 'react';
import { motion } from 'motion/react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GalleryLightbox } from './GalleryLightbox';

const photos = [
  { src: "/images/polina_performance.jpg", alt: "Полина Винчи на выступлении" },
  { src: "/images/mikhail_2.jpg", alt: "Михаил Акимов с саксофоном" },
  { src: "/images/duo.jpg", alt: "Дуэт A²: вокал и саксофон" },
  { src: "/images/background_performance.jpg", alt: "Атмосфера живого выступления A²" },
  { src: "/images/polina.jpg", alt: "Портрет Полины Винчи" },
  { src: "/images/mikhail.jpg", alt: "Портрет Михаила Акимова" },
  { src: "/images/logo_pattern.jpg", alt: "Визуальный паттерн A²" },
];

export const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

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
          <a href="#booking" className="hidden md:inline-block text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 transition-colors duration-200">
            Забронировать выступление
          </a>
        </motion.div>

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3 }}>
          <Masonry gutter="1.5rem">
            {photos.map((photo, i) => (
              <motion.button
                key={photo.src}
                onClick={() => openLightbox(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="overflow-hidden group cursor-pointer relative w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black border-none bg-transparent p-0 block"
                aria-label={`Открыть просмотр изображения: ${photo.alt}`}
              >
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center" aria-hidden="true">
                  <span className="text-white text-sm uppercase tracking-widest border border-white px-6 py-2 backdrop-blur-sm">Смотреть</span>
                </div>
                <ImageWithFallback
                  src={photo.src}
                  alt={photo.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-105 motion-reduce:transition-none transition-[filter,transform] duration-500"
                />
              </motion.button>
            ))}
          </Masonry>
        </ResponsiveMasonry>

        <div className="mt-12 text-center md:hidden">
          <a href="#booking" className="inline-block text-sm uppercase tracking-widest border-b border-black pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4">
            Забронировать выступление
          </a>
        </div>
      </div>

      <GalleryLightbox
        isOpen={lightboxOpen}
        photos={photos}
        activeIndex={activeIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  );
};
