import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, Loader2 } from 'lucide-react';

interface DemoTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  durationLabel: string; // fallback label until metadata loads
}

const DEMO_TRACKS: DemoTrack[] = [
  {
    id: 'demo-1',
    title: 'Teddy Swims - Lose Control + Call Out My Name + Dangerous Woman',
    artist: 'A² Mash-Up',
    src: 'demo-tracks/Mix number 21 (lose control) mastering wt.wav',
    durationLabel: '2:14'
  },
  {
    id: 'demo-2',
    title: 'Tropical House Mix (Every Breath You Take + Titanium + Wicked Game)',
    artist: 'A² Mash-Up',
    src: 'demo-tracks/Tropical Mix Demo (louder).wav',
    durationLabel: '8:36'
  },
  {
    id: 'demo-3',
    title: 'Je Veux',
    artist: 'ZAZ (A² Cover)',
    src: 'demo-tracks/je veux demo.wav',
    durationLabel: '1:10'
  },
  {
    id: 'demo-4',
    title: 'Le temps est bon',
    artist: 'Bon Entendeur (A² Cover)',
    src: 'demo-tracks/le temps est bon demo.wav',
    durationLabel: '1:13'
  }
];

export const DemoPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const currentTrack = DEMO_TRACKS[currentTrackIndex];

  // Initialize and manage audio node
  useEffect(() => {
    audioRef.current = new Audio(currentTrack.src);
    audioRef.current.volume = isMuted ? 0 : volume;

    const audio = audioRef.current;

    // Audio Event Listeners
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);
    const onPlaying = () => setIsLoading(false);
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    const onEnded = () => {
      handleNext();
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    // If it was already playing, start playing new track immediately
    if (isPlaying) {
      setIsLoading(true);
      audio.play().catch((err) => {
        console.log('Playback blocked by browser policy:', err);
        setIsPlaying(false);
        setIsLoading(false);
      });
    }

    // Cleanup
    return () => {
      audio.pause();
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentTrackIndex]);

  // Adjust volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      setIsLoading(true);
      audioRef.current.play()
        .then(() => setIsLoading(false))
        .catch((err) => {
          console.log('Playback blocked:', err);
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  };

  const handleNext = () => {
    setIsLoading(true);
    setCurrentTrackIndex((prev) => (prev + 1) % DEMO_TRACKS.length);
  };

  const handlePrev = () => {
    setIsLoading(true);
    setCurrentTrackIndex((prev) => (prev - 1 + DEMO_TRACKS.length) % DEMO_TRACKS.length);
  };

  const handleProgressMove = (clientX: number) => {
    if (!audioRef.current || !progressBarRef.current || duration === 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const width = rect.width;
    const nextPercent = Math.max(0, Math.min(100, clickX / width));
    const nextTime = nextPercent * duration;

    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleProgressMove(e.clientX);
  };

  const handleProgressBarTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches && e.touches.length > 0) {
      handleProgressMove(e.touches[0].clientX);
    }
  };

  const selectTrack = (index: number) => {
    if (index === currentTrackIndex) {
      handlePlayPause();
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="demo" className="py-24 md:py-32 bg-background text-foreground relative overflow-hidden transition-colors duration-500">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-foreground/[0.03] rounded-full blur-[120px] pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-foreground/[0.02] rounded-full blur-[90px] pointer-events-none transition-colors duration-500" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest mb-6">
              Демо-записи
            </h2>
            <p className="text-foreground/60 font-light text-lg leading-relaxed max-w-2xl transition-colors duration-500">
              Послушайте наше живое звучание. В плеере собраны реальные записи миксов, вокальных партий и саксофонных импровизаций дуэта A².
            </p>
          </motion.div>
        </div>

        {/* Dashboard Player Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: Vinyl Spinner & Controls (lg: 7 cols) */}
          <div className="lg:col-span-7 bg-foreground/5 backdrop-blur-md border border-foreground/10 rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl transition-all duration-500">
            
            {/* Spinning Disk visualizer wrapper */}
            <div className="flex flex-col items-center justify-center flex-1 my-6 md:my-10 relative">
              
              {/* Spinning vinyl visual */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-neutral-900 dark:bg-neutral-950 flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.08)] dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-foreground/10 transition-all duration-500">
                
                {/* Vinyl Grooves concentric rings */}
                <div className="absolute inset-2 border border-dashed border-foreground/5 rounded-full" />
                <div className="absolute inset-6 border border-foreground/5 rounded-full" />
                <div className="absolute inset-12 border border-foreground/5 rounded-full" />
                <div className="absolute inset-20 border border-foreground/5 rounded-full" />
                
                {/* Rotating animation container */}
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                  className="w-full h-full flex items-center justify-center relative rounded-full"
                >
                  {/* Vinyl label center */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-foreground/10 border border-foreground/20 flex items-center justify-center relative shadow-inner">
                    <Music className="w-6 h-6 md:w-8 md:h-8 text-foreground/80 transition-colors" />
                  </div>
                </motion.div>

                {/* Loader Spinner Overlay */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center z-10 transition-colors duration-500"
                    >
                      <Loader2 className="w-10 h-10 text-foreground animate-spin" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Glowing title under disk */}
              <div className="text-center mt-8 max-w-md px-4">
                <h4 className="text-sm md:text-base font-semibold tracking-wide text-foreground truncate transition-colors duration-500">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-foreground/50 font-light tracking-widest uppercase mt-1 transition-colors duration-500">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Audio Controls and Timeline */}
            <div className="space-y-6">
              
              {/* Timeline Progress Slider */}
              <div className="space-y-2">
                <div 
                  ref={progressBarRef}
                  onClick={handleProgressBarClick}
                  onTouchStart={handleProgressBarTouch}
                  onTouchMove={handleProgressBarTouch}
                  className="h-4 w-full flex items-center cursor-pointer group select-none"
                >
                  <div className="h-1.5 w-full bg-foreground/10 group-hover:bg-foreground/25 rounded-full overflow-hidden relative transition-all">
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-foreground group-hover:bg-foreground transition-all rounded-full" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-foreground/40 select-none transition-colors duration-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{duration > 0 ? formatTime(duration) : currentTrack.durationLabel}</span>
                </div>
              </div>

              {/* Navigation Panel and volume controls */}
              <div className="flex flex-row items-center justify-between gap-6">
                
                {/* Equalizer Visualizer */}
                <div className="flex items-end gap-[3px] h-6 w-12 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-foreground transition-colors duration-500"
                      animate={{
                        height: isPlaying && !isLoading
                          ? [4, 18, 8, 22, 10, 4][i % 6]
                          : 4
                      }}
                      transition={{
                        duration: isPlaying ? [0.6, 0.8, 0.5, 0.7, 0.9, 0.6][i % 6] : 0.2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                        delay: isPlaying ? i * 0.05 : 0
                      }}
                    />
                  ))}
                </div>

                {/* Primary Player buttons */}
                <div className="flex items-center gap-6">
                  <button
                    onClick={handlePrev}
                    className="p-2 text-foreground/60 hover:text-foreground hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    aria-label="Предыдущий трек"
                  >
                    <SkipBack className="w-5 h-5 fill-foreground/10" />
                  </button>

                  <button
                    onClick={handlePlayPause}
                    disabled={isLoading}
                    className="p-4 bg-foreground hover:bg-foreground/90 text-background rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-foreground/5 focus:outline-none"
                    aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
                  >
                    {isPlaying ? <Pause className="w-6 h-6 fill-background text-background" /> : <Play className="w-6 h-6 fill-background text-background ml-0.5" />}
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-2 text-foreground/60 hover:text-foreground hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    aria-label="Следующий трек"
                  >
                    <SkipForward className="w-5 h-5 fill-foreground/10" />
                  </button>
                </div>

                {/* Volume Slider Panel */}
                <div className="hidden md:flex items-center gap-2.5">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
                    aria-label={isMuted ? "Включить звук" : "Выключить звук"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-16 md:w-20 accent-foreground h-1 bg-foreground/10 rounded-lg cursor-pointer"
                    aria-label="Громкость"
                  />
                </div>

              </div>

            </div>

          </div>

          {/* Right Side: Repertoire Playlist Selection (lg: 5 cols) */}
          <div className="lg:col-span-5 bg-foreground/[0.01] border border-foreground/10 rounded-3xl p-6 md:p-8 flex flex-col gap-4 shadow-xl transition-all duration-500">
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/40 font-semibold mb-2 transition-colors duration-500">
              Список демо-записей
            </span>
            
            <div className="space-y-3 flex-1 overflow-y-auto pr-1">
              {DEMO_TRACKS.map((track, index) => {
                const isActive = index === currentTrackIndex;
                const isThisPlaying = isActive && isPlaying;
                
                return (
                  <button
                    key={track.id}
                    onClick={() => selectTrack(index)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 group cursor-pointer ${
                      isActive 
                        ? 'bg-foreground/10 border-foreground/20 shadow-md shadow-foreground/5' 
                        : 'bg-foreground/[0.01] border-foreground/5 hover:bg-foreground/[0.04] hover:border-foreground/10'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Circle visual */}
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all ${
                        isActive 
                          ? 'bg-foreground text-background border-foreground' 
                          : 'bg-foreground/5 border-foreground/5 group-hover:bg-foreground/10 group-hover:border-foreground/10'
                      }`}>
                        {isThisPlaying ? (
                          <Pause className="w-3.5 h-3.5 fill-background text-background animate-pulse" />
                        ) : (
                          <Play className={`w-3.5 h-3.5 ${isActive ? 'fill-background text-background' : 'fill-foreground/10 text-foreground group-hover:fill-foreground/80'} transition-all`} />
                        )}
                      </div>
                      
                      {/* Meta */}
                      <div className="min-w-0">
                        <h4 className={`text-xs md:text-sm font-semibold truncate transition-colors ${
                          isActive ? 'text-foreground' : 'text-foreground/80 group-hover:text-foreground'
                        }`}>
                          {track.title}
                        </h4>
                        <p className="text-[10px] md:text-xs text-foreground/40 group-hover:text-foreground/60 font-light truncate mt-0.5">
                          {track.artist}
                        </p>
                      </div>
                    </div>

                    {/* Duration Label */}
                    <span className="text-[10px] font-mono text-foreground/30 group-hover:text-foreground/60 flex-shrink-0">
                      {track.durationLabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Ambient note footer decoration */}
            <div className="pt-4 border-t border-foreground/5 flex items-center gap-2 text-foreground/30 mt-auto transition-colors duration-500">
              <Volume2 className="w-3.5 h-3.5" />
              <span className="text-[9px] uppercase tracking-widest">
                Студийное качество • 44.1 kHz WAV
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
