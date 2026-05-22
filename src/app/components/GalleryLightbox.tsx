import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface Photo {
  src: string;
  alt: string;
}

interface GalleryLightboxProps {
  isOpen: boolean;
  photos: Photo[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  isOpen,
  photos,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || activeIndex < 0 || activeIndex >= photos.length) return null;

  const currentPhoto = photos[activeIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={t('gallery.lightbox.dialogAria')}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={t('gallery.lightbox.closeAria')}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Backgound Overlay for closing on click */}
        <div className="absolute inset-0 z-0" onClick={onClose} aria-hidden="true" />

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 md:left-8 z-10 p-4 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={t('gallery.lightbox.prevAria')}
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Photo Container */}
        <div className="relative z-10 max-w-[85vw] max-h-[80vh] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="relative flex flex-col items-center"
            >
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className="max-w-[85vw] max-h-[75vh] object-contain select-none shadow-[0_0_50px_rgba(255,255,255,0.15)] border border-white/10"
              />
              {currentPhoto.alt && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mt-4 text-white/75 text-sm md:text-base font-light tracking-wider text-center max-w-xl px-4"
                >
                  {currentPhoto.alt}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 md:right-8 z-10 p-4 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={t('gallery.lightbox.nextAria')}
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Counter indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 backdrop-blur-md px-6 py-2 text-xs md:text-sm font-light tracking-widest text-white/70">
          {activeIndex + 1} / {photos.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
