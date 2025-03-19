"use client"

import React from "react";
import HeroSection from "@/components/HeroSection/HeroSection";
import About from "@/components/About/About";
import Statistik from "@/components/Statistik/Statistik";
import Project from "@/components/Project/Project";
import ChatWithMe from "@/components/ChatWithMe/ChatWithMe";
import Certificate from "@/components/Certificate/Certificate";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Animated background blobs - now in main component */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
      </div>

      {/* Content container */}
      <div className="relative">
        {/* Hero Section */}
        <section id="hero" className="relative">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about" className="relative">
          <About />
        </section>

        {/* Statistik Section */}
        <section id="skill" className="relative">
          <Statistik />
        </section>

        {/* Statistik Section */}
        <section id="certificate" className="relative z-51">
          <Certificate />
        </section>

        {/* Project Section */}
        <section id="project" className="relative">
          <Project />
        </section>

        {/* Chat Section */}
        <section className="relative">
          <ChatWithMe />
        </section>
      </div>
    </div>
  );
}