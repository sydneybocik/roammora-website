export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src="/roammorawhitelogo.png" alt="Roammora" className="h-8" />
          </div>

          <div className="flex items-center gap-8">
            <span className="text-gray-400 text-sm">
              © 2025 Roammora. Belong everywhere.
            </span>
            <a href="/privacy-promise" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Promise
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
