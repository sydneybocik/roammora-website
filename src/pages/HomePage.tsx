import Header from '../components/Header';
import Hero from '../components/Hero';
import EmotionalTruth from '../components/EmotionalTruth';
import SmartModular from '../components/SmartModular';
import DataStream from '../components/DataStream';
import FounderTeaser from '../components/FounderTeaser';
import SocialProof from '../components/SocialProof';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <EmotionalTruth />
      <DataStream />
      <SmartModular />
      <FounderTeaser />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </div>
  );
}
