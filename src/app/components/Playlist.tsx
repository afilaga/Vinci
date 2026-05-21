import React from 'react';
import { motion } from 'motion/react';

interface Track {
  id: string;
  title: string;
  artist: string;
}

const MASHUPS: Track[] = [
  { id: 'm-1', title: 'Tropical House Mix (Every Breath You Take + Titanium + Wicked Game)', artist: 'A² Mash-Up' },
  { id: 'm-2', title: 'Perfect + Hallelujah + We Are The Champions', artist: 'Ed Sheeran / Leonard Cohen / Queen' },
  { id: 'm-3', title: 'Never Gonna Give You Up + Cupid + That’s The Way I Like It + Adventure of A Lifetime', artist: 'Rick Astley / Fifty Fifty / KC & The Sunshine Band / Coldplay' },
  { id: 'm-4', title: 'No Woman No Cry + I’m Not The Only One', artist: 'Bob Marley / Sam Smith' },
  { id: 'm-5', title: 'Lose Control + Call Out My Name + Dangerous Woman', artist: 'Teddy Swims / The Weeknd / Ariana Grande' },
  { id: 'm-6', title: 'Adore You + Bad Habits + Dancin’', artist: 'Harry Styles / Ed Sheeran / Aaron Smith' },
  { id: 'm-7', title: 'Life + Cold Heart + Señorita + Ты не верь слезам', artist: 'Zivert / Elton John & Dua Lipa / Camila Cabello / Шура' },
  { id: 'm-8', title: 'Sing It Back + Бери и беги + Water + Мой мармеладный', artist: 'Moloko / Zivert / Tyla / Катя Лель' },
  { id: 'm-9', title: 'Rockabye + Shape Of You + Между нами любовь + Плакал Голливуд', artist: 'Clean Bandit / Ed Sheeran / Serebro / Люся Чеботина' },
  { id: 'm-10', title: 'Marry You + It’s Time + We Are Young', artist: 'Bruno Mars / Imagine Dragons / FUN.' },
  { id: 'm-11', title: 'Relax, take it easy + (I Just) Died in your arms tonight + La Grenade', artist: 'Mika / Cutting Crew / Clara Luciani' },
  { id: 'm-12', title: 'Beautiful Things + Let Her Go', artist: 'Benson Boone / Passenger' },
  { id: 'm-13', title: 'Radioactive + Counting Stars + Feel It Still + Pumped Up Kicks', artist: 'Imagine Dragons / OneRepublic / Portugal. The Man / Foster The People' },
  { id: 'm-14', title: 'Lean On + Something Just Like This + We Don’t Talk Anymore + Hymn For The Weekend', artist: 'Major Lazer & DJ Snake / The Chainsmokers / Charlie Puth / Coldplay' }
];

const JAZZ: Track[] = [
  { id: 'j-1', title: 'Don’t Know Why', artist: 'Norah Jones' },
  { id: 'j-2', title: 'Can’t Take My Eyes Of You (I Love You Baby) (Soul Version)', artist: 'Vigon Bamy Jay' },
  { id: 'j-3', title: 'Je Veux', artist: 'ZAZ' },
  { id: 'j-4', title: 'Fly Me To The Moon', artist: 'Bobby Womack' },
  { id: 'j-5', title: 'Why Don’t You Do Right', artist: 'Peggy Lee' },
  { id: 'j-6', title: 'Umbrella', artist: 'The Baseballs' },
  { id: 'j-7', title: 'Something’s Gotta Hold On Me', artist: 'Christina Aguilera' },
  { id: 'j-8', title: 'L-O-V-E', artist: 'Joss Stone' },
  { id: 'j-9', title: 'Englishman In New York (Jazz version)', artist: 'Sting' },
  { id: 'j-10', title: 'La Vie En Rose', artist: 'ZAZ' },
  { id: 'j-11', title: 'Happy Together', artist: 'The Turtles' },
  { id: 'j-12', title: 'We Belong Together', artist: 'Ritchie Valens' },
  { id: 'j-13', title: 'Я буду всегда с тобой (2017 version)', artist: 'Леонид Агутин' },
  { id: 'j-14', title: 'Молитва', artist: 'Би-2' },
  { id: 'j-15', title: 'Valerie', artist: 'Amy Winehouse' },
  { id: 'j-16', title: 'Blinding Lights', artist: 'Teddy Swims' },
  { id: 'j-17', title: 'Je t’aime', artist: 'Lara Fabian' },
  { id: 'j-18', title: 'Die With A Smile', artist: 'Bruno Mars' },
  { id: 'j-19', title: 'Get Lucky', artist: 'Karen Souza' },
  { id: 'j-20', title: 'Voyage Voyage (Piano Version)', artist: 'Desireless' },
  { id: 'j-21', title: 'If I Ain’t Got You', artist: 'Alicia Keys' },
  { id: 'j-22', title: 'Не позвонишь', artist: 'Patricia Kaas & Уматурман' }
];

