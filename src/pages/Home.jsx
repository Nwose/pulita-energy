import StatsSection from "../components/StatsSection";
import AboutPulita from "../components/AboutPulita";
import ProductCard from "../components/ProductCard";
import ScrollRevealCards from "../components/ScrollRevealCard";
import RecentProjects from "../components/RecentProject";
import PulitaEnergySection from "../components/PulitaEnergySection";
import ContactSection from "../components/ContactSection";
import HeroSection from "../components/HeroSection";

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
