import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Search, X, Music, Volume2, Calendar } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  category: 'mashup' | 'jazz' | 'other' | 'soviet' | 'christmas';
}

const CATEGORIES = [
  { id: 'all', name: 'Все треки' },
  { id: 'mashup', name: 'Mash Ups' },
  { id: 'jazz', name: 'Jazz / Welcome' },
  { id: 'soviet', name: 'Советское' },
  { id: 'christmas', name: 'Christmas' },
  { id: 'other', name: 'Other' },
] as const;

const TRACKS_DATABASE: Track[] = [
  // MASH UPS
  {
    id: 'mash-1',
    title: 'Tropical House Mix (Every Breath You Take + Titanium + Wicked Game)',
    artist: 'A² Mash-Up',
    category: 'mashup'
  },
  {
    id: 'mash-2',
    title: 'Perfect + Hallelujah + We Are The Champions',
    artist: 'Ed Sheeran / Leonard Cohen / Queen',
    category: 'mashup'
  },
  {
    id: 'mash-3',
    title: 'Never Gonna Give You Up + Cupid + That’s The Way I Like It + Adventure of A Lifetime',
    artist: 'Rick Astley / Fifty Fifty / KC & The Sunshine Band / Coldplay',
    category: 'mashup'
  },
  {
    id: 'mash-4',
    title: 'No Woman No Cry + I’m Not The Only One',
    artist: 'Bob Marley / Sam Smith',
    category: 'mashup'
  },
  {
    id: 'mash-5',
    title: 'Lose Control + Call Out My Name + Dangerous Woman',
    artist: 'Teddy Swims / The Weeknd / Ariana Grande',
    category: 'mashup'
  },
  {
    id: 'mash-6',
    title: 'Adore You + Bad Habits + Dancin’',
    artist: 'Harry Styles / Ed Sheeran / Aaron Smith',
    category: 'mashup'
  },
  {
    id: 'mash-7',
    title: 'Life + Cold Heart + Señorita + Ты не верь слезам',
    artist: 'Zivert / Elton John & Dua Lipa / Camila Cabello / Шура',
    category: 'mashup'
  },
  {
    id: 'mash-8',
    title: 'Sing It Back + Бери и беги + Water + Мой мармеладный',
    artist: 'Moloko / Zivert / Tyla / Катя Лель',
    category: 'mashup'
  },
  {
    id: 'mash-9',
    title: 'Rockabye + Shape Of You + Между нами любовь + Плакал Голливуд',
    artist: 'Clean Bandit / Ed Sheeran / Serebro / Люся Чеботина',
    category: 'mashup'
  },
  {
    id: 'mash-10',
    title: 'Marry You + It’s Time + We Are Young',
    artist: 'Bruno Mars / Imagine Dragons / FUN.',
    category: 'mashup'
  },
  {
    id: 'mash-11',
    title: 'Relax, take it easy + (I Just) Died in your arms tonight + La Grenade',
    artist: 'Mika / Cutting Crew / Clara Luciani',
    category: 'mashup'
  },
  {
    id: 'mash-12',
    title: 'Beautiful Things + Let Her Go',
    artist: 'Benson Boone / Passenger',
    category: 'mashup'
  },
  {
    id: 'mash-13',
    title: 'Radioactive + Counting Stars + Feel It Still + Pumped Up Kicks',
    artist: 'Imagine Dragons / OneRepublic / Portugal. The Man / Foster The People',
    category: 'mashup'
  },
  {
    id: 'mash-14',
    title: 'Lean On + Something Just Like This + We Don’t Talk Anymore + Hymn For The Weekend',
    artist: 'Major Lazer & DJ Snake / The Chainsmokers / Charlie Puth / Coldplay',
    category: 'mashup'
  },

  // JAZZ / WELCOME
  {
    id: 'jazz-1',
    title: 'Don’t Know Why',
    artist: 'Norah Jones',
    category: 'jazz'
  },
  {
    id: 'jazz-2',
    title: 'Can’t Take My Eyes Of You (I Love You Baby) (Soul Version)',
    artist: 'Vigon Bamy Jay',
    category: 'jazz'
  },
  {
    id: 'jazz-3',
    title: 'Je Veux',
    artist: 'ZAZ',
    category: 'jazz'
  },
  {
    id: 'jazz-4',
    title: 'Fly Me To The Moon',
    artist: 'Bobby Womack / Frank Sinatra',
    category: 'jazz'
  },
  {
    id: 'jazz-5',
    title: 'Why Don’t You Do Right',
    artist: 'Peggy Lee',
    category: 'jazz'
  },
  {
    id: 'jazz-6',
    title: 'Umbrella',
    artist: 'The Baseballs (Rihanna Cover)',
    category: 'jazz'
  },
  {
    id: 'jazz-7',
    title: 'Something’s Gotta Hold On Me',
    artist: 'Christina Aguilera / Etta James',
    category: 'jazz'
  },
  {
    id: 'jazz-8',
    title: 'L-O-V-E',
    artist: 'Joss Stone / Nat King Cole',
    category: 'jazz'
  },
  {
    id: 'jazz-9',
    title: 'Englishman In New York (Jazz version)',
    artist: 'Sting',
    category: 'jazz'
  },
  {
    id: 'jazz-10',
    title: 'La Vie En Rose',
    artist: 'ZAZ / Edith Piaf',
    category: 'jazz'
  },
  {
    id: 'jazz-11',
    title: 'Happy Together',
    artist: 'The Turtles',
    category: 'jazz'
  },
  {
    id: 'jazz-12',
    title: 'We Belong Together',
    artist: 'Ritchie Valens',
    category: 'jazz'
  },
  {
    id: 'jazz-13',
    title: 'Я буду всегда с тобой (2017 version)',
    artist: 'Леонид Агутин',
    category: 'jazz'
  },
  {
    id: 'jazz-14',
    title: 'Молитва',
    artist: 'Би-2',
    category: 'jazz'
  },
  {
    id: 'jazz-15',
    title: 'Valerie',
    artist: 'Amy Winehouse',
    category: 'jazz'
  },
  {
    id: 'jazz-16',
    title: 'Blinding Lights (Jazz / Soul Cover)',
    artist: 'Teddy Swims (The Weeknd Cover)',
    category: 'jazz'
  },
  {
    id: 'jazz-17',
    title: 'Je t’aime',
    artist: 'Lara Fabian',
    category: 'jazz'
  },
  {
    id: 'jazz-18',
    title: 'Die With A Smile',
    artist: 'Bruno Mars & Lady Gaga',
    category: 'jazz'
  },
  {
    id: 'jazz-19',
    title: 'Get Lucky (Jazz Cover)',
    artist: 'Karen Souza (Daft Punk Cover)',
    category: 'jazz'
  },
  {
    id: 'jazz-20',
    title: 'Voyage Voyage (Piano Version)',
    artist: 'Desireless',
    category: 'jazz'
  },
  {
    id: 'jazz-21',
    title: 'If I Ain’t Got You',
    artist: 'Alicia Keys',
    category: 'jazz'
  },
  {
    id: 'jazz-22',
    title: 'Не позвонишь',
    artist: 'Patricia Kaas & Уматурман',
    category: 'jazz'
  },

  // OTHER
  {
    id: 'oth-1',
    title: 'I Love You',
    artist: 'Adriano Celentano',
    category: 'other'
  },
  {
    id: 'oth-2',
    title: 'Улетаю',
    artist: 'А-Студио',
    category: 'other'
  },
  {
    id: 'oth-3',
    title: 'Шёлк',
    artist: 'Ваня Дмитриенко',
    category: 'other'
  },
  {
    id: 'oth-4',
    title: 'Le temps est bon',
    artist: 'Bon Entendeur',
    category: 'other'
  },
  {
    id: 'oth-5',
    title: 'La Grenade',
    artist: 'Clara Luciani',
    category: 'other'
  },
  {
    id: 'oth-6',
    title: 'Adagio',
    artist: 'Lara Fabian',
    category: 'other'
  },
  {
    id: 'oth-7',
    title: 'La Noia',
    artist: 'Angelina Mango',
    category: 'other'
  },
  {
    id: 'oth-8',
    title: 'We No Speak Americano',
    artist: 'Yolanda Be Cool',
    category: 'other'
  },
  {
    id: 'oth-9',
    title: 'Hava Nagila',
    artist: 'Traditional / Jewish Folk',
    category: 'other'
  },
  {
    id: 'oth-10',
    title: 'Mazel Tov',
    artist: 'Traditional / Jewish Folk',
    category: 'other'
  },
  {
    id: 'oth-11',
    title: 'Лимончики (Одесская)',
    artist: 'Народная / Одесский фольклор',
    category: 'other'
  },
  {
    id: 'oth-12',
    title: 'Ricchi E Poveri Mash-Up (Mamma Maria + Sara Perché Ti Amo)',
    artist: 'Ricchi e Poveri',
    category: 'other'
  },

  // SOVIET
  {
    id: 'sov-1',
    title: 'Песенка о медведях',
    artist: 'из к/ф "Кавказская пленница"',
    category: 'soviet'
  },
  {
    id: 'sov-2',
    title: 'Мы к вам заехали на час (Rock version)',
    artist: 'Геннадий Гладков / из м/ф "Бременские музыканты"',
    category: 'soviet'
  },
  {
    id: 'sov-3',
    title: 'Проснись и пой',
    artist: 'Геннадий Гладков / из к/ф "Джентльмены удачи"',
    category: 'soviet'
  },
  {
    id: 'sov-4',
    title: 'Черный кот',
    artist: 'Валерий Сюткин / Жан Татлян',
    category: 'soviet'
  },
  {
    id: 'sov-5',
    title: 'Лучший город Земли',
    artist: 'Муслим Магомаев',
    category: 'soviet'
  },
  {
    id: 'sov-6',
    title: 'Остров невезения',
    artist: 'из к/ф "Бриллиантовая рука"',
    category: 'soviet'
  },
  {
    id: 'sov-7',
    title: 'Любовь настала',
    artist: 'Роза Рымбаева',
    category: 'soviet'
  },
  {
    id: 'sov-8',
    title: 'Королева красоты',
    artist: 'Муслим Магомаев',
    category: 'soviet'
  },
  {
    id: 'sov-9',
    title: 'Комарово',
    artist: 'Игорь Скляр',
    category: 'soviet'
  },
  {
    id: 'sov-10',
    title: 'А знаешь, всё ещё будет',
    artist: 'Алла Пугачева',
    category: 'soviet'
  },
  {
    id: 'sov-11',
    title: 'Разговор со счастьем',
    artist: 'из к/ф "Иван Васильевич меняет профессию"',
    category: 'soviet'
  },
  {
    id: 'sov-12',
    title: 'Позвони мне, позвони',
    artist: 'Ирина Муравьева / из к/ф "Карнавал"',
    category: 'soviet'
  },
  {
    id: 'sov-13',
    title: 'Любовь, похожая на сон',
    artist: 'Алла Пугачева',
    category: 'soviet'
  },
  {
    id: 'sov-14',
    title: 'Леди Совершенство',
    artist: 'Максим Дунаевский / из к/ф "Мэри Поппинс, до свидания!"',
    category: 'soviet'
  },
  {
    id: 'sov-15',
    title: 'Ищу тебя',
    artist: 'из к/ф "31 июня"',
    category: 'soviet'
  },
  {
    id: 'sov-16',
    title: 'Если б я был султан',
    artist: 'из к/ф "Кавказская пленница"',
    category: 'soviet'
  },
  {
    id: 'sov-17',
    title: 'Зима (Потолок ледяной)',
    artist: 'Эдуард Хиль',
    category: 'soviet'
  },
  {
    id: 'sov-18',
    title: 'Три белых коня',
    artist: 'из к/ф "Чародеи"',
    category: 'soviet'
  },
  {
    id: 'sov-19',
    title: 'Надо же',
    artist: 'Алла Пугачева',
    category: 'soviet'
  },
  {
    id: 'sov-20',
    title: 'Арлекино',
    artist: 'Алла Пугачева',
    category: 'soviet'
  },
  {
    id: 'sov-21',
    title: 'Последняя поэма',
    artist: 'Валерия / из к/ф "Вам и не снилось"',
    category: 'soviet'
  },
  {
    id: 'sov-22',
    title: 'Миллион алых роз',
    artist: 'Алла Пугачева',
    category: 'soviet'
  },
  {
    id: 'sov-23',
    title: 'Там, где клён шумит',
    artist: 'Владимир Маркин / ВИА "Синяя птица"',
    category: 'soviet'
  },
  {
    id: 'sov-24',
    title: 'Проснись и пой',
    artist: 'Лариса Мондрус / из к/ф "Джентльмены удачи"',
    category: 'soviet'
  },
  {
    id: 'sov-25',
    title: 'Помоги мне',
    artist: 'Аида Ведищева / из к/ф "Бриллиантовая рука"',
    category: 'soviet'
  },
  {
    id: 'sov-26',
    title: 'Прощай',
    artist: 'Лев Лещенко',
    category: 'soviet'
  },

  // CHRISTMAS
  {
    id: 'xmas-1',
    title: 'Happy New Year',
    artist: 'ABBA',
    category: 'christmas'
  },
  {
    id: 'xmas-2',
    title: 'Last Christmas',
    artist: 'Wham!',
    category: 'christmas'
  },
  {
    id: 'xmas-3',
    title: 'Magic Moments',
    artist: 'Perry Como',
    category: 'christmas'
  },
  {
    id: 'xmas-4',
    title: 'Winter Wonderland',
    artist: 'Dean Martin',
    category: 'christmas'
  },
  {
    id: 'xmas-5',
    title: 'Let It Snow',
    artist: 'Frank Sinatra',
    category: 'christmas'
  },
  {
    id: 'xmas-6',
    title: 'It’s the Most Wonderful Time of the Year',
    artist: 'Andy Williams',
    category: 'christmas'
  },
  {
    id: 'xmas-7',
    title: 'It’s Beginning to Look a Lot Like Christmas',
    artist: 'Michael Bublé',
    category: 'christmas'
  },
  {
    id: 'xmas-8',
    title: 'Have Yourself a Merry Little Christmas',
    artist: 'Frank Sinatra / Michael Bublé',
    category: 'christmas'
  },
  {
    id: 'xmas-9',
    title: 'Rockin’ Around The Christmas Tree',
    artist: 'Brenda Lee',
    category: 'christmas'
  },
  {
    id: 'xmas-10',
    title: 'A Holly Jolly Christmas',
    artist: 'Michael Bublé',
    category: 'christmas'
  },
  {
    id: 'xmas-11',
    title: 'Snowman',
    artist: 'Sia',
    category: 'christmas'
  },
  {
    id: 'xmas-12',
    title: 'All I Want for Christmas Is You',
    artist: 'Mariah Carey',
    category: 'christmas'
  },
  {
    id: 'xmas-13',
    title: 'Here Comes Santa Claus',
    artist: 'Elvis Presley',
    category: 'christmas'
  },
  {
    id: 'xmas-14',
    title: 'Santa Claus Is Coming To Town',
    artist: 'Michael Bublé',
    category: 'christmas'
  },
  {
    id: 'xmas-15',
    title: 'Jingle Bell Rock',
    artist: 'Bobby Helms',
    category: 'christmas'
  }
];

