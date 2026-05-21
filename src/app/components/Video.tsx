import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const Video = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Video playback failed:", err);
          setIsPlaying(false);
        });
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section id="video" className="py-24 md:py-32 bg-background text-foreground relative overflow-hidden transition-colors duration-500">
      {/* Background ambient glow behind the video */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-foreground/[0.015] rounded-full blur-[140px] pointer-events-none transition-colors duration-500" />
      
      <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 space-y-4"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-foreground/40 font-semibold transition-colors duration-500">Live промо</span>
          <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest text-foreground transition-colors duration-500">Живое выступление</h2>
          <p className="text-foreground/60 font-light text-base md:text-lg max-w-xl mx-auto leading-relaxed transition-colors duration-500">
            Почувствуйте невероятную атмосферу и энергетику нашего живого выступления. Видео-презентация дуэта A²: вокал и саксофон.
          </p>
        </motion.div>

        {/* Premium Cinematic Inline Player */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden border border-foreground/10 bg-background/40 shadow-[0_0_50px_rgba(0,0,0,0.02)] dark:shadow-[0_0_50px_rgba(255,255,255,0.02)] backdrop-blur-sm group transition-all duration-500">
            
            {/* Native HTML5 Video Element */}
            <video
              ref={videoRef}
              src="video/a2_live_video.mp4"
              poster="images/polina_performance.jpg"
              playsInline
              controls={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover relative z-0"
            />

            {/* Custom Glassmorphic Play Overlay (Fades out when playing) */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={handlePlayPause}
                  className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center cursor-pointer z-10 p-6 select-none"
                >
                  {/* Big Play button */}
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/10 transition-all duration-300 shadow-2xl"
                  >
                    <Play className="w-8 h-8 md:w-10 md:h-10 ml-1.5 text-white fill-white" />
                  </motion.div>

                  <span className="mt-6 text-xs md:text-sm uppercase tracking-[0.25em] text-white/80 font-medium group-hover:text-white transition-colors duration-300">
                    Смотреть промо-видео
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
