import HeroSection from "@/components/HeroSection/HeroSection";
import About from "@/components/About/About";
import Statistik from "@/components/Statistik/Statistik";
import Project from "@/components/Project/Project";

export default function Home() {
  return (
    <div className="bg-transparent">
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Statistik Section */}
      <section id="skill">
        <Statistik />
      </section>

      {/* Project Section */}
      <section id="project">
        <Project />
      </section>
    </div>
  );
}
