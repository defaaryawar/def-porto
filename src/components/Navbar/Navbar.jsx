"use client";

import Link from "next/link";  // Import Link dari Next.js

const Navbar = () => {
    return (
        <>
            {/* Navbar dengan efek sticky */}
            <div className="sticky top-0 z-50 navbar bg-gray-800 bg-opacity-70 md:px-20 p-5 max-w-screen-4xl mx-auto md:flex-row flex-col select-none">
                <div className="flex items-center md:justify-between justify-center w-full">
                    {/* Logo atau Nama */}
                    <Link 
                        href="/" 
                        className="cursor-pointer text-xl font-bold text-color-secondary md:justify-start justify-center sm:text-sm md:text-xl lg:text-2xl"
                    >
                        Portofolio.
                    </Link>
                </div>

                {/* Menu Navigasi */}
                <div className="lg:flex">
                    <ul className="flex flex-row sm:flex-row md:flex-row lg:flex-row gap-5 lg:gap-8 cursor-pointer px-1 py-2 lg:px-0 items-center justify-center font-medium text-color-primary md:px-11 sm:text-xs md:text-xs lg:text-sm text-sm">
                        {/* Home */}
                        <li className="hover:text-color-secondary">
                            <Link href='#hero' className="navbar-link">Home</Link>
                        </li>
                        {/* About */}
                        <li className="hover:text-color-secondary">
                            <Link href="#about" className="navbar-link">About</Link>
                        </li>
                        {/* Skills */}
                        <li className="hover:text-color-secondary">
                            <Link href="#skill" className="navbar-link">Skills</Link>
                        </li>
                        {/* Portfolio */}
                        <li className="hover:text-color-secondary">
                            <Link href="#project" className="navbar-link">Project</Link>
                            {/* Contact */}
                        </li>
                        <li className="hover:text-color-secondary">
                            <Link href="#footer" className="navbar-link">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;