interface RoamerCardProps {
  badge: string;
  name: string;
  description: string;
  nextStep: string;
  image: string;
  flagImage?: string;
}

export default function RoamerCard({ badge, name, description, nextStep, image, flagImage }: RoamerCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div className="relative h-96">
        <img src={image} alt={`Portrait of ${name.split('–')[0].trim()}`} className="w-full h-full object-cover object-top" loading="lazy" />
        <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium">
          {badge}
        </div>
        <div className="absolute bottom-4 left-4 right-4 bg-gray-900/60 backdrop-blur-md text-white p-4 rounded-lg flex items-stretch gap-3">
          {flagImage && (
            <img src={flagImage} alt="Country flag" className="w-10 object-contain flex-shrink-0 self-stretch" loading="lazy" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-300 mb-1">Next step</p>
            <p className="text-sm md:text-base text-white leading-snug">{nextStep}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-3">
          {name.split('–')[0].trim()}
          {name.includes('–') && (
            <span className="text-gray-400"> – {name.split('–')[1].trim()}</span>
          )}
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
      </div>
    </div>
  );
}
