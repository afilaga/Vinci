import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Send, Sun, Moon } from 'lucide-react';
import { useLanguage } from './LanguageContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Initialize theme state from DOM
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const navLinks = [
    { name: t('navbar.about'), href: '#about' },
    { name: t('navbar.repertoire'), href: '#repertoire' },
    { name: t('navbar.demo'), href: '#demo' },
    { name: t('navbar.playlist'), href: '#playlist' },
    { name: t('navbar.gallery'), href: '#gallery' },
    { name: t('navbar.video'), href: '#video' },
    { name: t('navbar.riders'), href: '#riders' },
    { name: t('navbar.booking'), href: '#booking' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl py-3 border-b border-foreground/5' 
          : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, '#home')}
          className="flex items-center"
        >
          <img 
            src="images/logo_new.png" 
            alt="A² Logo" 
            className="h-12 w-auto object-contain brightness-0 dark:invert transition-all duration-500" 
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-foreground/75 hover:text-foreground text-sm uppercase tracking-widest transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-foreground/15" />

          {/* Direct Contacts, Language Switcher & Theme Switcher */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="text-foreground/75 hover:text-foreground font-mono text-xs font-semibold px-2 py-0.5 border border-foreground/15 hover:border-foreground/30 rounded transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
              title={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
              aria-label="Switch language"
            >
              {language.toUpperCase()}
            </button>

            <div className="h-4 w-[1px] bg-foreground/15" />

            <button
              onClick={toggleTheme}
              className="text-foreground/60 hover:text-foreground transition-all duration-300 p-1 cursor-pointer hover:scale-110 active:scale-95"
              title={theme === 'dark' ? t('navbar.themeDark') : t('navbar.themeLight')}
              aria-label={t('navbar.themeLabel')}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="h-4 w-[1px] bg-foreground/15" />

            <a 
              href="tel:+79194676701"
              className="text-foreground/60 hover:text-foreground transition-colors"
              title={t('navbar.callTitle')}
            >
              <Phone size={18} />
            </a>
            <a 
              href="https://wa.me/79194676701"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366]/80 hover:text-[#25D366] transition-colors"
              title="WhatsApp"
            >
              <MessageSquare size={18} />
            </a>
            <a 
              href="https://t.me/ultravinci"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0088cc]/80 hover:text-[#0088cc] transition-colors"
              title="Telegram"
            >
              <Send size={18} />
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle and Direct Contacts */}
        <div className="flex md:hidden items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="text-foreground/75 hover:text-foreground font-mono text-xs font-semibold px-2 py-0.5 border border-foreground/15 hover:border-foreground/30 rounded transition-all duration-300 cursor-pointer active:scale-95"
              title={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
              aria-label="Switch language"
            >
              {language.toUpperCase()}
            </button>

            <div className="h-5 w-[1px] bg-foreground/15 mx-1" />

            <button
              onClick={toggleTheme}
              className="text-foreground/60 hover:text-foreground transition-colors p-1 cursor-pointer hover:scale-105"
              title={theme === 'dark' ? t('navbar.themeDark') : t('navbar.themeLight')}
              aria-label={t('navbar.themeLabel')}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="h-5 w-[1px] bg-foreground/15 mx-1" />

            <a 
              href="tel:+79194676701"
              className="text-foreground/60 hover:text-foreground transition-colors p-1"
              title={t('navbar.callTitle')}
            >
              <Phone size={20} />
            </a>
            <a 
              href="https://wa.me/79194676701"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366]/80 hover:text-[#25D366] transition-colors p-1"
              title="WhatsApp"
            >
              <MessageSquare size={20} />
            </a>
            <a 
              href="https://t.me/ultravinci"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0088cc]/80 hover:text-[#0088cc] transition-colors p-1"
              title="Telegram"
            >
              <Send size={20} />
            </a>
          </div>
          
          <button
            className="text-foreground p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md flex flex-col py-6 px-6 gap-6 shadow-2xl border-t border-foreground/10 max-h-[80dvh] overflow-y-auto transition-colors duration-500">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-foreground text-lg uppercase tracking-widest border-b border-foreground/10 pb-4"
            >
              {link.name}
            </a>
          ))}

          {/* Contacts Grid inside drawer */}
          <div className="pt-4 pb-2 border-t border-foreground/10">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-foreground/50 mb-4">{t('navbar.quickContact')}</h4>
            <div className="grid grid-cols-3 gap-3">
              <a 
                href="tel:+79194676701"
                className="flex flex-col items-center justify-center gap-2 bg-foreground/5 border border-foreground/10 py-3 rounded-xl transition-all"
              >
                <Phone size={18} className="text-foreground/60" />
                <span className="text-[10px] uppercase tracking-wider text-foreground/80 font-light">{t('navbar.call')}</span>
              </a>
              <a 
                href="https://wa.me/79194676701"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 bg-[#25D366]/5 dark:bg-[#25D366]/10 border border-[#25D366]/20 py-3 rounded-xl transition-all"
              >
                <MessageSquare size={18} className="text-[#25D366]" />
                <span className="text-[10px] uppercase tracking-wider text-[#25D366] font-medium">WhatsApp</span>
              </a>
              <a 
                href="https://t.me/ultravinci"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 bg-[#0088cc]/5 dark:bg-[#0088cc]/10 border border-[#0088cc]/20 py-3 rounded-xl transition-all"
              >
                <Send size={18} className="text-[#0088cc]" />
                <span className="text-[10px] uppercase tracking-wider text-[#0088cc] font-medium">Telegram</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

