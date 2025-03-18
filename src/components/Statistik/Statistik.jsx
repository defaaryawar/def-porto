import React from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const useInView = () => {
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return { inView, ref };
};

const SkillCard = ({ label, logoPath }) => {
    return (
        <div className="group relative overflow-hidden flex flex-col items-center p-8 rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 hover:from-violet-900/30 hover:to-indigo-900/30 transition-all duration-500 hover:scale-105 backdrop-blur-md border border-slate-700/40 hover:border-violet-500/40 shadow-lg hover:shadow-violet-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center mb-6">
                <motion.img
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    src={logoPath}
                    alt={`${label} logo`}
                    className="w-full h-full object-contain filter drop-shadow-xl group-hover:drop-shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all duration-500"
                />
            </div>
            <span className="text-xl font-medium text-slate-200 text-center group-hover:text-violet-200 transition-colors duration-300">
                {label}
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
        </div>
    );
};

const SkillSection = ({ title, skills, variants, itemVariants }) => {
    const { inView, ref } = useInView();
    const numberOfSkills = skills.length;
    
    const getGridClass = () => {
        if (numberOfSkills <= 2) return "grid-cols-2 md:grid-cols-2 max-w-2xl";
        if (numberOfSkills <= 3) return "grid-cols-2 md:grid-cols-3 max-w-4xl";
        if (numberOfSkills <= 4) return "grid-cols-2 md:grid-cols-2 lg:grid-cols-4 max-w-5xl";
        return "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 max-w-7xl";
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-12 w-full px-4"
        >
            <div className="relative flex items-center justify-center mb-16">
                <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="absolute left-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full"
                />
                <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 px-8 py-3 backdrop-blur-md bg-slate-900/60 rounded-full border border-violet-500/30 relative z-10 shadow-lg"
                >
                    {title}
                </motion.h3>
            </div>
            
            <div className={`grid ${getGridClass()} gap-8 mx-auto`}>
                {skills.map((skill, index) => (
                    <motion.div 
                        key={skill.label} 
                        variants={itemVariants}
                        custom={index}
                        className="flex justify-center"
                    >
                        <SkillCard {...skill} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const Statistik = () => {
    const skillCategories = {
        frontend: [
            { label: "React.js", logoPath: "/images/logos/react.png" },
            { label: "Next.js", logoPath: "/images/logos/nextjs.png" },
            { label: "Vite", logoPath: "/images/logos/vite.png" },
            { label: "JavaScript", logoPath: "/images/logos/javascript.png" },
            { label: "HTML", logoPath: "/images/logos/html.png" },
            { label: "CSS", logoPath: "/images/logos/css.png" },
        ],
        backend: [
            { label: "NestJS", logoPath: "/images/logos/nestjs.png" },
            { label: "Node.js", logoPath: "/images/logos/nodejs.png" },
            { label: "Express", logoPath: "/images/logos/express.png" },
            { label: "PHP", logoPath: "/images/logos/php.png" },
        ],
        productivity: [
            { label: "MS Excel", logoPath: "/images/logos/excel.png" },
            { label: "MS Word", logoPath: "/images/logos/msword.png" },
            { label: "Canva", logoPath: "/images/logos/canva.png" },
            { label: "VS Code", logoPath: "/images/logos/vscode.png" },
        ]
    };

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.4,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                duration: 1,
                bounce: 0.4,
                delay: i * 0.1
            }
        })
    };

    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);

    return (
        <section className="min-h-screen flex flex-col items-center justify-center py-24 bg-transparent">
            <motion.div
                style={{ scale, opacity }}
                className="w-full max-w-7xl space-y-24"
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center space-y-6 px-4"
                >
                    <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
                        Technical Expertise
                    </h2>
                    <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
                        Exploring the intersection of design and development with cutting-edge tools and technologies
                    </p>
                </motion.div>

                <div className="space-y-24">
                    <SkillSection
                        title="Frontend Development"
                        skills={skillCategories.frontend}
                        variants={sectionVariants}
                        itemVariants={itemVariants}
                    />

                    <SkillSection
                        title="Backend Development"
                        skills={skillCategories.backend}
                        variants={sectionVariants}
                        itemVariants={itemVariants}
                    />

                    <SkillSection
                        title="Productivity Tools"
                        skills={skillCategories.productivity}
                        variants={sectionVariants}
                        itemVariants={itemVariants}
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Statistik;