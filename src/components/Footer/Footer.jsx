"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaFacebook, FaLinkedin, FaGithub, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const Footer = () => {
  const [inView, setInView] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true); // Set to true when footer is in view
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
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

  return (
    <div className="py-4">
      <footer
        ref={footerRef}
        className="footer footer-center bg-transparent text-base-content rounded p-10"
      >
        {/* Navigasi dengan animasi masuk hanya saat halaman terlihat */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-flow-col gap-4 text-color-secondary select-none"
        >
          <a className="link link-hover" href="#about">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </motion.nav>

        {/* Ikon Sosial Media dengan animasi hover */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-flow-col gap-4">
            {/* Twitter Icon */}
            <motion.a
              href="https://www.instagram.com/defaaryawar_13" // Ganti dengan URL profil Twittermu
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, duration: 0.8 }}
            >
              <FaInstagram size={24} className="text-color-secondary" />
            </motion.a>
            {/* Facebook Icon */}
            <motion.a
              href="https://wa.me/6281219147116?text=Halo%2C%20saya%20tertarik%20untuk%20tau%20lebih%20lanjut%20tentang%20Anda." // Ganti dengan URL profil Facebookmu
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, duration: 0.8 }}
            >
              <FaWhatsapp size={24} className="text-color-secondary" />
            </motion.a>
            {/* LinkedIn Icon */}
            <motion.a
              href="https://www.linkedin.com/in/defano-arya-wardhana-50ab11328/" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, duration: 0.8 }}
            >
              <FaLinkedin size={24} className="text-color-secondary" />
            </motion.a>
            {/* GitHub Icon */}
            <motion.a
              href="https://github.com/defaaryawar"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, duration: 0.8 }}
            >
              <FaGithub size={24} className="text-color-secondary" />
            </motion.a>
          </div>
        </motion.nav>

        {/* Footer Copyright */}
        <aside>
          <p className="text-color-primary font-bold select-none">
            Copyright © {new Date().getFullYear()} - All right reserved by Defaaryawar
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
