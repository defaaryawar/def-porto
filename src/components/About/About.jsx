"use client"

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope, FaTimes, FaCode, FaLaptopCode, FaCamera } from "react-icons/fa";

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
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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

    const openContactModal = () => {
        setIsContactModalOpen(true);
    };

    const closeContactModal = () => {
        setIsContactModalOpen(false);
    };

    const socialLinks = [
        { Icon: FaInstagram, url: 'https://www.instagram.com/defaaryawar_13/', delay: 0.6, color: "#E4405F", name: "Instagram" },
        { Icon: FaLinkedin, url: 'https://www.linkedin.com/in/defano-arya-wardhana-50ab11328/', delay: 0.7, color: "#0A66C2", name: "LinkedIn" },
        { Icon: FaGithub, url: 'https://github.com/defaaryawar', delay: 0.8, color: "#eaeaea", name: "GitHub" },
        { Icon: FaWhatsapp, url: 'https://wa.me/6281219147116?text=Halo%2C%20saya%20tertarik%20untuk%20tau%20lebih%20lanjut%20tentang%20Anda.', delay: 0.9, color: "#25D366", name: "WhatsApp" }
    ];

    return (
        <section
            id="about"
            className="relative py-20 overflow-hidden"
            ref={sectionRef}
        >
            {/* Background effect */}
            <motion.div
                className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: inView ? "100%" : 0 }}
                transition={{ duration: 1.5 }}
            />

            {/* Content container */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.h2
                    className="text-4xl sm:text-5xl font-bold mb-16 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -50 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-400">
                        About Me
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
                        <motion.div
                            className="absolute -inset-1.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-700"
                            animate={{
                                scale: [1, 1.02, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <div className="relative max-w-md mx-auto">
                            <div className="rounded-xl overflow-hidden border-4 border-slate-900/50 shadow-2xl transform group-hover:scale-105 transition duration-500">
                                <img
                                    src="./images/profil.jpeg"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-6">
                                    <span className="text-white font-bold text-xl mb-2">Defano Arya Wardhana</span>
                                    <span className="text-violet-300 font-medium">Web Developer & Cyber Security</span>
                                </div>
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
                        <motion.div
                            className="flex items-start gap-4"
                            variants={textVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                        >
                            <div className="mt-1 bg-gradient-to-br from-violet-500 to-indigo-500 p-2 rounded-lg">
                                <FaLaptopCode className="w-5 h-5 text-white" />
                            </div>
                            <p className="leading-relaxed text-slate-300 flex-1">
                                Hello, I'm a passionate <span className="font-bold text-violet-400">Web Developer</span> with a focus on creating modern, interactive, and user-friendly websites. I specialize in front-end technologies like <span className="font-bold text-indigo-400">React.js, Next.js, and Tailwind CSS</span>.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex items-start gap-4"
                            variants={textVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="mt-1 bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-lg">
                                <FaCode className="w-5 h-5 text-white" />
                            </div>
                            <p className="leading-relaxed text-slate-300 flex-1">
                                I have a love for coding and a strong desire to always learn and grow as a <span className="font-bold text-violet-400">developer</span>. I am also very interested in <span className="font-bold text-indigo-400">UX/UI</span> design and strive to make the web a more accessible and enjoyable place for everyone.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex items-start gap-4"
                            variants={textVariants}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="mt-1 bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                                <FaCamera className="w-5 h-5 text-white" />
                            </div>
                            <p className="leading-relaxed text-slate-300 flex-1">
                                When I'm not <span className="font-bold text-violet-400">coding</span>, I enjoy photography, exploring new tech trends, and contributing to open-source projects. I am always looking for new <span className="font-bold text-indigo-400">opportunities</span> to collaborate and learn from others.
                            </p>
                        </motion.div>

                        {/* Skills chips */}
                        <motion.div
                            className="pt-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: inView ? 1 : 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <h3 className="text-lg font-medium text-indigo-300 mb-3">Skills:</h3>
                            <div className="flex flex-wrap gap-2">
                                {['HTML', 'CSS', 'JavaScript', 'PHP', 'React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Cyber Security'].map((skill, index) => (
                                    <motion.span
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm text-white font-medium bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-indigo-500/30"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
                                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.3)' }}
                                    >
                                    {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Contact button with enhanced animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="pt-8"
                        >
                            <button
                                onClick={openContactModal}
                                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-bold rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-2xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <motion.span
                                    className="relative flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    Get In Touch
                                    <motion.div
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}
                                    >
                                        <FaEnvelope className="w-5 h-5" />
                                    </motion.div>
                                </motion.span>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom divider */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent"
                initial={{ width: 0 }}
                animate={{ width: inView ? "100%" : 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
            />

            {/* Contact Modal */}
            <AnimatePresence>
                {isContactModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeContactModal}
                    >
                        <motion.div
                            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md m-4 relative"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.button
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                                onClick={closeContactModal}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <FaTimes className="w-5 h-5" />
                            </motion.button>

                            <motion.h3
                                className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-400 text-transparent bg-clip-text"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                Get In Touch
                            </motion.h3>

                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="space-y-4">
                                    <motion.a
                                        href="https://wa.me/6281219147116?text=Halo%2C%20saya%20tertarik%20untuk%20tau%20lebih%20lanjut%20tentang%20Anda."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-600/20 to-green-600/10 rounded-xl hover:from-green-600/30 hover:to-green-600/20 transition-colors duration-300 border border-green-600/30 group"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="bg-green-600/20 p-3 rounded-full">
                                            <FaWhatsapp className="w-6 h-6 text-green-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-green-500">WhatsApp</h4>
                                            <p className="text-sm text-gray-400">+62 812-1914-7116</p>
                                        </div>
                                        <motion.span
                                            className="ml-auto text-green-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                            }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.a>

                                    <motion.a
                                        href="mailto:defadefa1313@gmail.com"
                                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-600/20 to-blue-600/10 rounded-xl hover:from-blue-600/30 hover:to-blue-600/20 transition-colors duration-300 border border-blue-600/30 group"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="bg-blue-600/20 p-3 rounded-full">
                                            <FaEnvelope className="w-6 h-6 text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-blue-500">Email</h4>
                                            <p className="text-sm text-gray-400">defadefa1313@gmail.com</p>
                                        </div>
                                        <motion.span
                                            className="ml-auto text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                repeatType: "reverse",
                                            }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.a>
                                </div>

                                <div className="pt-4 text-center">
                                    <p className="text-sm text-gray-400">Or connect with me on social media</p>
                                    <div className="flex justify-center gap-4 mt-4">
                                        {socialLinks.map(({ Icon, url, color }, index) => (
                                            <motion.a
                                                key={index}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color }}
                                                whileHover={{ scale: 1.2, rotate: 10 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <Icon className="w-6 h-6" />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default About;