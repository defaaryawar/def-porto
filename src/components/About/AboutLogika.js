import { useState, useEffect, useRef } from "react";

// Custom hook untuk menangani IntersectionObserver
export const useInView = () => {
    const [inView, setInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true); // Animasi dimulai hanya ketika elemen terlihat
                }
            },
            { threshold: 0.2 } // Atur threshold agar animasi terjadi saat 20% elemen terlihat
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return { inView, sectionRef };
};