const OTHER: Track[] = [
  { id: 'o-1', title: 'I Love You', artist: 'Adriano Celentano' },
  { id: 'o-2', title: 'Улетаю', artist: 'А-Студио' },
  { id: 'o-3', title: 'Шёлк', artist: 'Ваня Дмитриенко' },
  { id: 'o-4', title: 'Le temps est bon', artist: 'Bon Entendeur' },
  { id: 'o-5', title: 'La Grenade', artist: 'Clara Luciani' },
  { id: 'o-6', title: 'Adagio', artist: 'Lara Fabian' },
  { id: 'o-7', title: 'La Noia', artist: 'Angelina Mango' },
  { id: 'o-8', title: 'We No Speak Americano', artist: 'Yolanda Be Cool' },
  { id: 'o-9', title: 'Hava Nagila', artist: 'Traditional' },
  { id: 'o-10', title: 'Mazel Tov', artist: 'Traditional' },
  { id: 'o-11', title: 'Лимончики (Одесская)', artist: 'Народная' },
  { id: 'o-12', title: 'Ricchie E Poveri Mash-Up (Mamma Maria + Sara Perche Ti Amo)', artist: 'Ricchi e Poveri' }
];

const SOVIET: Track[] = [
  { id: 's-1', title: 'Песенка о медведях', artist: 'из к/ф "Кавказская пленница"' },
  { id: 's-2', title: 'Мы к вам заехали на час (Rock version)', artist: 'Геннадий Гладков' },
  { id: 's-3', title: 'Проснись и пой', artist: 'Геннадий Гладков' },
  { id: 's-4', title: 'Черный кот', artist: 'Тамара Миансарова' },
  { id: 's-5', title: 'Лучший город Земли', artist: 'Муслим Магомаев' },
  { id: 's-6', title: 'Остров невезения', artist: 'из к/ф "Бриллиантовая рука"' },
  { id: 's-7', title: 'Любовь настала', artist: 'Роза Рымбаева' },
  { id: 's-8', title: 'Королева красоты', artist: 'Муслим Магомаев' },
  { id: 's-9', title: 'Комарово', artist: 'Игорь Скляр' },
  { id: 's-10', title: 'А знаешь, все еще будет', artist: 'Алла Пугачева' },
  { id: 's-11', title: 'Разговор со счастьем', artist: 'из к/ф "Иван Васильевич меняет профессию"' },
  { id: 's-12', title: 'Позвони мне, позвони', artist: 'Ирина Муравьева' },
  { id: 's-13', title: 'Любовь, похожая на сон', artist: 'Алла Пугачева' },
  { id: 's-14', title: 'Леди Совершенство', artist: 'Максим Дунаевский' },
  { id: 's-15', title: 'Ищу тебя', artist: 'из к/ф "31 июня"' },
  { id: 's-16', title: 'Если б я был султан', artist: 'из к/ф "Кавказская пленница"' },
  { id: 's-17', title: 'Зима (Потолок ледяной)', artist: 'Эдуард Хиль' },
  { id: 's-18', title: 'Три белых коня', artist: 'из к/ф "Чародеи"' },
  { id: 's-19', title: 'Надо же', artist: 'Алла Пугачева' },
  { id: 's-20', title: 'Арлекино', artist: 'Алла Пугачева' },
  { id: 's-21', title: 'Последняя поэма', artist: 'Валерия' },
  { id: 's-22', title: 'Миллион алых роз', artist: 'Алла Пугачева' },
  { id: 's-23', title: 'Там, где клен шумит', artist: 'Владимир Маркин' },
  { id: 's-24', title: 'Промоги мне', artist: 'из к/ф "Бриллиантовая рука"' },
  { id: 's-25', title: 'Прощай', artist: 'Лев Лещенко' }
];