export const Playlist = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]['id']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Mini-player progress state (simulated song time)
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 180; // 3 minutes simulated length

  // Reset progress when track changes
  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
  }, [currentTrack]);

  // Audio timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setProgress(0);
            return 0; // Loop or stop
          }
          const nextTime = prev + 1;
          setProgress((nextTime / duration) * 100);
          return nextTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  // Filter logic
  const filteredTracks = useMemo(() => {
    return TRACKS_DATABASE.filter((track) => {
      const matchesCategory = selectedCategory === 'all' || track.category === selectedCategory;
      const matchesSearch = 
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Reset expansion state on category or query changes
  useEffect(() => {
    setExpanded(false);
  }, [selectedCategory, searchQuery]);

  // Show a restricted count initially to prevent extreme page height
  const visibleTracks = useMemo(() => {
    if (expanded || filteredTracks.length <= 16) {
      return filteredTracks;
    }
    return filteredTracks.slice(0, 16);
  }, [filteredTracks, expanded]);

  const handleTrackPlay = (track: Track) => {
    if (currentTrack?.id === track.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const nextPercent = Math.max(0, Math.min(100, (clickX / width) * 100));
    setProgress(nextPercent);
    setCurrentTime(Math.floor((nextPercent / 100) * duration));
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Helper to get visual category name for badges
  const getCategoryName = (cat: Track['category']) => {
    switch (cat) {
      case 'mashup': return 'Mash Up';
      case 'jazz': return 'Jazz';
      case 'soviet': return 'Советское';
      case 'christmas': return 'Christmas';
      case 'other': return 'Other';
      default: return '';
    }
  };

  return (
    <section id="playlist" className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest mb-6">
              Плейлист A²
            </h2>
            <p className="text-white/60 font-light text-lg leading-relaxed max-w-2xl">
              Интерактивная подборка наших любимых композиций. Выберите интересующую категорию или воспользуйтесь мгновенным поиском, чтобы составить идеальный плейлист для Вашего вечера.
            </p>
          </motion.div>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12 border-b border-white/5 pb-8">
          
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start items-center overflow-x-auto no-scrollbar scroll-smooth">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all duration-300 relative focus:outline-none focus:ring-1 focus:ring-white/20`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 bg-white rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`transition-colors duration-300 ${isActive ? 'text-black font-semibold' : 'text-white/60 hover:text-white'}`}>
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Поиск трека..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/30 text-xs tracking-wider uppercase focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-300 [color-scheme:dark]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                aria-label="Очистить поиск"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Track Count Badge */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
            Найдено композиций: {filteredTracks.length}
          </span>
        </div>

        {/* Tracks Layout Grid */}
        {filteredTracks.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {visibleTracks.map((track, index) => {
                const isCurrent = currentTrack?.id === track.id;
                const isThisPlaying = isCurrent && isPlaying;
                
                return (
                  <motion.div
                    key={track.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
                  >
                    <button
                      onClick={() => handleTrackPlay(track)}
                      className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-4 transition-all duration-300 group cursor-pointer ${
                        isCurrent 
                          ? 'bg-white/10 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.06)]' 
                          : 'bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10'
                      }`}
                    >
                      {/* Play Button & Number */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                          {isThisPlaying ? (
                            <Pause className="w-4 h-4 text-white fill-white animate-pulse" />
                          ) : (
                            <Play className="w-4 h-4 text-white fill-white/10 group-hover:fill-white transition-all duration-300" />
                          )}
                        </div>

                        {/* Title & Artist */}
                        <div className="min-w-0">
                          <h3 className={`text-sm md:text-base font-medium truncate tracking-wide transition-colors ${isCurrent ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                            {track.title}
                          </h3>
                          <p className="text-xs text-white/50 group-hover:text-white/70 font-light truncate mt-0.5">
                            {track.artist}
                          </p>
                        </div>
                      </div>

                      {/* Badge / Indicator */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {isThisPlaying ? (
                          <div className="flex items-end gap-0.5 h-4 w-6">
                            {[...Array(4)].map((_, barIdx) => (
                              <motion.div
                                key={barIdx}
                                className="w-[3px] bg-white rounded-full"
                                animate={{ height: [4, 16, 6, 12, 4][barIdx % 3] }}
                                transition={{
                                  duration: [0.5, 0.7, 0.6, 0.8][barIdx % 4],
                                  repeat: Infinity,
                                  repeatType: 'reverse',
                                  ease: 'easeInOut',
                                  delay: barIdx * 0.1
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          <span className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-full text-[9px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">
                            {getCategoryName(track.category)}
                          </span>
                        )}
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/[0.01] border border-dashed border-white/10 rounded-2xl"
          >
            <Music className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-lg font-light uppercase tracking-widest text-white/60 mb-2">Ничего не найдено</h3>
            <p className="text-sm text-white/40 max-w-md mx-auto">
              Попробуйте изменить параметры поиска или переключиться на другую музыкальную категорию.
            </p>
          </motion.div>
        )}

        {/* Show More / Show Less Button */}
        {filteredTracks.length > 16 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-8 py-3 border border-white/15 hover:border-white/40 bg-transparent rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-white transition-all cursor-pointer"
            >
              {expanded ? 'Свернуть список' : `Показать все композиции (${filteredTracks.length})`}
            </button>
          </div>
        )}

      </div>

      {/* Floating Ultra-Premium Bottom Mini-Player Drawer */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="fixed bottom-6 left-0 right-0 z-50 px-4 md:px-6 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto w-full bg-black/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-full py-3.5 px-6 flex flex-row items-center justify-between gap-4 md:gap-8 pointer-events-auto">
              
              {/* Left track item info with spinning note art */}
              <div className="flex items-center gap-3 min-w-0 flex-1 md:flex-initial">
                <motion.div 
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0"
                >
                  <Music className="w-5 h-5 text-white/80" />
                </motion.div>
                <div className="min-w-0">
                  <h4 className="text-xs md:text-sm font-semibold truncate text-white tracking-wide">
                    {currentTrack.title}
                  </h4>
                  <p className="text-[10px] md:text-xs text-white/50 truncate font-light mt-0.5">
                    {currentTrack.artist}
                  </p>
                </div>
              </div>

              {/* Center controls & horizontal progress line */}
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 flex-1 justify-center max-w-md">
                
                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 bg-white text-black hover:bg-white/90 rounded-full transition-colors flex-shrink-0 cursor-pointer shadow-lg shadow-white/5 focus:outline-none"
                  aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                </button>

                {/* Progress bar and time labels */}
                <div className="flex items-center gap-2.5 w-full">
                  <span className="text-[9px] font-mono text-white/40 select-none">
                    {formatTime(currentTime)}
                  </span>
                  
                  {/* Interactive Slider Bar */}
                  <div 
                    onClick={handleProgressBarClick}
                    className="h-1 flex-1 bg-white/10 hover:bg-white/20 rounded-full overflow-hidden relative cursor-pointer group transition-all"
                  >
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-white group-hover:bg-white transition-all rounded-full" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <span className="text-[9px] font-mono text-white/40 select-none">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Right side animated visualizer equalizer bars & close panel */}
              <div className="hidden sm:flex items-center gap-6">
                
                {/* Simulated playback text */}
                <div className="flex items-center gap-1.5 text-white/40">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="text-[9px] tracking-widest uppercase">
                    {isPlaying ? 'Демо-Воспроизведение' : 'Пауза'}
                  </span>
                </div>

                {/* Equalizer Wave bars */}
                <div className="flex items-end gap-[3px] h-6 w-9 overflow-hidden pr-2">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-white"
                      animate={{
                        height: isPlaying 
                          ? [4, 20, 8, 24, 12, 4][i % 6]
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

                {/* Close Button */}
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentTrack(null);
                  }}
                  className="p-1 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors cursor-pointer"
                  aria-label="Закрыть плеер"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Close Button */}
              <div className="sm:hidden flex items-center">
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentTrack(null);
                  }}
                  className="p-1.5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors cursor-pointer"
                  aria-label="Закрыть плеер"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
