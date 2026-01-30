"use client";

import { useState } from "react";
import { LogIn, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const imgLogo =
  "https://www.figma.com/api/mcp/asset/1be565c6-7ea0-4650-8f56-ca2f051ecab4";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Admissions", href: "/admissions" },
  { name: "Academics", href: "/academics" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function AboutNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative h-8 w-24 shrink-0 sm:h-9 sm:w-28 md:h-10 md:w-32 lg:h-11 lg:w-36"
        >
          <Image
            alt="Foursquare International Secondary School logo"
            src={imgLogo}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, (max-width: 1024px) 128px, 145px"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="font-suisse hidden items-center gap-6 text-sm text-white lg:flex xl:gap-8 xl:text-base">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-white/80 ${
                  isActive
                    ? "font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-white"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Apply Now Button */}
          <Link
            href="/admissions"
            className="font-poppins hidden h-9 items-center gap-1.5 rounded-lg bg-[#C41E3A] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#a31830] sm:flex sm:h-10 sm:gap-2 sm:px-4 sm:text-sm md:h-11 md:rounded-xl md:px-5"
          >
            <span>Apply Now</span>
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-md bg-white/20 sm:h-6 sm:w-6">
              <svg
                className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </Link>

          {/* Portal Login */}
          <button className="font-poppins hidden h-9 items-center gap-1.5 rounded-lg bg-[#324e69] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#3d5d7d] sm:flex sm:h-10 sm:gap-2 sm:px-4 sm:text-sm md:h-11 md:rounded-xl md:px-5">
            <span>Portal Login</span>
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-md bg-[rgba(4,16,28,0.3)] sm:h-6 sm:w-6">
              <LogIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm sm:h-10 sm:w-10 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl bg-[#0a1628]/95 p-4 shadow-lg backdrop-blur-sm lg:hidden">
          <nav className="font-suisse flex flex-col gap-1 text-base text-white">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`rounded-lg px-4 py-3 transition-colors hover:bg-white/10 ${
                    isActive ? "bg-white/10 font-semibold" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            {/* Mobile Buttons */}
            <div className="mt-3 flex flex-col gap-2 sm:hidden">
              <Link
                href="/admissions"
                className="font-poppins flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#C41E3A] text-sm font-semibold text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Apply Now
              </Link>
              <button className="font-poppins flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#324e69] text-sm font-semibold text-white">
                Portal Login
                <LogIn className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
