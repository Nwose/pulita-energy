"use client";
import AboutPulita from "../components/AboutPulita";
import ContactSection from "../components/ContactSection";
import HeroSection from "../components/HeroSection"; // static import
import StatsSection from "../components/StatsSection"; // static import
import dynamic from "next/dynamic";
const ProductCard = dynamic(() => import("../components/ProductCard"), {
  ssr: false,
});
const ScrollRevealCard = dynamic(
  () => import("../components/ScrollRevealCard"),
  { ssr: false }
);
const RecentProject = dynamic(() => import("../components/RecentProject"), {
  ssr: false,
});
const PulitaEnergySection = dynamic(
  () => import("../components/PulitaEnergySection"),
  { ssr: false }
);

const HomeClient = () => (
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

export default HomeClient;
