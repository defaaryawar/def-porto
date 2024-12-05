"use client"

import { useState, useEffect, useRef } from "react";

const useInView = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true); // Set to true when element is visible
        }
      },
      { threshold: 0.5 }
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

const skills = [
  { label: "HTML", value: 90 },
  { label: "CSS", value: 85 },
  { label: "JavaScript", value: 80 },
  { label: "PHP", value: 70 },
  { label: "React.js", value: 95 },
  { label: "Next.js", value: 90 },
  { label: "MS Office", value: 75 },
  { label: "Canva", value: 80 },
  { label: "MS Word", value: 85 }
];

export { useInView, skills };
