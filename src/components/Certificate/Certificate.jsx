import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

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

const Certificate = () => {
    const [selectedCertificate, setSelectedCertificate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1.1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0.2, 1]);
    const itemsPerPage = 6;

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const certificates = [
        {
            id: 1,
            title: "Excel Basic",
            issuer: "MySkill",
            date: "October 2024",
            description: "Fundamentals of Microsoft Excel including formulas, functions, and basic data manipulation techniques.",
            image: "certificate/Certificiate_Excel_Basic.webp",
            pdf: "certificate/pdf/Certificiate_Excel_Basic.pdf",
            skills: ["Formulas", "Functions", "Data Entry", "Formatting"]
        },
        {
            id: 2,
            title: "Mahir Microsoft Excel",
            issuer: "FaszEdu",
            date: "October 2024",
            description: "Advanced Excel techniques including pivot tables, macros, and complex data analysis functions.",
            image: "certificate/certificate_mahir_microsoft_excel.webp",
            pdf: "certificate/pdf/certificate_mahir_microsoft excel.pdf",
            skills: ["Pivot Tables", "Macros", "Data Analysis", "Charts", "Dashboards"]
        },
        {
            id: 3,
            title: "Data Analysis",
            issuer: "MySkill",
            date: "November 2024",
            description: "Comprehensive training in data analysis methodologies, statistical analysis, and data visualization.",
            image: "certificate/Certificate_Data_Analyst_Fundamental.webp",
            pdf: "certificate/pdf/certificate_data_analyst.pdf",
            skills: ["Statistical Analysis", "Data Visualization", "Data Cleaning", "Reporting"]
        },
        {
            id: 4,
            title: "Data Analysis Fundamental",
            issuer: "MySkill",
            date: "October 2024",
            description: "Comprehensive training in data analysis methodologies, statistical analysis, and data visualization.",
            image: "certificate/Certificate_Data_Analyst_Fundamental.webp",
            pdf: "certificate/pdf/Certificate_Data_Analyst_Fundamental.pdf",
            skills: ["Statistical Analysis", "Data Visualization", "Data Cleaning", "Reporting"]
        },
        {
            id: 5,
            title: "Intro to Data Analysis",
            issuer: "RevoU",
            date: "October 2024",
            description: "Introduction to fundamental concepts in data analysis, including data collection, processing, and interpretation.",
            image: "certificate/certificate_intro_data_analyst_revou.webp",
            pdf: "certificate/pdf/certificate_intro_data_analyst_revou.pdf",
            skills: ["Data Collection", "Data Processing", "Basic Statistics", "Data Interpretation"]
        },
        {
            id: 6,
            title: "Frontend - HTML",
            issuer: "MySkill",
            date: "October 2024",
            description: "Comprehensive HTML training covering semantic markup, accessibility, and modern web development practices.",
            image: "certificate/Certificate_frontend_html.webp",
            pdf: "certificate/pdf/frontend-html.pdf",
            skills: ["Semantic HTML", "Accessibility", "Forms", "Responsive Design"]
        },
    ];

    const totalPages = Math.ceil(certificates.length / itemsPerPage);
    const currentCertificates = certificates.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDownload = (pdf, title) => {
        const link = document.createElement('a');
        link.href = pdf;
        link.download = `${title.replace(/\s+/g, '-').toLowerCase()}-certificate.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
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
                duration: 0.8,
                bounce: 0.3,
                delay: i * 0.1
            }
        })
    };

    const { inView, ref } = useInView();

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <section className="py-16 md:px-10 px-4 relative overflow-hidden">

            
            <motion.div
                style={{ scale, opacity }}
                className="w-full max-w-7xl mx-auto relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center space-y-4 px-4 mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
                        Professional Certifications
                    </h2>
                    <p className="text-slate-300 text-lg max-w-3xl mx-auto">
                        Achievements that showcase my dedication to continuous learning
                    </p>
                </motion.div>

                <motion.div
                    ref={ref}
                    variants={sectionVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    className="relative"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                        {currentCertificates.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                variants={itemVariants}
                                custom={index}
                                onClick={() => setSelectedCertificate(cert)}
                                className="group relative overflow-hidden rounded-xl cursor-pointer bg-slate-800 border border-slate-700 shadow-lg hover:shadow-violet-600/20 transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                                {/* Certificate Image */}
                                <div className="relative aspect-video overflow-hidden bg-slate-200">
                                    <motion.div
                                        className="w-full h-full p-2"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="w-full h-full rounded-lg overflow-hidden border border-slate-300 shadow-md">
                                            <img
                                                src={cert.image}
                                                alt={cert.title}
                                                className="w-full h-full object-cover" />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Card Content */}
                                <div className="p-4 bg-slate-800">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors duration-300">
                                            {cert.title}
                                        </h3>
                                    </div>
                                    <p className="text-slate-300 text-sm mb-2">
                                        {cert.issuer} • {cert.date}
                                    </p>

                                    {/* Skill tags - limited to just 2 for better spacing */}
                                    <div className="flex flex-wrap gap-1 mb-1">
                                        {cert.skills.slice(0, 2).map((skill, i) => (
                                            <span key={i} className="px-2 py-0.5 bg-violet-900/40 rounded-full text-xs text-violet-200 border border-violet-500/30">
                                                {skill}
                                            </span>
                                        ))}
                                        {cert.skills.length > 2 && (
                                            <span className="px-2 py-0.5 bg-violet-900/40 rounded-full text-xs text-violet-200 border border-violet-500/30">
                                                +{cert.skills.length - 2}
                                            </span>
                                        )}
                                    </div>

                                    {/* Hover description overlay for desktop */}
                                    <motion.div
                                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 to-slate-900/90 backdrop-blur-sm z-20 p-4 flex flex-col justify-end"
                                        initial={{ height: "0%", opacity: 0 }}
                                        whileHover={{ height: "70%", opacity: 1 }}
                                        animate={isMobile ? { height: "70%", opacity: 1 } : { height: "0%", opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <h4 className="text-lg font-bold text-violet-300 mb-2">{cert.title}</h4>
                                        <p className="text-white text-sm mb-3">{cert.description}</p>
                                        <div className="flex flex-wrap gap-1 mb-3">
                                            {cert.skills.map((skill, i) => (
                                                <span key={i} className="px-2 py-0.5 bg-violet-900/50 rounded-full text-xs text-violet-200 border border-violet-500/30">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <button
                                                className="text-sm text-violet-300 hover:text-violet-100 flex items-center transition"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDownload(cert.pdf, cert.title);
                                                } }
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Download
                                            </button>
                                            <span className="text-sm text-violet-300 hover:text-violet-100 transition flex items-center">
                                                View Details
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </motion.div></div>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 1.5, delay: index * 0.2 }}
                                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-4 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-full ${currentPage === 1 ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-violet-600 text-white hover:bg-violet-500'} transition-colors duration-300`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </motion.button>
                            
                            <div className="text-slate-300">
                                Page {currentPage} of {totalPages}
                            </div>
                            
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-full ${currentPage === totalPages ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-violet-600 text-white hover:bg-violet-500'} transition-colors duration-300`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                        </div>
                    )}
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {selectedCertificate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        onClick={() => setSelectedCertificate(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.3 }}
                            className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sticky top-0 z-10 bg-gradient-to-r from-slate-800 to-slate-900 p-4 flex justify-between items-center border-b border-slate-700/50">
                                <h3 className="text-xl font-bold text-white">
                                    {selectedCertificate.title}
                                </h3>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="bg-slate-700 text-white p-2 rounded-full hover:bg-violet-600 transition-colors duration-300"
                                    onClick={() => setSelectedCertificate(null)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </motion.button>
                            </div>
                            
                            <div className="p-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-slate-200 rounded-lg p-3 shadow-lg border border-slate-300">
                                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                                            <img
                                                src={selectedCertificate.image}
                                                alt={`${selectedCertificate.title} Certificate`}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <div className="mb-4">
                                            <p className="text-slate-300 mb-2">
                                                <span className="text-violet-400">Issuer:</span> {selectedCertificate.issuer}
                                            </p>
                                            <p className="text-slate-300">
                                                <span className="text-violet-400">Date Acquired:</span> {selectedCertificate.date}
                                            </p>
                                        </div>
                                        
                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                                            <p className="text-slate-300 leading-relaxed bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                                                {selectedCertificate.description}
                                            </p>
                                        </div>
                                        
                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-white mb-2">Skills Acquired</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedCertificate.skills.map((skill, i) => (
                                                    <span key={i} className="px-3 py-1 bg-violet-900/40 rounded-full text-sm text-violet-200 border border-violet-500/30">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="mt-auto">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 shadow-lg hover:shadow-violet-500/30 flex items-center justify-center"
                                                onClick={() => handleDownload(selectedCertificate.pdf, selectedCertificate.title)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                Download Certificate
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificate;