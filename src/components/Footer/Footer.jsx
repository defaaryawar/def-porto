"use client"

import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const Footer = () => {
  const [inView, setInView] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }  // Ubah ke 0.1 untuk memicu animasi lebih awal
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  // Handle social media clicks with error handling
  const handleSocialClick = (platform, url) => (e) => {
    e.preventDefault();
    
    // Function to show toast message
    const showToastMessage = (msg) => {
      setToastMessage(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    };

    // Encode the WhatsApp message properly
    if (platform === 'whatsapp') {
      const encodedMessage = encodeURIComponent('Halo, saya tertarik untuk tau lebih lanjut tentang Anda.');
      url = `https://wa.me/6281219147116?text=${encodedMessage}`;
    }

    try {
      // Always try to open in a new tab first
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      // If that fails, show an error message
      showToastMessage(`Tidak dapat membuka ${platform}. Periksa pengaturan pop-up blocker Anda.`);
    }
  };

  const socialLinks = [
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/defaaryawar_13',
      color: '#E4405F',
      platform: 'Instagram',
      label: 'Instagram'
    },
    {
      icon: FaWhatsapp,
      href: '#',
      color: '#25D366',
      platform: 'whatsapp',
      label: 'WhatsApp'
    },
    {
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/defano-arya-wardhana-50ab11328/',
      color: '#0A66C2',
      platform: 'LinkedIn',
      label: 'LinkedIn'
    },
    {
      icon: FaGithub,
      href: 'https://github.com/defaaryawar',
      color: '#333',
      platform: 'GitHub',
      label: 'GitHub'
    }
  ];

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skill" },
    { name: "Projects", href: "#project" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <footer ref={footerRef} className="relative py-12 sm:py-16 bg-slate-900/30 backdrop-blur-md">
      {/* Toast Notification - Lebih responsif dan terlihat */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showToast ? 1 : 0, y: showToast ? 0 : -20 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg"
      >
        {toastMessage}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Gradient Line with improved animation */}
        <motion.div
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: "100%", opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent mb-10"
        />

        <div className="flex flex-col items-center space-y-10">
          {/* Navigation Links with improved animation and hover effects */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="flex flex-wrap justify-center gap-4 sm:gap-8"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <a 
                  href={link.href} 
                  className="relative text-slate-400 hover:text-violet-400 text-base sm:text-lg transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </motion.div>
            ))}
          </motion.nav>

          {/* Social Media Icons with improved animations and tooltips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex gap-6 sm:gap-10"
          >
            {socialLinks.map(({ icon: Icon, href, color, platform, label }, index) => (
              <motion.button
                key={platform}
                onClick={handleSocialClick(platform, href)}
                className="group relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: inView ? 1 : 0, 
                  scale: inView ? 1 : 0.8,
                  transition: { delay: 0.4 + (index * 0.1) }
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Buka ${label}`}
              >
                {/* Animated glow effect */}
                <motion.div
                  className="absolute -inset-3 rounded-full bg-gradient-to-r from-violet-500/20 to-indigo-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.3 }}
                />
                
                {/* Icon with custom colors */}
                <Icon 
                  size={28} 
                  className="relative z-10 transition-transform duration-300"
                  style={{ color }}
                />
                
                {/* Tooltip */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs text-slate-400 whitespace-nowrap pointer-events-none">
                  {label}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Copyright with improved animation and styling */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-slate-400 font-medium text-sm sm:text-base">
              Copyright © {new Date().getFullYear()} - All rights reserved by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 font-semibold">
                Defaaryawar
              </span>
            </p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: inView ? 0.7 : 0, y: inView ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-2 text-slate-500 text-xs sm:text-sm"
            >
              Made with passion and creativity
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Gradient Line with improved animation */}
        <motion.div
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: "100%", opacity: inView ? 1 : 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent mt-10"
        />
      </div>
    </footer>
  );
};

export default Footer;