import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GalleryLightbox } from './GalleryLightbox';

const photos = [
  // Commercial photos (11)
  { src: "images/gallery/commercial_photos/IMG_1075.JPG", alt: "Стильная студийная фотосессия дуэта A² - вокал и саксофон" },
  { src: "images/gallery/commercial_photos/IMG_1076.JPG", alt: "Полина Винчи и Михаил Акимов: профессиональный музыкальный дуэт" },
  { src: "images/gallery/commercial_photos/IMG_1077.JPG", alt: "Камерный музыкальный проект A²: вокал и саксофон" },
  { src: "images/gallery/commercial_photos/IMG_1079.JPG", alt: "Полина Винчи (вокал) и Михаил Акимов (саксофон)" },
  { src: "images/gallery/commercial_photos/IMG_1082.JPG", alt: "Профессиональные музыканты на частное мероприятие в Москве" },
  { src: "images/gallery/commercial_photos/IMG_1083.JPG", alt: "Дуэт Ardor Squared: вокал и саксофон для welcome-зоны" },
  { src: "images/gallery/commercial_photos/IMG_1084.JPG", alt: "Студийное портфолио дуэта A² в Москве" },
  { src: "images/gallery/commercial_photos/IMG_1092-редакт..JPG", alt: "Атмосферное фото Полины Винчи и Михаила Акимова" },
  { src: "images/gallery/commercial_photos/IMG_1098.JPG", alt: "Элегантный музыкальный дуэт A²" },
  { src: "images/gallery/commercial_photos/IMG_1099-редакт..JPG", alt: "Музыкальный проект для частных событий Ardor Squared" },
  { src: "images/gallery/commercial_photos/IMG_1128.JPG", alt: "Полина Винчи и Михаил Акимов - вокально-инструментальный дуэт" },

  // Event photos (9)
  { src: "images/gallery/event_photos/IMG_0075.JPG", alt: "Выступление A² Duo на welcome-зоне мероприятия" },
  { src: "images/gallery/event_photos/IMG_0076.JPG", alt: "Музыкальное оформление праздника: дуэт вокала и саксофона" },
  { src: "images/gallery/event_photos/IMG_0417.JPG", alt: "Живое выступление дуэта A² на сцене" },
  { src: "images/gallery/event_photos/IMG_7972.JPG", alt: "Атмосфера праздничного вечера с живой музыкой дуэта A²" },
  { src: "images/gallery/event_photos/IMG_8629.JPG", alt: "Михаил Акимов: импровизация на саксофоне во время выступления" },
  { src: "images/gallery/event_photos/IMG_9041-редакт..JPG", alt: "Полина Винчи на сцене: живой вокал для вашего события" },
  { src: "images/gallery/event_photos/IMG_9047.JPG", alt: "Живой концерт дуэта A² вокал и саксофон" },
  { src: "images/gallery/event_photos/IMG_9153.JPG", alt: "Выступление дуэта Ardor Squared на мероприятии" },
  { src: "images/gallery/event_photos/IMG_9267.JPG", alt: "Саксофонист Михаил Акимов и вокалистка Полина Винчи" }
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
    <section id="gallery" className="py-24 bg-background text-foreground transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest">Галерея</h2>
          <a href="#booking" className="hidden md:inline-block text-sm uppercase tracking-widest border-b border-foreground pb-1 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 transition-colors duration-200">
            Забронировать выступление
          </a>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 md:gap-6">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              onClick={() => openLightbox(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="aspect-square overflow-hidden group cursor-pointer relative w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground border-none bg-transparent p-0 block"
              aria-label={`Открыть просмотр изображения: ${photo.alt}`}
            >
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center" aria-hidden="true">
                <span className="text-white text-[10px] md:text-sm uppercase tracking-widest border border-white px-2 md:px-6 py-1 md:py-2 backdrop-blur-sm">Смотреть</span>
              </div>
              <ImageWithFallback
                src={photo.src}
                alt={photo.alt}
                loading={i < 3 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 motion-reduce:transition-none transition-[filter,transform] duration-500"
              />
            </motion.button>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a href="#booking" className="inline-block text-sm uppercase tracking-widest border-b border-foreground pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4">
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
