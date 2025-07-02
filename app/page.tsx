import HeroSection from "../components/HeroSection";
import StatsSection from "../components/StatsSection";
import AboutPulita from "../components/AboutPulita";
import ProductCard from "../components/ProductCard";
import ScrollRevealCard from "../components/ScrollRevealCard";
import RecentProject from "../components/RecentProject";
import PulitaEnergySection from "../components/PulitaEnergySection";
import ContactSection from "../components/ContactSection";
import React from "react";

const HomePage: React.FC = () => (
  <>
    <HeroSection />
    <StatsSection />
    <AboutPulita />
    <ProductCard />
    <ScrollRevealCard />
    <RecentProject />
    <PulitaEnergySection />
    <ContactSection />
  </>
);

export default HomePage;
