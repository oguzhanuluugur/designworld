"use client";

import {useState} from "react";
import {AnimatePresence} from "framer-motion";
import Preloader from "@/components/Preloader/Preloader";
import Header from "@/components/Header/Header";
import HeroSlider from "@/components/Hero/HeroSlider";
import PhilosophySection from "@/components/Philosophy/PhilosophySection";
import ServicesSection from "@/components/Services/ServicesSection";
import ProjectsShowcase from "@/components/Projects/ProjectsShowcase";
import CTASection from "@/components/CTA/CTASection";
import InsightsSection from "@/components/Insights/InsightsSection";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showHeaderLogo, setShowHeaderLogo] = useState(false);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    setShowHeaderLogo(true);
  };

  return (
    <main className="relative min-h-screen bg-white">
      {/* Preloader */}
      <AnimatePresence>
        {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Header/Navbar */}
      <Header showLogo={showHeaderLogo} />

      {/* Hero Slider */}
      <section id="home" className="relative">
        <HeroSlider />
      </section>

      {/* Philosophy Parallax Section */}
      <PhilosophySection />

      {/* Services Timeline Section */}
      <ServicesSection />

      {/* Projects Digital Lookbook */}
      <ProjectsShowcase />

      {/* Luxury CTA Strip */}
      <CTASection />

      {/* Insights Editorial Magazine */}
      <InsightsSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

