"use client";

import { useState, useEffect, ReactNode } from "react";

interface FloatingNavWrapperProps {
  children: ReactNode;
  initialBg: string; 
}

export default function FloatingNavWrapper({ children, initialBg }: FloatingNavWrapperProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 px-4 py-1 transition-all duration-300 sm:px-6 md:px-8 md:py-4 ${
        isScrolled
          ? "bg-transparent"
          : `${initialBg}`
      }`}
    >
      <div className="mx-auto max-w-7xl relative">
        {children}
      </div>
    </div>
  );
}
