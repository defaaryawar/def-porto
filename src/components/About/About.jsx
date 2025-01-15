"use client"

import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const useInView = () => {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return { inView, sectionRef };
};

const About = () => {
    const { inView, sectionRef } = useInView();

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            className="relative min-h-screen py-20 overflow-hidden"
            ref={sectionRef}
        >
            {/* Content container */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-4xl sm:text-5xl font-bold mb-16 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                        Who Am I?
                    </span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Profile Image with animated container */}
                    <motion.div
                        className="relative group mx-auto lg:mx-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* <motion.div
                            className="absolute -inset-1.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-700"
                            animate={{
                                scale: [1, 1.02, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        /> */}
                        <div className="relative max-w-md mx-auto">
                            <div className="rounded-full overflow-hidden border-8 border-slate-900/50 shadow-2xl transform group-hover:scale-105 transition duration-500">
                                <img
                                    src="./images/profil.jpeg"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Description with animated text */}
                    <motion.div
                        className="space-y-6 text-lg"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <motion.p
                            className="leading-relaxed text-slate-300"
                            variants={textVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                        >
                            Hello, I'm a passionate <span className="font-bold text-violet-400">Web Developer</span> with a focus on creating modern, interactive, and user-friendly websites. I specialize in front-end technologies like <span className="font-bold text-indigo-400">React.js, Next.js, and Tailwind CSS</span>.
                        </motion.p>

                        <motion.p
                            className="leading-relaxed text-slate-300"
                            variants={textVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            transition={{ delay: 0.2 }}
                        >
                            I have a love for coding and a strong desire to always learn and grow as a <span className="font-bold text-violet-400">developer</span>. I am also very interested in <span className="font-bold text-indigo-400">UX/UI</span> design and strive to make the web a more accessible and enjoyable place for everyone.
                        </motion.p>

                        <motion.p
                            className="leading-relaxed text-slate-300"
                            variants={textVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            transition={{ delay: 0.4 }}
                        >
                            When I'm not <span className="font-bold text-violet-400">coding</span>, I enjoy photography, exploring new tech trends, and contributing to open-source projects. I am always looking for new <span className="font-bold text-indigo-400">opportunities</span> to collaborate and learn from others.
                        </motion.p>

                        {/* Contact button with enhanced animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="pt-8"
                        >
                            <button
                                onClick={() => scrollToSection("hero")}
                                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-2xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-size-200 animate-gradient"></div>
                                <motion.span
                                    className="relative flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    Contact Me
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14m-7-7 7 7-7 7" />
                                    </svg>
                                </motion.span>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;