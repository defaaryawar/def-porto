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

// Laptop frame component
const LaptopFrame = ({ children }) => {
  return (
    <div className="laptop-frame relative mx-auto w-full max-w-md">
      <div className="laptop-top bg-gray-800 rounded-t-xl pt-2 px-2">
        <div className="laptop-screen bg-slate-900 rounded-t-lg overflow-hidden">
          {children}
        </div>
      </div>
      <div className="laptop-bottom bg-gray-800 h-3 rounded-b-xl relative">
        <div className="laptop-touchpad absolute left-1/2 transform -translate-x-1/2 w-10 h-1 bg-gray-700 rounded-full -top-1"></div>
      </div>
    </div>
  );
};

// Particles background effect
const ParticlesBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 30;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        color: `rgba(${Math.floor(Math.random() * 100 + 150)}, ${Math.floor(Math.random() * 100 + 150)}, 255, ${Math.random() * 0.5 + 0.1})`,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25
      });
    }
    
    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

const ProjectCard = ({ project, index, inView, isMobile }) => {
  const imageLoadingRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      className="relative bg-slate-900/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-slate-800/50 group"
      whileHover={!isMobile ? { y: -5, transition: { duration: 0.2 } } : {}}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <LaptopFrame>
          <div className="relative h-52 sm:h-64 overflow-hidden">
            <motion.img
              ref={imageLoadingRef}
              src={project.imageSrc}
              alt={project.imageAlt}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 ${
                !isMobile ? 'group-hover:scale-105' : ''
              } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              animate={{
                scale: isHovered ? 1.05 : 1,
                transition: { duration: 0.5 }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent" />
          </div>
        </LaptopFrame>
      </div>

      <div className="p-6 relative z-10">
        <motion.h3 
          className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-300 mb-3"
          animate={{
            x: isHovered ? 5 : 0,
            transition: { duration: 0.3 }
          }}
        >
          {project.title}
        </motion.h3>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              className="px-3 py-1 text-xs sm:text-sm bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: inView ? 1 : 0, 
                y: inView ? 0 : 20,
                transition: { duration: 0.3, delay: 0.1 * techIndex + 0.3 }
              }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(99, 102, 241, 0.3)",
                transition: { duration: 0.2 } 
              }}
            >
              {tech}
            </motion.span>
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

      <motion.div 
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-violet-600/5 to-indigo-600/5"
        animate={{
          opacity: isHovered ? 0.2 : 0,
          transition: { duration: 0.3 }
        }}
      />
      
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 opacity-0 blur-xl"
        animate={{
          opacity: isHovered ? 0.15 : 0,
          scale: isHovered ? 1.05 : 1,
          transition: { duration: 0.5 }
        }}
      />
    </motion.div>
  );
};

const Project = () => {
  const isMobile = useIsMobile();
  const { inView, ref } = useInView();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    {
      imageSrc: './images/jaya-mandiri.png',
      imageAlt: 'Jaya Mandiri',
      href: 'https://jaya-mandiri.vercel.app/', 
      title: 'Jaya Mandiri',
      technologies: ['Vite', 'React', 'Tailwind CSS', 'CSS'],
    },
  ];

  // Calculate grid columns based on number of items
  const gridCols = callouts.length === 2 ?
    "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" :
    "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="min-h-screen py-12 sm:py-20 relative overflow-hidden">
      {/* Particles background */}
      <ParticlesBackground />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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
          
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 mb-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          
          <motion.p 
            className="text-slate-400 text-base sm:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover some of my recent work
          </motion.p>
          
          {/* 3D rotating cube decoration */}
          <motion.div 
            className="absolute right-8 top-0 w-16 h-16 md:w-24 md:h-24 opacity-30"
            animate={{ 
              rotateY: [0, 360],
              rotateX: [0, 360],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear" 
            }}
            style={{ 
              transformStyle: "preserve-3d", 
              transform: "translateZ(0)" 
            }}
          >
            <div className="absolute inset-0 border-2 border-indigo-500 transform rotateX(0) rotateY(0)" />
            <div className="absolute inset-0 border-2 border-violet-500 transform rotateX(90deg) rotateY(0)" />
            <div className="absolute inset-0 border-2 border-indigo-500 transform rotateX(0) rotateY(90deg)" />
          </motion.div>
        </motion.div>

        <motion.div
          ref={ref}
          className={`grid ${gridCols} gap-6 sm:gap-8`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
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
        </motion.div>
        
        {/* Floating elements decoration */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute left-0 bottom-20 w-12 h-12 opacity-20 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 blur-md"
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div
              className="absolute right-20 bottom-40 w-8 h-8 opacity-20 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 blur-md"
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1 
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Project;