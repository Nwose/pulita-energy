"use client";
import React, { useEffect, useState } from "react";
import AboutHeader from "../../components/about/AboutHeader";
import AboutHeroSection from "../../components/about/AboutHeroSection";
import AboutWhoWeAre from "../../components/about/AboutWhoWeAre";
import TeamSection from "../../components/about/TeamSection";
import AboutScrollRevealCard from "../../components/about/AboutScrollReveal";
import AboutStatsSection from "../../components/about/AboutStatsCardSection";

const AboutPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-20 px-4 lg:px-8 font-satoshi ">
      <div className="max-w-7xl mx-auto">
        <AboutHeader />
        <AboutHeroSection isVisible={isVisible} />
        <AboutWhoWeAre />
        <TeamSection />
        <AboutScrollRevealCard />
        <AboutStatsSection />
      </div>
    </section>
  );
};

export default AboutPage;
