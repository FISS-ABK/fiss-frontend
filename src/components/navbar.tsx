"use client";

import { useState } from "react";
import { LogIn, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const imgLogo = "https://www.figma.com/api/mcp/asset/1be565c6-7ea0-4650-8f56-ca2f051ecab4";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Admissions", href: "/admissions" },
  { name: "Academics", href: "/academics" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative">
      <div className="flex items-center justify-between rounded-xl bg-[#faf9f6] px-3 py-2.5 shadow-sm sm:px-4 sm:py-3 md:px-6 md:py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative h-8 w-24 shrink-0 sm:h-9 sm:w-28 md:h-10 md:w-32 lg:h-11 lg:w-36">
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
        <nav className="font-suisse hidden items-center gap-6 text-sm text-[#0b2c4d] lg:flex xl:gap-8 xl:text-base">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-[#324e69] ${
                  isActive
                    ? "font-semibold text-[#324e69] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#324e69]"
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
          {/* Portal Login - Hidden on very small screens, shown on sm+ */}
          <button className="font-poppins hidden h-9 items-center gap-1.5 rounded-lg bg-[#324e69] px-3 text-xs font-semibold text-white sm:flex sm:h-10 sm:gap-2 sm:px-4 sm:text-sm md:h-11 md:rounded-xl md:px-5">
            <span>Portal Login</span>
            <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-md bg-[rgba(4,16,28,0.3)] sm:h-6 sm:w-6">
              <LogIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#324e69] sm:h-10 sm:w-10 lg:hidden"
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
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl bg-[#faf9f6] p-4 shadow-lg lg:hidden">
          <nav className="font-suisse flex flex-col gap-1 text-base text-[#0b2c4d]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`rounded-lg px-4 py-3 transition-colors hover:bg-[#edf5f5] ${
                    isActive
                      ? "bg-[#edf5f5] font-semibold text-[#324e69]"
                      : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              );
            })}
            {/* Mobile Portal Login Button */}
            <button className="font-poppins mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#324e69] text-sm font-semibold text-white sm:hidden">
              Portal Login
              <LogIn className="h-4 w-4" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
