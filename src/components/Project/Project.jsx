"use client"

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

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
      { threshold: 0.2 }
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

const ProjectCard = ({ project, index, inView, isMobile }) => {
  const imageLoadingRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (imageLoadingRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.2 }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="relative bg-slate-900/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-slate-800/50"
      whileHover={!isMobile ? { y: -5, transition: { duration: 0.2 } } : {}}
    >
      <div className="relative h-52 sm:h-64 overflow-hidden">
        <motion.img
          ref={imageLoadingRef}
          src={project.imageSrc}
          alt={project.imageAlt}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 ${!isMobile ? 'group-hover:scale-105' : ''
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
      </div>

      <div className="p-6 relative z-10">
        <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300 mb-3">
          {project.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 text-xs sm:text-sm bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30"
            >
              {tech}
            </span>
          ))}
        </div>

        <motion.div
          whileHover={!isMobile ? { scale: 1.02 } : {}}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block w-full px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg text-center font-medium transition-all duration-300 hover:shadow-lg"
          >
            View Project
          </a>
        </motion.div>
      </div>

      <div className={`absolute inset-0 pointer-events-none bg-gradient-to-r from-violet-600/5 to-indigo-600/5 opacity-0 transition-opacity duration-300 ${!isMobile ? 'group-hover:opacity-100' : ''
        }`} />
    </motion.div>
  );
};

const Project = () => {
  const isMobile = useIsMobile();
  const { inView, ref } = useInView();

  const callouts = [
    {
      imageSrc: './images/anime.jpeg',
      imageAlt: 'def-animelist.',
      href: 'https://def-anime.vercel.app/',
      title: 'Anime List',
      technologies: ['Next.js', 'Tailwind CSS', 'Daisy UI', 'JavaScript', 'API'],
    },
    {
      imageSrc: './images/deflix.jpeg',
      imageAlt: 'deflix.',
      href: 'https://deflix-three.vercel.app/',
      title: 'Deflix',
      technologies: ['NextJS', 'React', 'Tailwind CSS', 'API', 'NestJS', 'PostgreSQL', 'CSS'],
    },
    {
      imageSrc: './images/nion-coffee.png',
      imageAlt: 'Nion Coffee',
      href: 'https://nioncoffee.store/',
      title: 'Nion Coffee',
      technologies: ['Vite', 'React', 'Tailwind CSS', 'API', 'ExpressJS', 'PostgreSQL', 'CSS'],
    },
  ];

  // Calculate grid columns based on number of items
  const gridCols = callouts.length === 2 ?
    "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" :
    "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="min-h-screen py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1 }}
            className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent mb-8"
          />

          <h2 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 mb-3">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">Discover some of my recent work</p>
        </motion.div>

        <div
          ref={ref}
          className={`grid ${gridCols} gap-6 sm:gap-8`}
        >
          {callouts.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              inView={inView}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;