import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="order-2 lg:order-1 relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden"
          >
            <motion.div style={{ y: imageY }} className="absolute inset-[-15%] w-[130%] h-[130%]">
              <ImageWithFallback
                src="/images/duo.jpg"
                alt="A² Duo"
                className="w-full h-full object-cover grayscale"
              />
            </motion.div>
            <div className="absolute inset-0 border border-gray-800 translate-x-4 translate-y-4 pointer-events-none" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-8 uppercase tracking-widest text-white">
              О проекте
            </h2>
            
            <h3 className="text-xl text-gray-300 font-light mb-6 uppercase tracking-wider">
              Дуэт вокала и саксофона: Полина Винчи и Михаил Акимов
            </h3>
            
            <div className="space-y-6 text-gray-400 font-light text-lg leading-relaxed">
              <p>
                <strong className="text-white font-normal">A² (Ardor Squared)</strong> — это камерный дуэт, в котором вокал и саксофон звучат как единый организм. Минимум средств, максимум выразительности.
              </p>
              <p>
                Мы сочетаем живое исполнение, аутентичное звучание, авторские аранжировки и гибкий формат, подходящий как для частных мероприятий, так и для уютных вечеров.
              </p>
            </div>

            <div className="mt-12 p-8 bg-white/5 backdrop-blur-lg border border-white/10 relative shadow-2xl">
              <div className="absolute -top-3 left-8 bg-black border border-white/10 px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-gray-400">Философия</div>
              <p className="text-gray-300 font-light italic leading-relaxed text-lg">
                «Название отражает нашу философию: два разных тембра, два разных подхода, две музыкальные энергии, объединённые одной задачей — создавать звук, который трогает сердце и душу. Мы — два разных темперамента, два разных оттенка, которые вместе создают цельное, естественное и тёплое звучание.»
              </p>
            </div>
          </motion.div>
        </div>

        {/* Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 border-t border-gray-900 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-medium mb-2">Полина Винчи</h3>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">Вокал</p>
            <div className="space-y-4 text-gray-400 font-light leading-relaxed">
              <div className="mb-6 relative aspect-square w-48 overflow-hidden rounded-full border border-gray-800">
                <ImageWithFallback
                  src="/images/polina.jpg"
                  alt="Polina Vinci"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <p>
                Полина — вокалистка с характерным мягким тембром и узнаваемой манерой исполнения. В её голосе — тепло, искренность и эмоциональность: каждая песня звучит так, будто проживается здесь и сейчас.
              </p>
              <p>
                Она работает на стыке поп-вокала, блюза, джаза и соула. Полина поёт на русском, английском, французском и итальянском языках, а её голос задаёт эмоциональное направление всему выступлению.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-medium mb-2">Михаил Акимов</h3>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">Саксофон</p>
            <div className="space-y-4 text-gray-400 font-light leading-relaxed">
              <div className="mb-6 relative aspect-square w-48 overflow-hidden rounded-full border border-gray-800">
                <ImageWithFallback
                  src="/images/mikhail.jpg"
                  alt="Mikhail Akimov"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <p>
                Михаил играет в манере, которая сочетает джазовую школу и современный лаунж-подход. Миша — это про воздух, свободу и ту самую импровизацию, которая делает выступление уникальным.
              </p>
              <p>
                Он не играет выученные соло — он разговаривает с залом через саксофон. Иногда мягко, иногда дерзко, но всегда — искренне. Саксофон реагирует на музыку в моменте, ловит настроение пространства и мягко поддерживает вокал, поэтому звучание получается живым и очень органичным.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
