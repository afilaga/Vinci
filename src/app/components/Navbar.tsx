import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Send } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'О проекте', href: '#about' },
    { name: 'Репертуар', href: '#repertoire' },
    { name: 'Демо', href: '#demo' },
    { name: 'Плейлист', href: '#playlist' },
    { name: 'Галерея', href: '#gallery' },
    { name: 'Видео', href: '#video' },
    { name: 'Райдеры', href: '#riders' },
    { name: 'Бронирование', href: '#booking' },
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
          ? 'bg-black/40 backdrop-blur-xl py-3 border-b border-white/5' 
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
            className="h-12 w-auto object-contain brightness-0 invert" 
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-300 hover:text-white text-sm uppercase tracking-widest transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="h-4 w-[1px] bg-white/15" />

          <div className="flex items-center gap-4">
            <a 
              href="tel:+79194676701"
              className="text-white/60 hover:text-white transition-colors"
              title="Позвонить"
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
            <a 
              href="tel:+79194676701"
              className="text-white/60 hover:text-white transition-colors p-1"
              title="Позвонить"
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
            className="text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md flex flex-col py-6 px-6 gap-6 shadow-2xl border-t border-gray-800 max-h-[80dvh] overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-white text-lg uppercase tracking-widest border-b border-gray-800 pb-4"
            >
              {link.name}
            </a>
          ))}

          {/* Contacts Grid inside drawer */}
          <div className="pt-4 pb-2 border-t border-gray-800">
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-4">Связаться в один клик</h4>
            <div className="grid grid-cols-3 gap-3">
              <a 
                href="tel:+79194676701"
                className="flex flex-col items-center justify-center gap-2 bg-white/5 border border-white/10 py-3 rounded-xl transition-all"
              >
                <Phone size={18} className="text-white/60" />
                <span className="text-[10px] uppercase tracking-wider text-white/80 font-light">Звонок</span>
              </a>
              <a 
                href="https://wa.me/79194676701"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 bg-[#25D366]/5 border border-[#25D366]/20 py-3 rounded-xl transition-all"
              >
                <MessageSquare size={18} className="text-[#25D366]" />
                <span className="text-[10px] uppercase tracking-wider text-[#25D366] font-medium">WhatsApp</span>
              </a>
              <a 
                href="https://t.me/ultravinci"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-2 bg-[#0088cc]/5 border border-[#0088cc]/20 py-3 rounded-xl transition-all"
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
