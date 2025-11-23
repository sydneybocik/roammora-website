import { Menu } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/roammorablacklogo.png" alt="Roammora" className="h-8" />
        </div>

        <nav className="hidden md:flex items-center">
          <a href="#journey" className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium">
            Start your journey
          </a>
        </nav>

        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
