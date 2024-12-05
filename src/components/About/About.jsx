"use client";

import { motion } from "framer-motion";
import { useInView } from "./AboutLogika"; // Import hook custom

const About = () => {
    const { inView, sectionRef } = useInView(); // Menggunakan hook

    return (
        <section className="bg-color-primary text-gray-800 pb-36" ref={sectionRef}>
            <div className="pb-20">
                <span className="flex items-center w-full">
                    <span className="h-px flex-1 bg-color-secondary"></span>
                </span>
            </div>
            <div className="max-w-7xl mx-auto text-center">
                <motion.h2
                    className="text-5xl font-extrabold mb-12 text-color-secondary select-none"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -100 }}
                    transition={{ duration: 1 }}
                >
                    Who Am I?
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Gambar Profil dengan Animasi */}
                    <motion.div
                        className="w-full flex justify-center items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
                        transition={{ duration: 1 }}
                    >
                        <div className="w-64 h-64 rounded-full flex items-center select-none justify-center shadow-xl border-8 border-color-secondary overflow-hidden">
                            {/* Gambar Profil */}
                            <img
                                src="./images/profil.jpeg"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Deskripsi Diri */}
                    <motion.div
                        className="w-full flex flex-col justify-center text-left"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 100 }}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-lg leading-relaxed text-gray-800 mb-6 font-bold select-none">
                            Hello, I'm a passionate <span className="text-color-secondary">Web Developer</span> with a focus on creating modern, interactive, and user-friendly websites. I specialize in front-end technologies like<span className="text-color-secondary font-bold"> React.js, Next.js, and Tailwind CSS</span>.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-800 mb-6 font-bold select-none">
                            I have a love for coding and a strong desire to always learn and grow as a <span className="text-color-secondary font-bold">developer</span>. I am also very interested in <span className="text-color-secondary font-bold">UX/UI</span> design and strive to make the web a more accessible and enjoyable place for everyone.
                        </p>
                        <p className="text-lg leading-relaxed text-gray-800 mb-6 font-bold select-none">
                            When I’m not <span className="text-color-secondary font-bold">coding</span>, I enjoy photography, exploring new tech trends, and contributing to open-source projects. I am always looking for new <span className="text-color-secondary font-bold">opportunities</span> to collaborate and learn from others.
                        </p>

                        <motion.a
                            href="#contact"
                            className="inline-block bg-transparent border-2 border-color-secondary text-color-secondary py-3 px-8 rounded-full mt-8 hover:bg-color-secondary hover:text-color-primary transition-all duration-300 font-bold"
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 100 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            Contact Me!
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;