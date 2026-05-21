import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, FileText, Mic, Music, Coffee, Plane, MapPin, Users, 
  CheckCircle2, AlertTriangle, Clock, ShieldCheck, Volume2, Briefcase, 
  Tv, Eye, HelpCircle, Compass, Layers
} from 'lucide-react';

type RiderTab = 'technical' | 'hospitality';

export const Riders = () => {
  const [activeTab, setActiveTab] = useState<RiderTab>('technical');

  return (
    <section id="riders" className="py-24 md:py-32 bg-[#030303] text-white relative overflow-hidden">
      {/* Background glow decorations */}
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[450px] h-[450px] bg-white/[0.015] rounded-full blur-[130px] pointer-events-none" />

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
            <span className="text-xs uppercase tracking-[0.3em] text-white/40 font-semibold">
              Информация для организаторов
            </span>
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest">
              Райдеры A²
            </h2>
            <p className="text-white/60 font-light text-base md:text-lg leading-relaxed">
              Мы стремимся создать безупречное шоу на любой площадке. Ниже представлены наши технические и бытовые требования. Мы всегда открыты к обсуждению и готовы адаптировать детали под возможности вашего мероприятия.
            </p>
          </motion.div>
        </div>

        {/* Tab Controls & Download Panel */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 max-w-5xl mx-auto">
          
          {/* Tabs selector */}
          <div className="bg-white/[0.03] border border-white/5 p-1 rounded-full flex gap-1 relative z-20">
            <button
              onClick={() => setActiveTab('technical')}
              className={`px-6 py-3 rounded-full text-xs md:text-sm uppercase tracking-widest font-medium transition-all duration-300 relative cursor-pointer ${
                activeTab === 'technical' ? 'text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
            >
              {activeTab === 'technical' && (
                <motion.div
                  layoutId="activeRiderTab"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                Технический
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('hospitality')}
              className={`px-6 py-3 rounded-full text-xs md:text-sm uppercase tracking-widest font-medium transition-all duration-300 relative cursor-pointer ${
                activeTab === 'hospitality' ? 'text-black font-semibold' : 'text-white/60 hover:text-white'
              }`}
            >
              {activeTab === 'hospitality' && (
                <motion.div
                  layoutId="activeRiderTab"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Coffee className="w-4 h-4" />
                Бытовой
              </span>
            </button>
          </div>

          {/* Quick PDF Downloads */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="raiders/a2_technical_rider.pdf"
              download
              className="px-5 py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-2xl text-xs uppercase tracking-wider font-semibold flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group cursor-pointer shadow-lg shadow-black/20"
            >
              <FileText className="w-4 h-4 text-white/60 group-hover:text-white" />
              Скачать техрайдер
              <Download className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
            </a>
            
            <a
              href="raiders/a2_hospitality_rider.pdf"
              download
              className="px-5 py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-2xl text-xs uppercase tracking-wider font-semibold flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 group cursor-pointer shadow-lg shadow-black/20"
            >
              <FileText className="w-4 h-4 text-white/60 group-hover:text-white" />
              Скачать бытовой райдер
              <Download className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
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
                  <div className="md:col-span-2 bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-white/80">
                        <Clock className="w-5 h-5 text-white/60" />
                        <h3 className="font-semibold text-lg">Саундчек (Soundcheck)</h3>
                      </div>
                      <ul className="space-y-2.5 text-sm text-white/60 font-light list-disc list-inside">
                        <li>Длительность настройки — не менее 1 часа после полной коммутации и готовности персонала.</li>
                        <li>Обязательно присутствие компетентного звукорежиссера площадки.</li>
                        <li>Все оборудование должно быть корректно установлено и заземлено.</li>
                        <li>Необходимо обеспечить защиту от перегрузок сети (лимитеры, бесперебойники).</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-white/80">
                        <Compass className="w-5 h-5 text-white/60" />
                        <h3 className="font-semibold text-lg">Открытые сцены</h3>
                      </div>
                      <p className="text-sm text-white/60 leading-relaxed font-light">
                        При выступлениях на открытом воздухе обязательно наличие надежной крыши над сценой. В случае температуры воздуха ниже +15°C сцена должна быть оборудована тепловыми пушками (обогревателями).
                      </p>
                    </div>
                  </div>
                </div>

                {/* PA and Console Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* PA System */}
                  <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-white/70" />
                      <h3 className="font-semibold text-lg">PA Акустическая система</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="text-sm text-white/60 font-light space-y-1">
                        <p>• Акустика должна быть минимум трехполосной с ровным звуковым полем.</p>
                        <p>• Мощность: не менее 10 кВт на 1000 мест (минимум 3 кВт для малых залов).</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-wider text-green-400 font-semibold block">✓ Предпочтительно</span>
                          <p className="text-xs text-white/50 leading-relaxed font-mono">
                            L'Acoustics, D&B Audiotechnik, B&A, Meyer Sound, EAW, Seeburg, NEXO, Martin Audio
                          </p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] uppercase tracking-wider text-red-400 font-semibold block">✕ Исключено (BAN)</span>
                          <p className="text-xs text-white/50 leading-relaxed font-mono">
                            Alto, Phonic, Behringer, JBL EON, любые самодельные колонки
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FOH Console */}
                  <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
                    <div className="flex items-center gap-3">
                      <Tv className="w-5 h-5 text-white/70" />
                      <h3 className="font-semibold text-lg">FOH Консоль (Микшер)</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="text-sm text-white/60 font-light space-y-1">
                        <p>• Звукорежиссер площадки должен отлично знать внутренний патчинг пульта.</p>
                        <p>• Требуется отдельное свободное место для подключения плейбек-ноутбука (PB).</p>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold block">Рекомендуемые пульты:</span>
                        <div className="flex flex-wrap gap-2">
                          {['Yamaha CL/QL', 'Behringer X32', 'Midas M32', 'DiGiCo S/SD', 'Roland (кроме 480)', 'Allen & Heath SQ/D-Live'].map((console) => (
                            <span key={console} className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-white/70 font-mono">
                              {console}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Input List & Stage Plot */}
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Layers className="w-5 h-5 text-white/70" />
                      <h3 className="font-semibold text-lg">Спецификация каналов (Input List)</h3>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">
                      Всего каналов: 6 • Стерео плейбек
                    </span>
                  </div>

                  {/* Desktop Table view */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-white/40 font-medium">
                          <th className="py-3 px-4 font-mono w-16">CH</th>
                          <th className="py-3 px-4">НАЗВАНИЕ КАНАЛА (SOURCE)</th>
                          <th className="py-3 px-4">ТИП КЛЮЧА / КОММУТАЦИЯ</th>
                          <th className="py-3 px-4">ИНФОРМАЦИЯ / НАСТРОЙКА</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-white/70 font-light">
                        <tr className="hover:bg-white/[0.01] transition-colors">
                          <td className="py-4 px-4 font-mono text-white/40">01</td>
                          <td className="py-4 px-4 font-semibold text-white">PB 1</td>
                          <td className="py-4 px-4 font-mono text-xs">MixRack DI + minijack</td>
                          <td className="py-4 px-4">Плейбек левый канал. Требуется кабель minijack - 2 jack</td>
                        </tr>
                        <tr className="hover:bg-white/[0.01] transition-colors">
                          <td className="py-4 px-4 font-mono text-white/40">02</td>
                          <td className="py-4 px-4 font-semibold text-white">PB 2</td>
                          <td className="py-4 px-4 font-mono text-xs">MixRack DI + minijack</td>
                          <td className="py-4 px-4">Плейбек правый канал. Требуется кабель minijack - 2 jack</td>
                        </tr>
                        <tr className="hover:bg-white/[0.01] transition-colors">
                          <td className="py-4 px-4 font-mono text-white/40">03</td>
                          <td className="py-4 px-4 font-semibold text-white">SAX</td>
                          <td className="py-4 px-4 font-mono text-xs">MixRack XLR</td>
                          <td className="py-4 px-4">Саксофон. Требуется 1 розетка 220V и 1 XLR-кабель</td>
                        </tr>
                        <tr className="hover:bg-white/[0.01] transition-colors">
                          <td className="py-4 px-4 font-mono text-white/40">04</td>
                          <td className="py-4 px-4 font-semibold text-white">POLINA (Vocal)</td>
                          <td className="py-4 px-4 font-mono text-xs">MixRack Wireless</td>
                          <td className="py-4 px-4">Лид-вокал. Радиосистема Shure QLXD/UR (капсюль SM58 beta), прямая стойка с круглым основанием</td>
                        </tr>
                        <tr className="hover:bg-white/[0.01] transition-colors text-white/40">
                          <td className="py-4 px-4 font-mono">05</td>
                          <td className="py-4 px-4 font-semibold">KEYS (L) <span className="text-[10px] text-white/30 uppercase tracking-widest font-normal ml-2">Опционально</span></td>
                          <td className="py-4 px-4 font-mono text-xs">MixRack DI + jack</td>
                          <td className="py-4 px-4">Клавиши (левый). Клавишная стойка, DI-box, кабель jack-jack</td>
                        </tr>
                        <tr className="hover:bg-white/[0.01] transition-colors text-white/40">
                          <td className="py-4 px-4 font-mono">06</td>
                          <td className="py-4 px-4 font-semibold">KEYS (R) <span className="text-[10px] text-white/30 uppercase tracking-widest font-normal ml-2">Опционально</span></td>
                          <td className="py-4 px-4 font-mono text-xs">MixRack DI + jack</td>
                          <td className="py-4 px-4">Клавиши (правый). Клавишная стойка, DI-box, кабель jack-jack</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Hardware & Monitoring highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold block">Ушной мониторинг</span>
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        IEM-системы Shure PSM900/1000 или Sennheiser G3/G4 — 3 шт. с активной направленной антенной.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold block">Вокальный микрофон</span>
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        Лид-вокал: радиосистема Shure QLXD/UR (капсюль SM58 beta) — 1 шт. Строго прямая микрофонная стойка на круглом блине (основании).
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold block">Расходные материалы</span>
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        Комплект новых щелочных батареек АА (Alkaline) — 12 шт. Армированный скотч PRO GAFF для разметки.
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
                  <div className="md:col-span-7 bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-white/70" />
                        <h3 className="font-semibold text-lg">Гримерная комната</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-white/60 font-light">
                        <div className="space-y-2.5">
                          <p className="flex items-start gap-2">
                            <span className="text-white mt-0.5">•</span>
                            Отдельная, хорошо отапливаемая комната, закрывающаяся на ключ.
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-white mt-0.5">•</span>
                            2-3 комфортных посадочных места + вешалки для костюмов.
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-white mt-0.5">•</span>
                            Зеркало в полный рост, чистая гладильная доска и утюг/отпариватель.
                          </p>
                        </div>
                        
                        <div className="space-y-2.5">
                          <p className="flex items-start gap-2">
                            <span className="text-white mt-0.5">•</span>
                            Закуски: нарезка (овощная, сырная, мясная) или фруктовая тарелка на 2-3 чел.
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-white mt-0.5">•</span>
                            Напитки: негазированная вода (2л), чай, свежесваренный капучино/американо (не растворимый!).
                          </p>
                          <p className="flex items-start gap-2">
                            <span className="text-white mt-0.5">•</span>
                            2-3 свободные розетки 220V, сухие и влажные салфетки.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2.5 text-xs text-red-400/80 font-mono uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      Не подходит: бизнес-ланч, стафф-сет, фуршетные порции
                    </div>
                  </div>

                  {/* Meals - 5 cols */}
                  <div className="md:col-span-5 bg-white/[0.01] border border-white/5 rounded-3xl p-8 flex flex-col justify-between shadow-xl">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <Coffee className="w-5 h-5 text-white/70" />
                        <h3 className="font-semibold text-lg">Питание коллектива</h3>
                      </div>
                      
                      <div className="space-y-4 text-sm text-white/60 font-light">
                        <p className="leading-relaxed">
                          Для полноценной работы группы на площадке необходимо предоставить полноценное питание (салаты, закуски, горячее блюдо из мяса/рыбы/птицы с гарниром) из расчета на **2-3 человек**.
                        </p>
                        
                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                          <span className="text-[10px] uppercase tracking-wider text-white/50 font-bold block">Важная просьба:</span>
                          <p className="text-xs text-white/80 italic">
                            «Пожалуйста, не добавляйте репчатый лук в салаты и горячие блюда артистов».
                          </p>
                        </div>

                        <p className="leading-relaxed">
                          Также на сцене во время выступления необходимо подготовить **4 бутылки негазированной воды** комнатной температуры.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Tour Logistics */}
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <Plane className="w-5 h-5 text-white/70" />
                    <h3 className="font-semibold text-lg">Транспорт и гастроли (за пределами Москвы)</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {/* Flights */}
                    <div className="space-y-3 p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-2 text-white">
                        <Plane className="w-4 h-4 text-white/50" />
                        <span className="font-semibold text-sm">Авиаперелеты</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        3-4 возвратных билета эконом-класса. Предпочтителен **Аэрофлот** (вылет из Шереметьево). Багаж: 6х23кг и 6х10кг ручной клади + оплата перегруза музыкальных инструментов. Без лоукостеров!
                      </p>
                    </div>

                    {/* Ground Travel */}
                    <div className="space-y-3 p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-2 text-white">
                        <Briefcase className="w-4 h-4 text-white/50" />
                        <span className="font-semibold text-sm">Ж/Д и Автобус</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        **Поезд** (до 18 ч): 4 места в одном купе (выкуп купе полностью). **Автобус** (до 6 ч): комфортабельный, с кондиционером, отоплением и био-туалетом.
                      </p>
                    </div>

                    {/* Accommodation */}
                    <div className="space-y-3 p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-2 text-white">
                        <MapPin className="w-4 h-4 text-white/50" />
                        <span className="font-semibold text-sm">Проживание</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        3-4 двухместных номера в отеле категории **не ниже 4*** в месте проведения или 15-30 минутах езды. Для утренних рейсов обязателен «ранний заезд». Суточные — 3000₽/чел.
                      </p>
                    </div>

                    {/* Transfer */}
                    <div className="space-y-3 p-4 bg-white/[0.01] border border-white/5 rounded-2xl">
                      <div className="flex items-center gap-2 text-white">
                        <Users className="w-4 h-4 text-white/50" />
                        <span className="font-semibold text-sm">Трансфер</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed font-light">
                        Комфортабельный минивэн/микроавтобус (от 3-4 свободных мест для инструментов) на все время пребывания. Необходим человек для помощи в погрузке оборудования.
                      </p>
                    </div>

                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact info footer */}
        <div className="mt-16 text-center max-w-xl mx-auto p-6 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-2">Контакты директора дуэта</p>
          <p className="text-sm font-semibold text-white/80">Полина</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 mt-3 font-mono text-xs text-white/60">
            <a href="tel:+79194676701" className="hover:text-white transition-colors">+7 (919) 467-67-01</a>
            <a href="https://t.me/ultravinci" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram: @ultravinci</a>
          </div>
        </div>

      </div>
    </section>
  );
};
