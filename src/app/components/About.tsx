import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from './LanguageContext';
import SoftAurora from '../../components/SoftAurora';

export const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 md:py-32 bg-background text-foreground relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <div className="order-2 lg:order-1 relative w-full max-w-md mx-auto aspect-[3/4]">
            {/* SoftAurora WebGL backdrop behind the photo */}
            <div className="absolute -inset-4 md:-inset-8 -z-10 rounded-[2rem] overflow-hidden opacity-75 pointer-events-none shadow-2xl">
              <SoftAurora
                speed={0.4}
                scale={1.4}
                brightness={1.0}
                color1="#f7f7f7"
                color2="#120214"
                noiseFrequency={2.5}
                noiseAmplitude={1.0}
                bandHeight={0.5}
                bandSpread={1.0}
                octaveDecay={0.1}
                layerOffset={0.4}
                colorSpeed={1.0}
                enableMouseInteraction={false}
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer border border-foreground/10 shadow-2xl"
            >
              <div className="absolute inset-0 overflow-hidden">
                <ImageWithFallback
                  src="images/About.webp"
                  alt="A² Duo"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
            </motion.div>
          </div>
 
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-8 uppercase tracking-widest text-foreground transition-colors duration-500">
              {t('about.title')}
            </h2>
            
            <h3 className="text-xl text-foreground/80 font-light mb-6 uppercase tracking-wider transition-colors duration-500">
              {t('about.subtitle')}
            </h3>
            
            <div className="space-y-6 text-foreground/70 font-light text-lg leading-relaxed transition-colors duration-500">
              <p>
                <strong className="text-foreground font-normal transition-colors duration-500">A² (Ardor Squared)</strong>
                {t('about.p1').replace('A² (Ardor Squared)', '')}
              </p>
              <p>
                {t('about.p2')}
              </p>
            </div>
 
            <div className="mt-12 p-8 bg-foreground/5 backdrop-blur-lg border border-foreground/10 relative shadow-2xl transition-all duration-500">
              <div className="absolute -top-3 left-8 bg-background border border-foreground/10 px-4 py-1 text-[10px] uppercase tracking-[0.3em] text-foreground/60 transition-colors duration-500">{t('about.philosophy')}</div>
              <p className="text-foreground/80 font-light italic leading-relaxed text-lg transition-colors duration-500">
                {t('about.quote')}
              </p>
            </div>
          </motion.div>
        </div>
 
        {/* Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 border-t border-foreground/10 pt-24 transition-colors duration-500">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group cursor-pointer"
          >
            <h3 className="text-2xl font-medium mb-2 group-hover:text-foreground transition-colors">{t('about.polinaName')}</h3>
            <p className="text-sm uppercase tracking-widest text-foreground/50 mb-6 transition-colors duration-500">{t('about.polinaRole')}</p>
            <div className="space-y-4 text-foreground/70 font-light leading-relaxed transition-colors duration-500">
              <div className="mb-6 relative aspect-square w-48 overflow-hidden rounded-full border border-foreground/10 transition-colors duration-500">
                <ImageWithFallback
                  src="images/Polina_portrait.JPG"
                  alt="Polina Vinci"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
              <p>
                {t('about.polinaP1')}
              </p>
              <p>
                {t('about.polinaP2')}
              </p>
            </div>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group cursor-pointer"
          >
            <h3 className="text-2xl font-medium mb-2 group-hover:text-foreground transition-colors">{t('about.mikhailName')}</h3>
            <p className="text-sm uppercase tracking-widest text-foreground/50 mb-6 transition-colors duration-500">{t('about.mikhailRole')}</p>
            <div className="space-y-4 text-foreground/70 font-light leading-relaxed transition-colors duration-500">
              <div className="mb-6 relative aspect-square w-48 overflow-hidden rounded-full border border-foreground/10 transition-colors duration-500">
                <ImageWithFallback
                  src="images/Sax_portrait.JPG"
                  alt="Mikhail Akimov"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </div>
              <p>
                {t('about.mikhailP1')}
              </p>
              <p>
                {t('about.mikhailP2')}
              </p>
            </div>
          </motion.div>
        </div>
 
      </div>
    </section>
  );
};
