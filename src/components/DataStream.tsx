import { useEffect, useRef } from 'react';

const dataWords = [
  'Cost of living',
  'Visa pathways',
  'Neighborhood fit',
  'Walkability',
  'Climate preferences',
  "Women's safety",
  'Cultural compatibility',
  'Language skills',
  'Income needs',
  'Social life',
  'Pet requirements',
  'Identity',
  'Work experience',
  'Timeline goals',
  'Budget',
  'Next steps',
  'Healthcare access',
  'LGBTQ+ safety',
  'Residency routes',
  'Transit',
];

export default function DataStream() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scroll = () => {
      scrollAmount += 0.5;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
    };

    const interval = setInterval(scroll, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-6 bg-[#2c3d34] overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <p className="text-sm text-gray-400 mb-6 tracking-wide uppercase">Your 24/7 AI Companion</p>
        <h2 className="text-4xl md:text-5xl font-light leading-tight text-white mb-8">
          Your beginning belongs somewhere.
        </h2>
        <p className="text-base text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Your future shouldn't be shaped by guesswork. Roammora helps you see your next chapter clearly — one step, one choice, one possibility at a time.
        </p>
      </div>

      <div ref={scrollRef} className="overflow-hidden whitespace-nowrap mb-12">
        <div className="inline-flex gap-4">
          {[...dataWords, ...dataWords].map((word, idx) => (
            <span
              key={idx}
              className="inline-block bg-[#3d5045] px-6 py-3 rounded-full text-gray-200 font-light text-sm border border-gray-600"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
