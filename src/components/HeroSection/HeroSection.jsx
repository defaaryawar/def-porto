"use client"

import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import Typewriter from 'typewriter-effect';

const HeroSection = () => {
    const socialLinks = [
        { Icon: FaInstagram, url: 'https://www.instagram.com/defaaryawar_13/', delay: 0.6, color: "#E4405F" },
        { Icon: FaLinkedin, url: 'https://www.linkedin.com/in/defano-arya-wardhana-50ab11328/', delay: 0.7, color: "#0A66C2" },
        { Icon: FaGithub, url: 'https://github.com/defaaryawar', delay: 0.8, color: "#eaeaea" },
        { Icon: FaWhatsapp, url: 'https://wa.me/6281219147116?text=Halo%2C%20saya%20tertarik%20untuk%20tau%20lebih%20lanjut%20tentang%20Anda.', delay: 0.9, color: "#25D366" }
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative min-h-screen md:mt-16 mt-20 overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
                className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            />

            <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 relative z-10">
                    {/* Profile Image Section */}
                    <motion.div
                        className="relative group w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[400px]"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                    >
                        <motion.div
                            className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-75"
                            animate={{
                                opacity: [0.7, 0.9, 0.7],
                                scale: [1, 1.02, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <motion.div
                            className="relative rounded-full overflow-hidden border-4 border-white/10 shadow-2xl"
                            whileHover={{ scale: 1.03 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }}
                        >
                            <img
                                src="./images/profil.jpeg"
                                alt="Profile"
                                className="w-full aspect-square object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Name with Typewriter */}
                        <motion.div
                            className="text-2xl sm:text-4xl lg:text-5xl font-bold"
                            initial={{ y: -50 }}
                            animate={{ y: 0 }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <div className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 text-transparent bg-clip-text pb-2">
                                <Typewriter
                                    onInit={(typewriter) => {
                                        typewriter
                                            .pauseFor(800)
                                            .typeString('Defano Arya Wardhana')
                                            .pauseFor(2500)
                                            .deleteAll(50)
                                            .typeString('Defano Arya Wardhana')
                                            .pauseFor(2500)
                                            .start();
                                    }}
                                    options={{
                                        loop: true,
                                        delay: 50,
                                        cursor: '_'
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p
                            className="text-base sm:text-lg text-gray-300 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            As a graduate in Computer Engineering from <span className="font-bold text-blue-400">Budi Luhur University</span>,
                            specializing in Cyber Security, I am passionate about <span className="font-bold text-purple-400">web development</span>.
                            My programming journey started in college and has been continuously fueled by learning from online resources and social media.
                            I have gained proficiency in various programming languages such as <span className="font-bold text-blue-400">HTML, CSS, PHP, JavaScript</span>,
                            and frameworks like <span className="font-bold text-purple-400">Tailwind CSS, Next.js, React.js, and Bootstrap</span>.
                        </motion.p>

                        {/* Explore Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            className="pt-4"
                        >
                            <motion.button
                                onClick={() => scrollToSection("about")}
                                className="group relative px-8 py-4 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold shadow-xl hover:shadow-2xl"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    animate={{
                                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                    }}
                                />
                                <span className="relative flex items-center gap-2">
                                    Explore My Work
                                    <motion.span
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}
                                    >
                                        →
                                    </motion.span>
                                </span>
                            </motion.button>
                        </motion.div>

                        {/* Social Icons */}
                        <motion.div
                            className="flex gap-6 md:gap-8 justify-center lg:justify-start pt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            {socialLinks.map(({ Icon, url, delay, color }, index) => (
                                <motion.a
                                    key={index}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative"
                                    style={{ color }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay }}
                                >
                                    <motion.div
                                        className="absolute -inset-2 bg-white/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        whileHover={{ scale: 1.2 }}
                                    />
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 360 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                                    >
                                        <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                                    </motion.div>
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1 }}
                className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-16"
            />
        </div>
    );
};

export default HeroSection;