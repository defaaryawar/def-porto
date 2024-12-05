"use client"

import { motion } from "framer-motion";
import { useInView, skills } from "./StatistikLogika";

const Statistik = () => {
    const { inView, ref } = useInView();

    return (
        <section id="skill" className="flex flex-col items-center justify-center pb-20 select-none">
                <span className="flex items-center w-full pb-20">
                    <span className="h-px flex-1 bg-color-secondary"></span>
                </span>
            <h2 className="text-3xl font-bold text-color-primary mb-4">My Skills</h2>

            {/* Container for 3 columns of progress bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-full px-40" ref={ref}>
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        className="w-full px-4"  // Menambahkan padding kiri dan kanan untuk grid item
                        initial={{ opacity: 0, x: -100 }} // Animasi datang dari kiri
                        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -100 }}    // Menjadi penuh jika sudah terlihat
                        transition={{ duration: 0.8, delay: index * 0.2 }} // Delay berdasarkan indeks
                    >
                        <div className="flex justify-between mb-2">
                            <span className="text-color-primary">{skill.label}</span>
                            <span className="text-color-primary font-semibold">{skill.value}%</span>
                        </div>
                        <progress
                            className="progress w-full progress-bar" // Menambahkan kelas custom untuk progress
                            value={skill.value}
                            max="100"
                        ></progress>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Statistik;