const CHRISTMAS: Track[] = [
  { id: 'c-1', title: 'Happy New Year', artist: 'ABBA' },
  { id: 'c-2', title: 'Last Christmas', artist: 'Wham!' },
  { id: 'c-3', title: 'Magic Moments', artist: 'Perry Como' },
  { id: 'c-4', title: 'Winter Wonderland', artist: 'Dean Martin' },
  { id: 'c-5', title: 'Let It Snow', artist: 'Frank Sinatra' },
  { id: 'c-6', title: 'It’s a Most wonderful time of the year', artist: 'Andy Williams' },
  { id: 'c-7', title: 'It’s Beginning to look a lot like Christmas', artist: 'Michael Buble' },
  { id: 'c-8', title: 'Have Yourself A Merry Little Christmas', artist: 'Frank Sinatra' },
  { id: 'c-9', title: 'Rockin’ Around The Christmas Tree', artist: 'Brenda Lee' },
  { id: 'c-10', title: 'A Holly Jolly Christmas', artist: 'Michael Buble' },
  { id: 'c-11', title: 'Snowman', artist: 'Sia' },
  { id: 'c-12', title: 'All I want for Christmas is', artist: 'Mariah Carey' },
  { id: 'c-13', title: 'Here Comes Santa Claus', artist: 'Elvis Presley' },
  { id: 'c-14', title: 'Santa Claus Is Coming To Town', artist: 'Michael Buble' },
  { id: 'c-15', title: 'Jingle Bell Rock', artist: 'Bobby Helms' }
];

export const Playlist = () => {
  return (
    <section id="playlist" className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="max-w-4xl mb-20">
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
              Наш репертуар, структурированный по музыкальным направлениям. Вы можете легко ознакомиться со списками композиций для Вашего мероприятия.
            </p>
          </motion.div>
        </div>

        {/* Categories Grid - 2 columns on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-20 items-start">
          
          {/* Column 1 */}
          <div className="space-y-20">
            {/* Mash Ups */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest mb-6 text-white border-b border-white/10 pb-4">
                Mash Ups
              </h3>
              <div className="divide-y divide-white/5">
                {MASHUPS.map((track, index) => (
                  <div 
                    key={track.id} 
                    className="py-3.5 flex items-baseline gap-4 text-white/60 hover:text-white transition-colors duration-200 group"
                  >
                    <span className="text-[10px] font-mono text-white/30 group-hover:text-white/50 transition-colors w-6 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm md:text-base font-light leading-relaxed">
                      {track.title}
                      {track.artist && track.artist !== 'A² Mash-Up' && (
                        <span className="text-white/30 font-extralight text-xs block md:inline md:ml-2">
                          — {track.artist}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Christmas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest mb-6 text-white border-b border-white/10 pb-4">
                Christmas
              </h3>
              <div className="divide-y divide-white/5">
                {CHRISTMAS.map((track, index) => (
                  <div 
                    key={track.id} 
                    className="py-3.5 flex items-baseline gap-4 text-white/60 hover:text-white transition-colors duration-200 group"
                  >
                    <span className="text-[10px] font-mono text-white/30 group-hover:text-white/50 transition-colors w-6 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm md:text-base font-light leading-relaxed">
                      {track.title}
                      {track.artist && (
                        <span className="text-white/30 font-extralight text-xs block md:inline md:ml-2">
                          — {track.artist}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Other */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest mb-6 text-white border-b border-white/10 pb-4">
                Other
              </h3>
              <div className="divide-y divide-white/5">
                {OTHER.map((track, index) => (
                  <div 
                    key={track.id} 
                    className="py-3.5 flex items-baseline gap-4 text-white/60 hover:text-white transition-colors duration-200 group"
                  >
                    <span className="text-[10px] font-mono text-white/30 group-hover:text-white/50 transition-colors w-6 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm md:text-base font-light leading-relaxed">
                      {track.title}
                      {track.artist && (
                        <span className="text-white/30 font-extralight text-xs block md:inline md:ml-2">
                          — {track.artist}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Column 2 */}
          <div className="space-y-20">
            {/* Jazz / Welcome */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest mb-6 text-white border-b border-white/10 pb-4">
                Jazz / Welcome
              </h3>
              <div className="divide-y divide-white/5">
                {JAZZ.map((track, index) => (
                  <div 
                    key={track.id} 
                    className="py-3.5 flex items-baseline gap-4 text-white/60 hover:text-white transition-colors duration-200 group"
                  >
                    <span className="text-[10px] font-mono text-white/30 group-hover:text-white/50 transition-colors w-6 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm md:text-base font-light leading-relaxed">
                      {track.title}
                      {track.artist && (
                        <span className="text-white/30 font-extralight text-xs block md:inline md:ml-2">
                          — {track.artist}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Советское */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest mb-6 text-white border-b border-white/10 pb-4">
                Советское
              </h3>
              <div className="divide-y divide-white/5">
                {SOVIET.map((track, index) => (
                  <div 
                    key={track.id} 
                    className="py-3.5 flex items-baseline gap-4 text-white/60 hover:text-white transition-colors duration-200 group"
                  >
                    <span className="text-[10px] font-mono text-white/30 group-hover:text-white/50 transition-colors w-6 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm md:text-base font-light leading-relaxed">
                      {track.title}
                      {track.artist && (
                        <span className="text-white/30 font-extralight text-xs block md:inline md:ml-2">
                          — {track.artist}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
