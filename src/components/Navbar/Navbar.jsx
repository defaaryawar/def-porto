"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Mengatur status menu
    const closeMenu = () => setIsMenuOpen(false); // Menutup menu setelah klik item

    return (
        <>
            {/* Navbar dengan efek sticky */}
            <div className="sticky top-0 z-50 navbar bg-gray-800 bg-opacity-80 md:px-10 p-6 max-w-screen-4xl mx-auto flex flex-row items-center justify-between select-none">
                <div className="flex items-center justify-between w-full">
                    {/* Logo atau Nama */}
                    <Link
                        href="/"
                        className="cursor-pointer text-3xl font-bold text-color-secondary md:justify-start justify-center sm:text-sm md:text-xl lg:text-2xl"
                    >
                        Portofolio.
                    </Link>

                    {/* Tombol hamburger hanya muncul di mobile */}
                    <div className="md:hidden items-center">
                        <button
                            className="bg-transparent border-none text-white p-0 hover:bg-transparent"
                            onClick={toggleMenu}
                        >
                            {/* Hamburger icon */}
                            <div
                                className={`w-8 h-1 bg-white my-2 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}
                            />
                            <div
                                className={`w-8 h-1 bg-white my-2 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
                            />
                            <div
                                className={`w-8 h-1 bg-white my-2 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
                            />
                        </button>
                    </div>
                </div>

                {/* Menu Navigasi */}
                <div className={`lg:flex md:flex-row ${isMenuOpen ? 'absolute top-full right-0 bg-gray-800/80 w-full p-5 transition-transform transform ease-in-out duration-300' : 'hidden md:flex'}`}>
                    <ul className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-5 lg:gap-8 cursor-pointer py-2 lg:px-0 justify-start font-medium text-color-primary md:px-11 sm:text-lg md:text-sm lg:text-sm text-lg">
                        {/* Home */}
                        <li className="hover:text-color-secondary">
                            <Link href="#hero" className="navbar-link" onClick={closeMenu}>Home</Link>
                        </li>
                        {/* About */}
                        <li className="hover:text-color-secondary">
                            <Link href="#about" className="navbar-link" onClick={closeMenu}>About</Link>
                        </li>
                        {/* Skills */}
                        <li className="hover:text-color-secondary">
                            <Link href="#skill" className="navbar-link" onClick={closeMenu}>Skills</Link>
                        </li>
                        {/* Project */}
                        <li className="hover:text-color-secondary">
                            <Link href="#project" className="navbar-link" onClick={closeMenu}>Project</Link>
                        </li>
                        {/* Contact */}
                        <li className="hover:text-color-secondary">
                            <Link href="#footer" className="navbar-link" onClick={closeMenu}>Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
