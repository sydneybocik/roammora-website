import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrolled = window.scrollY;
        setIsDark(scrolled < heroHeight);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full backdrop-blur-sm z-50 transition-all duration-300 ${
      isDark ? 'bg-transparent border-transparent' : 'bg-white/95 border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-3">
          <img
            src={isDark ? "/finalwebsiteimages/roammorawhitelogo.png" : "/finalwebsiteimages/roammorablacklogo.png"}
            alt="Roammora"
            className="h-8 transition-opacity duration-300"
          />
        </a>

        <nav className="hidden md:flex items-center">
          <a href="#journey" className={`px-6 py-2 rounded-full transition-all text-sm font-medium ${
            isDark ? 'bg-black text-white hover:bg-gray-900' : 'text-gray-700 hover:text-gray-900'
          }`}>
            Start your journey
          </a>
        </nav>

        <button className="md:hidden">
          <Menu className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
        </button>
      </div>
    </header>
  );
}
