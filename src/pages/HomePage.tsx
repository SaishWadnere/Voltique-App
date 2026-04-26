import Hero from '../components/home/Hero';
import CuratedCollections from '../components/home/CuratedCollections';
import TrendingNow from '../components/home/TrendingNow';
import PromoBanner from '../components/home/PromoBanner';
import TrustBadges from '../components/home/TrustBadges';
import Newsletter from '../components/home/Newsletter';

export default function HomePage() {
  return (
    <main className="pt-20">
      <Hero />
      <CuratedCollections />
      <TrendingNow />
      <PromoBanner />
      <TrustBadges />
      <Newsletter />
    </main>
  );
}
