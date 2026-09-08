import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExperienceSection from './components/ExperienceSection';
import SkillsMatrix from './components/SkillsMatrix';
import ArchitectureVisualizer from './components/ArchitectureVisualizer';
import TerminalSimulator from './components/TerminalSimulator';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050507] text-[#f4f4f5] selection:bg-[#ccff00] selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <ExperienceSection />
        <SkillsMatrix />
        <ArchitectureVisualizer />
        <TerminalSimulator />
        <AchievementsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
