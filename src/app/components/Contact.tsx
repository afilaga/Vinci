import React from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Phone, MessageSquare, Send } from 'lucide-react';
import { useLanguage } from './LanguageContext';

type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
};

export const Contact = () => {
  const { t } = useLanguage();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BookingFormData>();

  const onSubmit = async (data: BookingFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Booking request:', data);
    toast.success(t('booking.successToast'));
    reset();
  };

  return (
    <section id="booking" className="py-24 md:py-32 bg-background text-foreground transition-colors duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest mb-12">{t('booking.title')}</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label className="block text-sm uppercase tracking-widest text-foreground/50 mb-2">{t('booking.name')}</label>
                <input 
                  {...register('name', { required: t('booking.errors.name') })}
                  className="w-full bg-foreground/5 border-b border-foreground/20 py-3 px-4 focus:outline-none focus:border-foreground focus:bg-foreground/10 transition-all font-light text-foreground placeholder:text-foreground/30"
                  placeholder={t('booking.namePlaceholder')}
                />
                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm uppercase tracking-widest text-foreground/50 mb-2">{t('booking.email')}</label>
                <input 
                  type="email"
                  {...register('email', { 
                    required: t('booking.errors.email'),
                    pattern: { value: /^\S+@\S+$/i, message: t('booking.errors.emailFormat') }
                  })}
                  className="w-full bg-foreground/5 border-b border-foreground/20 py-3 px-4 focus:outline-none focus:border-foreground focus:bg-foreground/10 transition-all font-light text-foreground placeholder:text-foreground/30"
                  placeholder={t('booking.emailPlaceholder')}
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-foreground/50 mb-2">{t('booking.phone')}</label>
                <input 
                  type="tel"
                  {...register('phone', { 
                    required: t('booking.errors.phone'),
                    pattern: { value: /^(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, message: t('booking.errors.phoneFormat') }
                  })}
                  className="w-full bg-foreground/5 border-b border-foreground/20 py-3 px-4 focus:outline-none focus:border-foreground focus:bg-foreground/10 transition-all font-light text-foreground placeholder:text-foreground/30"
                  placeholder={t('booking.phonePlaceholder')}
                />
                {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-foreground/50 mb-2">{t('booking.date')}</label>
                <input 
                  type="date"
                  {...register('date')}
                  className="w-full bg-foreground/5 border-b border-foreground/20 py-3 px-4 focus:outline-none focus:border-foreground focus:bg-foreground/10 transition-all font-light dark:[color-scheme:dark] [color-scheme:light] text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-foreground/50 mb-2">{t('booking.message')}</label>
                <textarea 
                  {...register('message', { required: t('booking.errors.message') })}
                  rows={4}
                  className="w-full bg-foreground/5 border-b border-foreground/20 py-3 px-4 focus:outline-none focus:border-foreground focus:bg-foreground/10 transition-all font-light resize-none text-foreground placeholder:text-foreground/30"
                  placeholder={t('booking.messagePlaceholder')}
                />
                {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message.message}</span>}
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background uppercase tracking-[0.3em] font-medium py-5 hover:bg-foreground/90 transition-all disabled:bg-foreground/50 shadow-xl cursor-pointer"
              >
                {isSubmitting ? t('booking.submitting') : t('booking.submit')}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center bg-foreground/5 backdrop-blur-2xl p-12 lg:p-16 border border-foreground/10 relative overflow-hidden"
          >
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-foreground rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] opacity-[0.05] dark:opacity-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-foreground rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px] opacity-[0.02] dark:opacity-5 pointer-events-none" />

            <h3 className="text-2xl font-light uppercase tracking-[0.3em] mb-10 relative z-10">{t('booking.contactsTitle')}</h3>
            
            <div className="space-y-10 relative z-10">

              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-foreground/50">{t('booking.quickContact')}</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  <a 
                    href="tel:+79194676701"
                    className="flex items-center gap-3 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 hover:border-foreground/30 py-4 px-6 rounded-xl transition-all duration-300 group/btn"
                  >
                    <Phone size={18} className="text-foreground/60 group-hover/btn:text-foreground group-hover/btn:animate-pulse transition-colors" />
                    <span className="text-sm font-light uppercase tracking-widest text-foreground/80 group-hover/btn:text-foreground transition-colors">{t('booking.call')}</span>
                  </a>

                  <a 
                    href="https://wa.me/79194676701"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#25D366]/5 hover:bg-[#25D366]/10 border border-[#25D366]/20 hover:border-[#25D366]/50 py-4 px-6 rounded-xl transition-all duration-300 group/btn"
                  >
                    <MessageSquare size={18} className="text-[#25D366] opacity-80 group-hover/btn:opacity-100 transition-opacity" />
                    <span className="text-sm font-light uppercase tracking-widest text-[#25D366] group-hover/btn:text-[#25D366] transition-colors font-medium">{t('booking.whatsapp')}</span>
                  </a>

                  <a 
                    href="https://t.me/ultravinci"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#0088cc]/5 hover:bg-[#0088cc]/10 border border-[#0088cc]/20 hover:border-[#0088cc]/50 py-4 px-6 rounded-xl transition-all duration-300 group/btn col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-2"
                  >
                    <Send size={18} className="text-[#0088cc] opacity-80 group-hover/btn:opacity-100 transition-opacity" />
                    <span className="text-sm font-light uppercase tracking-widest text-[#0088cc] group-hover/btn:text-[#0088cc] transition-colors font-medium">{t('booking.telegram')}</span>
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-foreground/10">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-foreground/50 mb-4">{t('booking.socials')}</h4>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  <a href="https://instagram.com/a2.duet" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-widest text-foreground/60 hover:text-foreground transition-all hover:translate-x-1 inline-block">
                    Instagram
                  </a>
                  <a href="https://t.me/ultravinci" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-widest text-foreground/60 hover:text-foreground transition-all hover:translate-x-1 inline-block">
                    Telegram
                  </a>
                  <a href="https://youtube.com/@A2.duet" target="_blank" rel="noopener noreferrer" className="text-sm uppercase tracking-widest text-foreground/60 hover:text-foreground transition-all hover:translate-x-1 inline-block">
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
