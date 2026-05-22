import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { GalleryLightbox } from './GalleryLightbox';
import { useLanguage } from './LanguageContext';

const getPhotos = (t: any) => [
  // Commercial photos (11)
  { src: "images/gallery/commercial_photos/IMG_1075.JPG", alt: t('gallery.photos.IMG_1075') },
  { src: "images/gallery/commercial_photos/IMG_1076.JPG", alt: t('gallery.photos.IMG_1076') },
  { src: "images/gallery/commercial_photos/IMG_1077.JPG", alt: t('gallery.photos.IMG_1077') },
  { src: "images/gallery/commercial_photos/IMG_1079.JPG", alt: t('gallery.photos.IMG_1079') },
  { src: "images/gallery/commercial_photos/IMG_1082.JPG", alt: t('gallery.photos.IMG_1082') },
  { src: "images/gallery/commercial_photos/IMG_1083.JPG", alt: t('gallery.photos.IMG_1083') },
  { src: "images/gallery/commercial_photos/IMG_1084.JPG", alt: t('gallery.photos.IMG_1084') },
  { src: "images/gallery/commercial_photos/IMG_1092-редакт..JPG", alt: t('gallery.photos.IMG_1092_edit') },
  { src: "images/gallery/commercial_photos/IMG_1098.JPG", alt: t('gallery.photos.IMG_1098') },
  { src: "images/gallery/commercial_photos/IMG_1099-редакт..JPG", alt: t('gallery.photos.IMG_1099_edit') },
  { src: "images/gallery/commercial_photos/IMG_1128.JPG", alt: t('gallery.photos.IMG_1128') },

  // Event photos (9)
  { src: "images/gallery/event_photos/IMG_0075.JPG", alt: t('gallery.photos.IMG_0075') },
  { src: "images/gallery/event_photos/IMG_0076.JPG", alt: t('gallery.photos.IMG_0076') },
  { src: "images/gallery/event_photos/IMG_0417.JPG", alt: t('gallery.photos.IMG_0417') },
  { src: "images/gallery/event_photos/IMG_7972.JPG", alt: t('gallery.photos.IMG_7972') },
  { src: "images/gallery/event_photos/IMG_8629.JPG", alt: t('gallery.photos.IMG_8629') },
  { src: "images/gallery/event_photos/IMG_9041-редакт..JPG", alt: t('gallery.photos.IMG_9041_edit') },
  { src: "images/gallery/event_photos/IMG_9047.JPG", alt: t('gallery.photos.IMG_9047') },
  { src: "images/gallery/event_photos/IMG_9153.JPG", alt: t('gallery.photos.IMG_9153') },
  { src: "images/gallery/event_photos/IMG_9267.JPG", alt: t('gallery.photos.IMG_9267') }
];

export const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useLanguage();
  const photos = getPhotos(t);

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
          <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest">{t('gallery.title')}</h2>
          <a href="#booking" className="hidden md:inline-block text-sm uppercase tracking-widest border-b border-foreground pb-1 hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 transition-colors duration-200">
            {t('gallery.book')}
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
              aria-label={t('gallery.ariaLabel', { alt: photo.alt })}
            >
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center" aria-hidden="true">
                <span className="text-white text-[10px] md:text-sm uppercase tracking-widest border border-white px-2 md:px-6 py-1 md:py-2 backdrop-blur-sm">{t('gallery.view')}</span>
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
            {t('gallery.book')}
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
