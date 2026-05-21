import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-background text-foreground/50 py-12 border-t border-foreground/10 transition-colors duration-500">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center">
          <img 
            src="images/logo_new.png" 
            alt="A² Logo" 
            className="h-10 w-auto object-contain brightness-0 dark:invert opacity-80 transition-all duration-500" 
          />
        </div>
        
        <p className="text-sm font-light uppercase tracking-widest text-center">
          © {new Date().getFullYear()} A² (Ardor Squared). Все права защищены.
        </p>
        
        <div className="flex gap-6">
          <a href="#" className="text-sm uppercase tracking-widest hover:text-foreground transition-colors">Конфиденциальность</a>
          <a href="#" className="text-sm uppercase tracking-widest hover:text-foreground transition-colors">Условия</a>
        </div>
      </div>
    </footer>
  );
};
