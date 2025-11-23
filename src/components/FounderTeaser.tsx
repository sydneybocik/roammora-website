import { ArrowRight } from 'lucide-react';

export default function FounderTeaser() {
  const handleReadLetter = () => {
    window.location.href = '/founder-letter';
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl bg-gray-600">
            <img
              src="/founderheadshot.jpeg"
              alt="Founder"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
              A letter from our founder
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Her story became the first Roammora story — and now, maybe yours.
            </p>
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Read about our commitment to provide everyone on our platform with the pathway that can help them create the life they've always dreamt of.
            </p>
            <button
              onClick={handleReadLetter}
              className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all text-base font-medium inline-flex items-center gap-2 group"
            >
              Read Sydney's Letter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
