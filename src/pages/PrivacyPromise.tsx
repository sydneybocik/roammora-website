import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function PrivacyPromise() {
  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16 pt-32">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-black mb-16 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to homepage
        </button>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal mb-16 leading-tight">
          Privacy Promise
        </h1>

        <div className="prose prose-lg max-w-3xl">
          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            At Roammora, your privacy matters. When you join or share information with us, we collect only what we need to understand who you are, what you're hoping for, and how we can build a better experience for you.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            We collect information such as your name, email, and any details you choose to provide about your life, work, preferences, or plans. This information helps us personalize your experience, shape our product, and notify you when new features or updates are ready.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            We do not sell your information, share it for advertising, or use it for any purpose unrelated to improving Roammora. Your data is stored securely and accessed only by team members who need it to support your experience.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            You can request to update or delete your information at any time. We keep your information only as long as necessary to deliver updates, maintain your place on the waitlist, or continue improving the product using general, aggregated insights.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Roammora is intended for adults, and we do not knowingly collect information from anyone under 16. If we update this Privacy Promise in the future, the revised version will always be posted here.
          </p>

          <p className="text-lg leading-relaxed text-gray-700">
            Your trust is essential. We are committed to protecting your information and honoring your choices at every step.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
