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
    <>
      {/* Fixed wallpaper backdrop — calibrated to ~43% opacity, balanced visibility */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/wallpaper_acid_v1.png')",
          opacity: 0.43,
          filter: 'brightness(0.88) contrast(1.05)',
        }}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.60) 100%)',
        }}
      />

      {/* All content sits above the wallpaper */}
      <div className="relative min-h-screen w-full overflow-x-hidden" style={{ zIndex: 10 }}>
        <div className="min-h-screen bg-transparent text-[#f4f4f5] selection:bg-[#ccff00] selection:text-black">
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
      </div>
    </>
  );
}
