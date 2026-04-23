import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-500 py-12 border-t border-gray-900">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <img 
            src="/images/logo_new.png" 
            alt="A² Logo" 
            className="h-10 w-auto object-contain brightness-0 invert opacity-80" 
          />
        </div>
        
        <p className="text-sm font-light uppercase tracking-widest text-center">
          © {new Date().getFullYear()} A² (Ardor Squared). Все права защищены.
        </p>
        
        <div className="flex gap-6">
          <a href="#" className="text-sm uppercase tracking-widest hover:text-white transition-colors">Конфиденциальность</a>
          <a href="#" className="text-sm uppercase tracking-widest hover:text-white transition-colors">Условия</a>
        </div>
      </div>
    </footer>
  );
};
