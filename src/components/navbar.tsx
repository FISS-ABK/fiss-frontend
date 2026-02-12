"use client";

import { useState } from "react";
import { LogIn, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <header className="relative w-full px-4 py-6 md:px-4">
      {/* Main White Container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl bg-[#faf9f6] px-6 py-3 shadow-sm md:px-10">
        
        {/* LEFT & CENTER GROUP: Logo and Nav grouped together */}
        <div className="flex items-center gap-12 lg:gap-16">
          {/* Logo - Removed large width/height constraints to let it sit naturally */}
          <Link href="/" className="relative flex h-10 w-10 shrink-0 items-center justify-center lg:h-12 lg:w-12">
            <Image
              alt="Foursquare International Secondary School logo"
              src="/FOURSQUARE PICTURES/fisshead.png"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 text-[15px] font-medium text-[#0b2c4d] lg:flex xl:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative py-1 transition-colors hover:text-[#324e69] ${
                    isActive
                      ? "font-bold text-[#324e69] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-[#324e69]"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* RIGHT SECTION: Action Buttons */}
        <div className="flex items-center gap-x-2">
          <Link 
            href="/portal" 
            className="hidden h-11 items-center gap-2 rounded-xl bg-[#324e69] px-6 text-sm font-semibold text-white transition-all hover:bg-[#263b50] sm:flex"
          >
            <span>Portal Login</span>
            <LogIn className="h-4 w-4 opacity-80" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#324e69] text-white lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute left-4 right-4 top-full z-50 mt-2 rounded-2xl bg-[#faf9f6] p-6 shadow-xl border border-gray-100 lg:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-[#0b2c4d]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/portal"
              className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#324e69] text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portal Login <LogIn className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}