"use client"; // Menandakan komponen untuk dijalankan di sisi klien

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const callouts = [
  {
    imageSrc: './images/web-anime.jpeg',
    imageAlt: 'def-animelist.',
    href: 'https://def-anime.vercel.app/',
    technologies: ['Next.js', 'Tailwind CSS', 'Daisy UI', 'JavaScript', 'API'],
  },
  {
    imageSrc: './images/public/images/deflix.jpeg',
    imageAlt: 'deflix.',
    href: 'https://deflix-three.vercel.app/',
    technologies: ['NextJS', 'react' , 'Node.js', 'Tailwind CSS', 'API', 'NestJS', 'Postgresql', 'CSS'],
  },
];

// Custom hook untuk mendeteksi apakah elemen berada di tampilan (in view)
const useInView = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true); // Menandakan bahwa elemen sudah terlihat
        }
      },
      { threshold: 0.5 } // Mengatur threshold agar animasi mulai ketika 50% elemen terlihat
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

export default function Project() {
  return (
    <div className="bg-gray-100 py-16 justify-center items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:py-24 lg:max-w-none lg:py-4">
          <h2 className="text-3xl text-color-secondary mb-10 text-center select-none font-bold">My Projects</h2>

          {/* Grid untuk menata kartu */}
          <div className="mt-4 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0 justify-center items-center px-10 md:px-0">
            {callouts.map((callout) => {
              const { inView, ref } = useInView(); // Ambil status inView untuk setiap card

              return (
                <motion.div
                  key={callout.imageSrc}
                  ref={ref}
                  className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mx-auto" // Menambahkan mx-auto untuk menempatkan di tengah
                  initial={{ opacity: 0, y: 50 }} // Mulai card dari posisi bawah
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }} // Animasi saat card muncul
                  transition={{ duration: 1, delay: 0.3 }} // Durasi 1 detik dengan delay 0.3 detik
                  whileHover={{ scale: 1.05 }} // Efek saat di-hover
                  whileTap={{ scale: 0.95 }} // Efek saat ditekan
                >
                  {/* Gambar Card */}
                  <motion.img
                    alt={callout.imageAlt}
                    src={callout.imageSrc}
                    className="w-full h-full rounded-lg object-cover group-hover:opacity-75 transition-opacity duration-300" // Mengubah tinggi gambar supaya memenuhi card
                  />
                  
                  {/* Overlay saat di-hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 select-none rounded-lg">
                    <div className="text-center text-white px-6 py-4">
                      <p className="text-lg font-semibold text-color-secondary">This project is built with:</p>
                      {/* Menampilkan teknologi proyek */}
                      <div className="flex text-sm mt-2">
                        {callout.technologies.map((tech, index) => (
                          <p key={index}>{tech}, </p>
                        ))}
                      </div>
                      <a
                        href={callout.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-white bg-color-secondary px-6 py-2 rounded-full text-sm font-semibold hover:bg-color-primary hover:text-color-secondary transition-all duration-300 select-none"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
