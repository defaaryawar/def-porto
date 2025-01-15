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
      { threshold: 0.2 }
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
      showToastMessage(`Couldn't open ${platform}. Please check your pop-up blocker settings.`);
    }
  };

  const socialLinks = [
    {
      icon: FaInstagram,
      href: 'https://www.instagram.com/defaaryawar_13',
      color: '#E4405F',
      platform: 'Instagram'
    },
    {
      icon: FaWhatsapp,
      href: '#',
      color: '#25D366',
      platform: 'whatsapp'
    },
    {
      icon: FaLinkedin,
      href: 'https://www.linkedin.com/in/defano-arya-wardhana-50ab11328/',
      color: '#0A66C2',
      platform: 'LinkedIn'
    },
    {
      icon: FaGithub,
      href: 'https://github.com/defaaryawar',
      color: '#333',
      platform: 'GitHub'
    }
  ];

  return (
    <footer ref={footerRef} className="relative py-8 sm:py-12">
      {/* Toast Notification */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: showToast ? 1 : 0, y: showToast ? 0 : -20 }}
        className="fixed top-4 right-4 z-50 bg-slate-800 text-white px-6 py-3 rounded-lg shadow-lg"
      >
        {toastMessage}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent mb-8"
        />

        <div className="flex flex-col items-center space-y-8">
          {/* Navigation Links */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-8"
          >
            <a href="#about" className="text-slate-400 hover:text-violet-400 transition-colors duration-300">
              About
            </a>
            <a href="#skill" className="text-slate-400 hover:text-violet-400 transition-colors duration-300">
              Skills
            </a>
            <a href="#project" className="text-slate-400 hover:text-violet-400 transition-colors duration-300">
              Projects
            </a>
            <a href="#contact" className="text-slate-400 hover:text-violet-400 transition-colors duration-300">
              Contact
            </a>
          </motion.nav>

          {/* Social Media Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-6 sm:gap-8"
          >
            {socialLinks.map(({ icon: Icon, href, color, platform }) => (
              <motion.button
                key={platform}
                onClick={handleSocialClick(platform, href)}
                className="group relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute -inset-2 bg-white/10 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.2 }}
                />
                <Icon 
                  size={24} 
                  className="relative z-10 transition-transform duration-300"
                  style={{ color }}
                />
              </motion.button>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-slate-400 font-medium">
              Copyright © {new Date().getFullYear()} - All rights reserved by{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                Defaaryawar
              </span>
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent mt-8"
        />
      </div>
    </footer>
  );
};

export default Footer;