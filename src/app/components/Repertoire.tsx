import React from 'react';
import { motion } from 'motion/react';

const repertoireItems = [
  {
    title: "Современные хиты в джазовой, соул, хаус и лаунж-обработке",
    desc: "Мы адаптируем известные композиции, сохраняя их узнаваемость, но делая звучание более деликатным, стильным и живым."
  },
  {
    title: "Tropical / Deep House версии",
    desc: "Треки с лёгкой электронной основой и живым саксофоном, подходящие для динамичных форматов — вечерних мероприятий, летних площадок, коктейльных сетов."
  },
  {
    title: "Авторские миксы и сеты",
    desc: "Мы объединяем треки между собой, выстраивая цельное музыкальное полотно, создавая для Вас оригинальные миксы любимых песен в авторской обработке, порой, очень колоритные и неожиданные!"
  },
  {
    title: "Джазовые и соул-композиции",
    desc: "Для камерных событий или ситуаций, где важна атмосфера уюта и живого взаимодействия между голосом и инструментом."
  },
  {
    title: "Программа «под ключ»",
    desc: "Мы с удовольствием подберем программу специально для Вашего мероприятия, исходя из Ваших пожеланий."
  }
];

const formats = [
  "Деловой вечер",
  "Частное торжество",
  "Корпоративные мероприятия",
  "Тематические вечеринки",
  "Камерный концерт",
  "Выступление в зоне «welcome»",
  "Коктейльный сет",
  "И любой другой формат..."
];

export const Repertoire = () => {
  return (
    <section id="repertoire" className="py-24 md:py-32 bg-background text-foreground relative overflow-hidden transition-colors duration-500">
      {/* Background ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-foreground/[0.03] rounded-full blur-[120px] pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-foreground/[0.03] rounded-full blur-[100px] pointer-events-none transition-colors duration-500" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="max-w-4xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light uppercase tracking-widest mb-8"
          >
            Репертуар и звучание
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-foreground/60 font-light text-lg leading-relaxed space-y-4 transition-colors duration-500"
          >
            <p>
              Мы формируем программу так, чтобы музыка оставалась актуальной и уместной в самых разных контекстах — от формата «welcome» до полноценного концерта.
            </p>
            <p>
              Дуэт А² всегда прислушивается к Вашим интересам и представлению о событии. Благодаря этому мы можем собрать уникальный репертуар специально под ваш вечер, чтобы выступление звучало стильно, органично и помогало создать по-настоящему неповторимую атмосферу.
            </p>
          </motion.div>
        </div>

        {/* Repertoire Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-32">
          {repertoireItems.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              className={`bg-foreground/5 backdrop-blur-md border border-foreground/10 p-5 md:p-8 hover:bg-foreground/10 hover:border-foreground/20 hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden ${
                index === 4 ? 'col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="w-12 h-[1px] bg-foreground/30 mb-6 group-hover:w-full transition-all duration-700" />
              <h3 className="text-base md:text-xl font-medium mb-4 tracking-wide text-foreground group-hover:text-foreground transition-colors">{item.title}</h3>
              <p className="text-foreground/50 font-light leading-relaxed text-xs md:text-sm group-hover:text-foreground/80 transition-colors">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Formats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light uppercase tracking-widest mb-8">Формат и подход</h2>
            <p className="text-foreground/60 font-light text-lg leading-relaxed mb-6 transition-colors duration-500">
              Мы внимательно прислушиваемся к вашим пожеланиям — будь то программа, формат выступления, настроение вечера или дресс-код. Наша цель — органично вписаться в атмосферу Вашего события.
            </p>
            <p className="text-foreground/60 font-light text-lg leading-relaxed transition-colors duration-500">
              Мы заранее обсуждаем репертуар, длительность сетов, а также визуальную часть — от стиля одежды до общего образа дуэта.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            {formats.map((format, i) => (
              <span 
                key={i}
                className="px-6 py-3 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-full text-[10px] uppercase tracking-[0.2em] text-foreground/80 hover:bg-foreground/10 hover:border-foreground/20 hover:text-foreground transition-all cursor-default duration-500"
              >
                {format}
              </span>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
