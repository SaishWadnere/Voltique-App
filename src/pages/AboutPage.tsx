import AboutHero from '../components/about/AboutHero';
import EngineeringSoul from '../components/about/EngineeringSoul';
import Timeline from '../components/about/Timeline';
import Values from '../components/about/Values';
import Team from '../components/about/Team';
import Stats from '../components/about/Stats';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function AboutPage() {
  return (
    <main className="pt-20">
      <ScrollReveal><AboutHero /></ScrollReveal>
      <ScrollReveal><EngineeringSoul /></ScrollReveal>
      <ScrollReveal><Timeline /></ScrollReveal>
      <ScrollReveal><Values /></ScrollReveal>
      <ScrollReveal><Team /></ScrollReveal>
      <ScrollReveal><Stats /></ScrollReveal>
    </main>
  );
}
