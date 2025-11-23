import { useState } from 'react';

const tabs = [
  {
    id: 'dream',
    label: 'Dream',
    content: 'Roammora learns who you are — not just what documents you need — and helps you imagine the life waiting for you elsewhere.',
    image: 'https://raw.githubusercontent.com/sydneybocik/roammora-website/main/public/finalwebsiteimages/homepagedream.png',
  },
  {
    id: 'plan',
    label: 'Plan',
    content: "We don't show you a list of steps. We show you the one that comes next — the one that makes everything feel possible.",
    image: 'https://raw.githubusercontent.com/sydneybocik/roammora-website/main/public/finalwebsiteimages/homepageplan.png',
  },
  {
    id: 'arrive',
    label: 'Arrive',
    content: 'We help you land gently — into a home, a rhythm, and a community that makes your new life feel like coming home.',
    image: 'https://raw.githubusercontent.com/sydneybocik/roammora-website/main/public/finalwebsiteimages/homepagearrive.png',
  },
];

export default function SmartModular() {
  const [activeTab, setActiveTab] = useState('dream');

  const activeContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="pb-24 px-6 bg-[#2c3d34]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-8 md:p-12">
            <span className="inline-block bg-gray-400 text-white px-5 py-2 rounded-full text-sm font-medium mb-6">
              Roammora
            </span>
            <h2 className="text-4xl md:text-5xl font-light mb-12">
              Smart, modular, human.
            </h2>

            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-12 bg-gray-100">
              <img
                src={activeContent?.image}
                alt={activeContent?.label}
                className="w-full h-full object-cover object-[center_20%] transition-opacity duration-500"
                loading="eager"
              />
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="grid md:grid-cols-3 gap-8">
                {tabs.map((tab) => (
                  <div key={tab.id} className="cursor-pointer" onClick={() => setActiveTab(tab.id)}>
                    <div className="relative inline-block mb-4">
                      <h3 className={`text-2xl transition-all ${
                        activeTab === tab.id ? 'font-bold text-black' : 'font-light text-gray-400'
                      }`}>
                        {tab.label}
                      </h3>
                      {activeTab === tab.id && (
                        <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-black"></div>
                      )}
                    </div>
                    <p className={`text-base leading-relaxed transition-colors ${
                      activeTab === tab.id ? 'text-black' : 'text-gray-400'
                    }`}>
                      {tab.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
