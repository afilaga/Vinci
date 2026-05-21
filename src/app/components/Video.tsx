import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VideoModal } from './VideoModal';

const concertVideos = [
  {
    title: 'Концертный сет A²',
    meta: 'Live performance',
    thumbnail: 'images/polina_performance.jpg',
    youtubeId: 'L_XJ_s5IsQc', // Premium Sax/Vocal style performance cover
  },
  {
    title: 'Саксофон и вокал',
    meta: 'Video excerpt',
    thumbnail: 'images/background_performance.jpg',
    youtubeId: '3v0a_h8S1kM',
  },
];

export const Video = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeYoutubeId, setActiveYoutubeId] = useState('');

  const openVideo = (youtubeId: string) => {
    setActiveYoutubeId(youtubeId);
    setModalOpen(true);
  };

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
          className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 gap-6 text-left"
        >
          {concertVideos.map((video, index) => (
            <button
              key={video.title}
              onClick={() => openVideo(video.youtubeId)}
              className="group relative aspect-video overflow-hidden border border-gray-800 bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black text-left block w-full cursor-pointer"
              aria-label={`Открыть видео: ${video.title}`}
            >
              <ImageWithFallback
                src={video.thumbnail}
                alt={`Обложка видео: ${video.title}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover grayscale opacity-65 group-hover:opacity-45 transition-opacity duration-300"
              />

              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-200">
                  <Play className="w-7 h-7 md:w-9 md:h-9 ml-1" fill="currentColor" aria-hidden="true" />
                </div>
              </div>

              <div className="absolute left-0 right-0 bottom-0 p-5 bg-gradient-to-t from-black via-black/70 to-transparent">
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-2">{video.meta}</p>
                <h3 className="text-lg md:text-xl font-light uppercase tracking-widest text-white">{video.title}</h3>
              </div>
            </button>
          ))}
        </motion.div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white uppercase tracking-widest text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black">
            YouTube канал
          </a>
          <span className="text-gray-800">|</span>
          <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white uppercase tracking-widest text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black">
            Профиль Vimeo
          </a>
        </div>
      </div>

      <VideoModal
        isOpen={modalOpen}
        youtubeId={activeYoutubeId}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
};
