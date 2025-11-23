import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-[#d5e5d8] rounded-3xl overflow-hidden">
          <div className="p-12">
            <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight text-gray-900">
              Your life doesn't have to stay where it started.
            </h2>
            <p className="text-base text-gray-700 mb-8 leading-relaxed">
              Join the early Roamer waitlist to help us build a better way to belong and take your first step towards borderless living.
            </p>
            <button
              onClick={() => {
                window.history.pushState({}, '', '/questionnaire?source=final_cta');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all text-base font-medium inline-flex items-center gap-2 group"
            >
              Join the early Roamer waitlist
            </button>
          </div>
          <div className="relative h-96 md:h-full">
            <img
              src="/finalwebsiteimages/homepagewalkingdog.png"
              alt="Person with dog"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
