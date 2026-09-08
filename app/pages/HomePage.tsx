import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { CareerSection } from "../components/CareerSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { CertificatesSection } from "../components/CertificatesSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CareerSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
      <Footer />
    </>
  );
}
