import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, FileText, Coffee, Plane, MapPin, Users, 
  AlertTriangle, Clock, Volume2, Briefcase, 
  Tv, Compass, Layers, Phone, MessageSquare, Send
} from 'lucide-react';
import { useLanguage } from './LanguageContext';

type RiderTab = 'technical' | 'hospitality';

export const Riders = () => {
  const [activeTab, setActiveTab] = useState<RiderTab>('technical');
  const { t } = useLanguage();

  const renderBoldText = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : part);
  };

  return (
    <section id="riders" className="py-24 md:py-32 bg-background text-foreground relative overflow-hidden transition-colors duration-500">
      {/* Background glow decorations */}
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-foreground/[0.02] rounded-full blur-[100px] pointer-events-none transition-colors duration-500" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-foreground/[0.015] rounded-full blur-[130px] pointer-events-none transition-colors duration-500" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-foreground/40 font-semibold transition-colors duration-500">
              {t('riders.tag')}
            </span>
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest">
              {t('riders.title')}
            </h2>
            <p className="text-foreground/60 font-light text-base md:text-lg leading-relaxed transition-colors duration-500">
              {t('riders.desc')}
            </p>
          </motion.div>
        </div>

        {/* Tab Controls & Download Panel */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 max-w-5xl mx-auto">
          
          {/* Tabs selector */}
          <div className="bg-foreground/[0.03] border border-foreground/5 p-1 rounded-full flex gap-1 relative z-20 transition-colors duration-500">
            <button
              onClick={() => setActiveTab('technical')}
              className={`px-6 py-3 rounded-full text-xs md:text-sm uppercase tracking-widest font-medium transition-all duration-300 relative cursor-pointer ${
                activeTab === 'technical' ? 'text-background font-semibold' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {activeTab === 'technical' && (
                <motion.div
                  layoutId="activeRiderTab"
                  className="absolute inset-0 bg-foreground rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                {t('riders.tabTech')}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('hospitality')}
              className={`px-6 py-3 rounded-full text-xs md:text-sm uppercase tracking-widest font-medium transition-all duration-300 relative cursor-pointer ${
                activeTab === 'hospitality' ? 'text-background font-semibold' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {activeTab === 'hospitality' && (
                <motion.div
                  layoutId="activeRiderTab"
                  className="absolute inset-0 bg-foreground rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Coffee className="w-4 h-4" />
                {t('riders.tabHosp')}
              </span>
            </button>
          </div>

          {/* Quick PDF Downloads */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="raiders/a2_technical_rider.pdf"
              download
              className="px-5 py-3 bg-foreground/[0.03] hover:bg-foreground/[0.08] border border-foreground/10 rounded-2xl text-xs uppercase tracking-wider font-semibold flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group cursor-pointer shadow-md shadow-foreground/5"
            >
              <FileText className="w-4 h-4 text-foreground/60 group-hover:text-foreground transition-colors" />
              {t('riders.dlTech')}
              <Download className="w-3.5 h-3.5 text-foreground/40 group-hover:text-foreground transition-colors" />
            </a>
            
            <a
              href="raiders/a2_hospitality_rider.pdf"
              download
              className="px-5 py-3 bg-foreground/[0.03] hover:bg-foreground/[0.08] border border-foreground/10 rounded-2xl text-xs uppercase tracking-wider font-semibold flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group cursor-pointer shadow-md shadow-foreground/5"
            >
              <FileText className="w-4 h-4 text-foreground/60 group-hover:text-foreground transition-colors" />
              {t('riders.dlHosp')}
              <Download className="w-3.5 h-3.5 text-foreground/40 group-hover:text-foreground transition-colors" />
            </a>
          </div>

        </div>

        {/* Dynamic Content Switching */}
        <div className="max-w-5xl mx-auto relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'technical' ? (
              <motion.div
                key="technical"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                
                {/* Intro message & check conditions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-foreground/[0.02] border border-foreground/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl transition-all duration-500">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-foreground/80 transition-colors duration-500">
                        <Clock className="w-5 h-5 text-foreground/60 transition-colors" />
                        <h3 className="font-semibold text-lg">{t('riders.tech.soundcheck')}</h3>
                      </div>
                      <ul className="space-y-2.5 text-sm text-foreground/60 font-light list-disc list-inside transition-colors duration-500">
                        {(t('riders.tech.soundcheckLines') as string[]).map((line, idx) => (
                          <li key={idx}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-foreground/[0.02] border border-foreground/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl transition-all duration-500">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-foreground/80 transition-colors duration-500">
                        <Compass className="w-5 h-5 text-foreground/60 transition-colors" />
                        <h3 className="font-semibold text-lg">{t('riders.tech.openAir')}</h3>
                      </div>
                      <p className="text-sm text-foreground/60 leading-relaxed font-light transition-colors duration-500">
                        {t('riders.tech.openAirText')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* PA and Console Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* PA System */}
                  <div className="bg-foreground/[0.01] border border-foreground/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl transition-all duration-500">
                    <div className="flex items-center gap-3 text-foreground transition-colors">
                      <Volume2 className="w-5 h-5 text-foreground/70 transition-colors" />
                      <h3 className="font-semibold text-lg">{t('riders.tech.paTitle')}</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="text-sm text-foreground/60 font-light space-y-1 transition-colors duration-500">
                        {(t('riders.tech.paLines') as string[]).map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-wider text-green-400 font-semibold block">{t('riders.tech.preferred')}</span>
                          <p className="text-xs text-foreground/50 leading-relaxed font-mono transition-colors duration-500">
                            L'Acoustics, D&B Audiotechnik, B&A, Meyer Sound, EAW, Seeburg, NEXO, Martin Audio
                          </p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-wider text-red-400 font-semibold block">{t('riders.tech.prohibited')}</span>
                          <p className="text-xs text-foreground/50 leading-relaxed font-mono transition-colors duration-500">
                            Alto, Phonic, Behringer, JBL EON, любые самодельные колонки
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FOH Console */}
                  <div className="bg-foreground/[0.01] border border-foreground/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl transition-all duration-500">
                    <div className="flex items-center gap-3 text-foreground transition-colors">
                      <Tv className="w-5 h-5 text-foreground/70 transition-colors" />
                      <h3 className="font-semibold text-lg">{t('riders.tech.fohTitle')}</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="text-sm text-foreground/60 font-light space-y-1 transition-colors duration-500">
                        {(t('riders.tech.fohLines') as string[]).map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-semibold block transition-colors duration-500">{t('riders.tech.recommendedConsoles')}</span>
                        <div className="flex flex-wrap gap-2">
                          {['Yamaha CL/QL', 'Behringer X32', 'Midas M32', 'DiGiCo S/SD', 'Roland (кроме 480)', 'Allen & Heath SQ/D-Live'].map((console) => (
                            <span key={console} className="text-xs bg-foreground/5 border border-foreground/10 px-2.5 py-1 rounded-lg text-foreground/70 font-mono transition-all">
                              {console}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Input List & Stage Plot */}
                <div className="bg-foreground/[0.02] border border-foreground/5 rounded-3xl p-6 md:p-8 shadow-xl space-y-6 transition-all duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 text-foreground transition-colors">
                      <Layers className="w-5 h-5 text-foreground/70 transition-colors" />
                      <h3 className="font-semibold text-lg">{t('riders.tech.inputListTitle')}</h3>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-foreground/40 transition-colors duration-500">
                      {t('riders.tech.totalChannels')}
                    </span>
                  </div>

                  {/* Desktop Table view */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-foreground/10 text-foreground/40 font-medium transition-colors duration-500">
                          <th className="py-3 px-4 font-mono w-16">{t('riders.tech.thCh')}</th>
                          <th className="py-3 px-4">{t('riders.tech.thSource')}</th>
                          <th className="py-3 px-4">{t('riders.tech.thType')}</th>
                          <th className="py-3 px-4">{t('riders.tech.thInfo')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-foreground/5 text-foreground/70 font-light transition-colors duration-500">
                        {(t('riders.tech.channels') as any[]).map((ch, idx) => {
                          const hasBrackets = ch.source.includes('[');
                          const cleanSource = hasBrackets ? ch.source.substring(0, ch.source.indexOf('[')).trim() : ch.source;
                          const bracketLabel = hasBrackets ? ch.source.substring(ch.source.indexOf('[') + 1, ch.source.indexOf(']')) : '';
                          const isOptional = ch.ch === '05' || ch.ch === '06';

                          return (
                            <tr key={idx} className={`hover:bg-foreground/[0.01] transition-colors ${isOptional ? 'text-foreground/40' : ''}`}>
                              <td className="py-4 px-4 font-mono text-foreground/40 transition-colors">{ch.ch}</td>
                              <td className={`py-4 px-4 font-semibold transition-colors ${isOptional ? 'text-foreground/70' : 'text-foreground'}`}>
                                {cleanSource}
                                {bracketLabel && (
                                  <span className="text-[10px] text-foreground/30 uppercase tracking-widest font-normal ml-2 transition-colors duration-500">
                                    {bracketLabel}
                                  </span>
                                )}
                              </td>
                              <td className="py-4 px-4 font-mono text-xs">{ch.type}</td>
                              <td className="py-4 px-4">{ch.info}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Hardware & Monitoring highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-foreground/5 transition-colors duration-500">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-semibold block transition-colors duration-500">{t('riders.tech.iemTitle')}</span>
                      <p className="text-xs text-foreground/60 leading-relaxed font-light transition-colors duration-500">
                        {t('riders.tech.iemText')}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-semibold block transition-colors duration-500">{t('riders.tech.micTitle')}</span>
                      <p className="text-xs text-foreground/60 leading-relaxed font-light transition-colors duration-500">
                        {t('riders.tech.micText')}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-semibold block transition-colors duration-500">{t('riders.tech.consumablesTitle')}</span>
                      <p className="text-xs text-foreground/60 leading-relaxed font-light transition-colors duration-500">
                        {t('riders.tech.consumablesText')}
                      </p>
                    </div>
                  </div>
                </div>

              </motion.div>
            ) : (
              <motion.div
                key="hospitality"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                
                {/* Dressing room card and Meals */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Dressing room - 7 cols */}
                  <div className="md:col-span-7 bg-foreground/[0.02] border border-foreground/5 rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden transition-all duration-500">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-foreground transition-colors">
                        <Users className="w-5 h-5 text-foreground/70 transition-colors" />
                        <h3 className="font-semibold text-lg">{t('riders.hosp.dressingTitle')}</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-foreground/60 font-light transition-colors duration-500">
                        <div className="space-y-2.5">
                          {(t('riders.hosp.dressingLinesLeft') as string[]).map((line, idx) => (
                            <p key={idx} className="flex items-start gap-2">
                              <span className="text-foreground mt-0.5 transition-colors">•</span>
                              {line}
                            </p>
                          ))}
                        </div>
                        
                        <div className="space-y-2.5">
                          {(t('riders.hosp.dressingLinesRight') as string[]).map((line, idx) => (
                            <p key={idx} className="flex items-start gap-2">
                              <span className="text-foreground mt-0.5 transition-colors">•</span>
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-foreground/5 flex items-center gap-2.5 text-xs text-red-400/80 font-mono uppercase tracking-wider transition-colors duration-500">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      {t('riders.hosp.dressingAlert')}
                    </div>
                  </div>

                  {/* Meals - 5 cols */}
                  <div className="md:col-span-5 bg-foreground/[0.01] border border-foreground/5 rounded-3xl p-8 flex flex-col justify-between shadow-xl transition-all duration-500">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-foreground transition-colors">
                        <Coffee className="w-5 h-5 text-foreground/70 transition-colors" />
                        <h3 className="font-semibold text-lg">{t('riders.hosp.mealsTitle')}</h3>
                      </div>
                      
                      <div className="space-y-4 text-sm text-foreground/60 font-light transition-colors duration-500">
                        <p className="leading-relaxed">
                          {renderBoldText(t('riders.hosp.mealsDesc'))}
                        </p>
                        
                        <div className="p-4 bg-foreground/5 border border-foreground/10 rounded-2xl space-y-2 transition-all">
                          <span className="text-[10px] uppercase tracking-wider text-foreground/50 font-bold block transition-colors duration-500">{t('riders.hosp.mealsWarningTitle')}</span>
                          <p className="text-xs text-foreground/80 italic transition-colors">
                            {t('riders.hosp.mealsWarningDesc')}
                          </p>
                        </div>

                        <p className="leading-relaxed">
                          {renderBoldText(t('riders.hosp.mealsStageWater'))}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Tour Logistics */}
                <div className="bg-foreground/[0.02] border border-foreground/5 rounded-3xl p-6 md:p-8 shadow-xl space-y-6 transition-all duration-500">
                  <div className="flex items-center gap-3 border-b border-foreground/5 pb-4 transition-colors">
                    <Plane className="w-5 h-5 text-foreground/70 transition-colors" />
                    <h3 className="font-semibold text-lg">{t('riders.hosp.logisticsTitle')}</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {(t('riders.hosp.logistics') as any[]).map((item, idx) => {
                      const icons = [
                        <Plane className="w-4 h-4 text-foreground/50 transition-colors" />,
                        <Briefcase className="w-4 h-4 text-foreground/50 transition-colors" />,
                        <MapPin className="w-4 h-4 text-foreground/50 transition-colors" />,
                        <Users className="w-4 h-4 text-foreground/50 transition-colors" />
                      ];

                      return (
                        <div key={idx} className="space-y-3 p-4 bg-foreground/[0.01] border border-foreground/5 rounded-2xl transition-all duration-500">
                          <div className="flex items-center gap-2 text-foreground transition-colors">
                            {icons[idx]}
                            <span className="font-semibold text-sm">{item.title}</span>
                          </div>
                          <p className="text-xs text-foreground/60 leading-relaxed font-light transition-colors duration-500">
                            {renderBoldText(item.desc)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact info footer */}
        <div className="mt-16 text-center max-w-xl mx-auto p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2">{t('riders.contactsTitle')}</p>
          <p className="text-base font-light text-white/80 uppercase tracking-widest mb-6">{t('riders.polinaName')}</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="tel:+79194676701" 
              className="flex items-center justify-center gap-2 w-full sm:w-auto min-w-[140px] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 py-3 px-6 rounded-xl text-xs uppercase tracking-widest text-white/80 hover:text-white transition-all duration-300 group/btn"
            >
              <Phone size={14} className="text-white/60 group-hover/btn:text-white group-hover/btn:animate-pulse transition-colors" />
              <span>{t('riders.callBtn')}</span>
            </a>
            
            <a 
              href="https://wa.me/79194676701" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 w-full sm:w-auto min-w-[140px] bg-[#25D366]/5 hover:bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/50 py-3 px-6 rounded-xl text-xs uppercase tracking-widest text-[#25D366] transition-all duration-300 group/btn"
            >
              <MessageSquare size={14} className="text-[#25D366] opacity-80 group-hover/btn:opacity-100 transition-opacity" />
              <span className="font-medium">WhatsApp</span>
            </a>

            <a 
              href="https://t.me/ultravinci" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2 w-full sm:w-auto min-w-[140px] bg-[#0088cc]/5 hover:bg-[#0088cc]/10 border border-[#0088cc]/20 hover:border-[#0088cc]/50 py-3 px-6 rounded-xl text-xs uppercase tracking-widest text-[#0088cc] transition-all duration-300 group/btn"
            >
              <Send size={14} className="text-[#0088cc] opacity-80 group-hover/btn:opacity-100 transition-opacity" />
              <span className="font-medium">Telegram</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
