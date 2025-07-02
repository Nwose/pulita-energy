"use client";
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
const ScrollRevealCards = dynamic(
  () => import("../components/ScrollRevealCard"),
  { ssr: false }
);
const RecentProjects = dynamic(() => import("../components/RecentProject"), {
  ssr: false,
});
const PulitaEnergySection = dynamic(
  () => import("../components/PulitaEnergySection"),
  { ssr: false }
);

const Home = () => (
  <>
    <HeroSection />
    <StatsSection />
    <AboutPulita />
    <ProductCard />
    <ScrollRevealCards />
    <RecentProjects />
    <PulitaEnergySection />
    <ContactSection />
  </>
);

export default Home;
