"use client";
import AboutPulita from "../components/AboutPulita";
import ContactSection from "../components/ContactSection";
import HeroSection from "../components/HeroSection"; // static import
import StatsSection from "../components/StatsSection"; // static import
import ProjectSub from "../components/Products/ProjectSub"; // static import
import dynamic from "next/dynamic";
import ProjectSectionCard from "./Projects/ProjectSectionCard";
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
    <div className="py-4">
      <ProjectSub limit={2} />
    </div>

    <ScrollRevealCard />
    <ProjectSectionCard limit={2} />
    <PulitaEnergySection />
    <ContactSection />
  </>
);

export default HomeClient;
