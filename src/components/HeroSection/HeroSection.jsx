"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa"; // Import icon
import Typewriter from 'typewriter-effect'; // Import typewriter-effect library

const HeroSection = () => {
    return (
        <div className="hero min-h-screen px-16 bg-transparent w-full select-none">
            <div className="hero-content flex-col lg:flex-row gap-10">

                {/* Gambar dengan efek bulat dan animasi hover */}
                <motion.img
                    src="./images/profil.jpeg"
                    className="max-w-xs rounded-full shadow-2xl transition-transform duration-300 ease-in-out border-2 border-color-secondary"
                    initial={{ opacity: 0, x: -100 }} // Animasi masuk dari kiri
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    whileHover={{ scale: 1.1, duration: 0.3 }}
                />

                {/* Konten teks dengan animasi masuk */}
                <div className="mt-5 lg:mt-0 text-color-secondary">
                    <motion.h1
                        className="text-5xl font-bold select-none"
                        initial={{ opacity: 0, y: -100 }} // Animasi masuk dari atas
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {/* Typewriter effect */}
                        <Typewriter
                            onInit={(typewriter) => {
                                // Animasi mengetik dimulai setelah teks muncul dari atas
                                typewriter
                                    .pauseFor(1200) // Tunggu sedikit setelah muncul
                                    .typeString('Defano Arya Wardhana')
                                    .pauseFor(3000) // Pause setelah selesai mengetik
                                    .deleteAll(100) // Menghapus semua teks
                                    .typeString('Defano Arya Wardhana') // Mengetik ulang
                                    .pauseFor(3000) // Pause lagi setelah mengetik ulang
                                    .start(400);
                            }}
                            options={{
                                loop: true, // Membuat teks mengetik dan menghapus secara berulang
                                delay: 75, // Kecepatan pengetikan
                            }}
                        />
                    </motion.h1>

                    <motion.p
                        className="py-6 text-color-primary select-none"
                        initial={{ opacity: 0, x: 100 }} // Animasi masuk dari kanan
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        As a graduate in Computer Engineering from <span className="text-color-secondary font-mono fotn-bold">Budi Luhur University</span>, specializing in Cyber Security, I am passionate about<span className="text-color-secondary font-mono fotn-bold"> web development</span>. My programming journey started in college and has been continuously fueled by learning from online resources and social media. I have gained proficiency in various programming languages such as <span className="text-color-secondary font-mono fotn-bold">HTML, CSS, PHP, JavaScript, and frameworks like Tailwind CSS, Next.js, React.js, and Bootstrap.</span>

                        Driven by a relentless desire to learn and innovate, I am committed to continually sharpening my skills to become a trusted and proficient programmer capable of delivering the best solutions for every project I undertake.
                    </motion.p>

                    <motion.button
                        className="bg-transparent p-2 rounded-md border-2 border-color-secondary hover:scale-110 text-color-primary"
                        initial={{ opacity: 0, scale: 0.8 }} // Animasi masuk dengan scale
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        Learn More!
                    </motion.button>

                    {/* Ikon Sosial Media */}
                    <div className="mt-6 flex space-x-6 justify-start text-color-primary">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }} // Mulai dari bawah
                            animate={{ opacity: 1, y: 0 }} // Posisikan ke atas
                            transition={{ duration: 0.8, delay: 0.6 }} // Animasi halus
                            whileHover={{ scale: 1.3 }}
                        >
                            <a href="https://www.instagram.com/defaaryawar_13" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-3xl hover:text-color-secondary transition duration-300" />
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }} // Mulai dari bawah
                            animate={{ opacity: 1, y: 0 }} // Posisikan ke atas
                            transition={{ duration: 0.8, delay: 0.7 }} // Animasi halus
                            whileHover={{ scale: 1.3 }}
                        >
                            <a href="https://www.linkedin.com/in/defano-arya-wardhana-50ab11328/" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="text-3xl hover:text-color-secondary transition duration-300" />
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }} // Mulai dari bawah
                            animate={{ opacity: 1, y: 0 }} // Posisikan ke atas
                            transition={{ duration: 0.8, delay: 0.8 }} // Animasi halus
                            whileHover={{ scale: 1.3 }}
                        >
                            <a href="https://github.com/defaaryawar" target="_blank" rel="noopener noreferrer">
                                <FaGithub className="text-3xl hover:text-color-secondary transition duration-300" />
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }} // Mulai dari bawah
                            animate={{ opacity: 1, y: 0 }} // Posisikan ke atas
                            transition={{ duration: 0.8, delay: 0.9 }} // Animasi halus
                            whileHover={{ scale: 1.3 }}
                        >
                            <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
                                <FaWhatsapp className="text-3xl hover:text-color-secondary transition duration-300" />
                            </a>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;