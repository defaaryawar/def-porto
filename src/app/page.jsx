"use client"

import React from "react";
import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection/HeroSection";
import About from "@/components/About/About";
import Statistik from "@/components/Statistik/Statistik";
import Project from "@/components/Project/Project";
import ChatWithMe from "@/components/ChatWithMe/ChatWithMe";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Animated background blobs - now in main component */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: ["-20%", "-15%", "-20%"],
            y: ["-20%", "-25%", "-20%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: ["60%", "65%", "60%"],
            y: ["60%", "65%", "60%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10">
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