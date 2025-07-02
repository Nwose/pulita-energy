import React from "react";
import dynamic from "next/dynamic";
import AboutPulita from "../components/AboutPulita";
import ContactSection from "../components/ContactSection";

const HeroSection = dynamic(() => import("../components/HeroSection"), {
  ssr: false,
});
const StatsSection = dynamic(() => import("../components/StatsSection"), {
  ssr: false,
});
const ProductCard = dynamic(() => import("../components/ProductCard"), {
  ssr: false,
});
const ScrollRevealCard = dynamic(() => import("../components/ScrollRevealCard"), {
  ssr: false,
});
const RecentProject = dynamic(() => import("../components/RecentProject"), {
  ssr: false,
});
const PulitaEnergySection = dynamic(() => import("../components/PulitaEnergySection"), {
  ssr: false,
});

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
