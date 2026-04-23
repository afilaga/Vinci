import React from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type BookingFormData = {
  name: string;
  email: string;
  date: string;
  message: string;
};

export const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<BookingFormData>();

  const onSubmit = async (data: BookingFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Booking request:', data);
    toast.success('Запрос успешно отправлен. Мы свяжемся с вами в ближайшее время.');
    reset();
  };

  return (
    <section id="booking" className="py-24 md:py-32 bg-[#050505] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,#111_0%,transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-widest mb-12">Бронирование</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-500 mb-2">Имя</label>
                <input 
                  {...register('name', { required: 'Укажите имя' })}
                  className="w-full bg-white/5 border-b border-white/20 py-3 px-4 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all font-light"
                  placeholder="Анна Иванова"
                />
                {errors.name && <span className="text-red-500 text-xs mt-1 block">{errors.name.message}</span>}
              </div>
              
              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-500 mb-2">Email адрес</label>
                <input 
                  type="email"
                  {...register('email', { 
                    required: 'Укажите email',
                    pattern: { value: /^\S+@\S+$/i, message: 'Неверный формат email' }
                  })}
                  className="w-full bg-white/5 border-b border-white/20 py-3 px-4 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all font-light"
                  placeholder="anna@example.com"
                />
                {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-500 mb-2">Дата мероприятия</label>
                <input 
                  type="date"
                  {...register('date')}
                  className="w-full bg-white/5 border-b border-white/20 py-3 px-4 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all font-light inverted-scheme"
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-widest text-gray-500 mb-2">Сообщение / Детали</label>
                <textarea 
                  {...register('message', { required: 'Напишите сообщение' })}
                  rows={4}
                  className="w-full bg-white/5 border-b border-white/20 py-3 px-4 focus:outline-none focus:border-white/50 focus:bg-white/10 transition-all font-light resize-none"
                  placeholder="Расскажите о вашем мероприятии..."
                />
                {errors.message && <span className="text-red-500 text-xs mt-1 block">{errors.message.message}</span>}
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black uppercase tracking-[0.3em] font-medium py-5 hover:bg-gray-200 transition-all disabled:bg-gray-700 shadow-xl"
              >
                {isSubmitting ? 'Отправка...' : 'Отправить запрос'}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center bg-white/5 backdrop-blur-2xl p-12 lg:p-16 border border-white/10 relative overflow-hidden"
          >
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-[100px] opacity-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px] opacity-5 pointer-events-none" />

            <h3 className="text-2xl font-light uppercase tracking-[0.3em] mb-10 relative z-10">Контакты</h3>
            
            <div className="space-y-10 relative z-10">
              <div className="group">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-2 group-hover:text-white transition-colors">Менеджмент и букинг</h4>
                <a href="mailto:booking@a2duo.com" className="text-xl font-light hover:tracking-widest transition-all duration-300">booking@a2duo.com</a>
              </div>
              
              <div className="group">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-2 group-hover:text-white transition-colors">Телефон</h4>
                <a href="tel:+79991234567" className="text-xl font-light hover:tracking-widest transition-all duration-300">+7 (999) 123-45-67</a>
              </div>

              <div className="pt-8 border-t border-white/10">
                <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-4">Соцсети</h4>
                <div className="flex flex-wrap gap-x-8 gap-y-2">
                  {['Instagram', 'Telegram', 'YouTube'].map((social) => (
                    <a key={social} href="#" className="text-sm uppercase tracking-widest text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block">
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
