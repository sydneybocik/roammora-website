import RoamerCard from './RoamerCard';

export default function EmotionalTruth() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
            The world is calling you somewhere else — you're not imagining it.
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Most people stay where they are because moving overseas feels impossible.<br />
            Roammora exists because the world needs a better starting point for international relocation.
          </p>
          <button
            onClick={() => {
              window.history.pushState({}, '', '/questionnaire?source=emotional_truth');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all text-base font-medium inline-flex items-center gap-2"
          >
            Start your journey
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <RoamerCard
            badge="Dreaming"
            name="Alex – Gaining Clarity"
            description="Alex has always imagined living abroad, but never knew what that life would look like in reality. Roammora is helping him understand what matters most — pace of life, cost, culture, work style — so he can picture where he'd actually feel at home."
            nextStep="Figure out what kind of life actually fits me."
            image="/finalwebsiteimages/roamerheadshot1.png"
            flagImage="/finalwebsiteimages/flagusa.png"
          />
          <RoamerCard
            badge="Planning"
            name="Sarah – Moving to France"
            description="Sarah has secured a job to work abroad, finished her visa steps, and rented an apartment — now she's focused on settling in. Roammora helps her with introductory language courses, cultural basics, and day-to-day prep so she can arrive confident and ready."
            nextStep="Finish assimilation courses."
            image="/finalwebsiteimages/roamerheadshot2.png"
            flagImage="/finalwebsiteimages/flagcanada.png"
          />
        </div>
      </div>
    </section>
  );
}
