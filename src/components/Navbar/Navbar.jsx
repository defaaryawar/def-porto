"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const menuItems = [
        { href: "#hero", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#skill", label: "Skills" },
        { href: "#project", label: "Project" },
        { href: "#footer", label: "Contact" },
    ];

    // Framer Motion variants
    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? "bg-slate-900/95 backdrop-blur-md shadow-lg"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center space-x-2"
                    >
                        <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            Portofolio
                            <span className="text-indigo-400">.</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`text-sm font-medium transition-colors duration-200
                                    ${activeSection === item.href.slice(1)
                                        ? "text-indigo-400"
                                        : "text-slate-200 hover:text-indigo-400"
                                    }`}
                                onClick={() => {
                                    setActiveSection(item.href.slice(1));
                                    closeMenu();
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="relative w-10 h-10 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <span
                                    className={`block w-6 h-0.5 bg-slate-200 transition-all duration-300 mb-1.5
                                        ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
                                />
                                <span
                                    className={`block w-6 h-0.5 bg-slate-200 transition-all duration-300
                                        ${isMenuOpen ? "opacity-0" : ""}`}
                                />
                                <span
                                    className={`block w-6 h-0.5 bg-slate-200 transition-all duration-300 mt-1.5
                                        ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={mobileMenuVariants}
                        className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            {menuItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200
                                            ${activeSection === item.href.slice(1)
                                                ? "bg-indigo-400/10 text-indigo-400"
                                                : "text-slate-200 active:bg-slate-800 md:hover:text-indigo-400"
                                            }`}
                                        onClick={() => {
                                            setActiveSection(item.href.slice(1));
                                            closeMenu();
                                        }}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;