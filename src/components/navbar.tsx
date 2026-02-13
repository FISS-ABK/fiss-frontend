"use client";

import { useState } from "react";
import { LogIn, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Updated Data Structure with Sub-links
const navLinks = [
  { name: "Home", href: "/" },
  { 
    name: "About Us", 
    href: "/about",
    // This adds the dropdown capability
    subLinks: [
      { name: "Secondary School", href: "/about" }, // Keeps your current page as Secondary
      { name: "Primary School", href: "/primary" }, // You will need to create this page later
    ]
  },
  { name: "Admissions", href: "/admissions" },
  { name: "Academics", href: "/academics" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "Admin", href: "/admin/login" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState<string | null>(null); // To toggle mobile dropdowns
  const pathname = usePathname();

  const toggleMobileSubMenu = (name: string) => {
    setMobileSubMenuOpen(mobileSubMenuOpen === name ? null : name);
  };

  return (
    <header className="relative w-full px-4 py-6 md:px-8">
      {/* Main Container */}
      <div className="mx-auto flex max-w-7xl min-h-[90px] items-center justify-between rounded-2xl bg-[#faf9f6] px-6 py-2 shadow-sm md:px-10">
        
        {/* 1. LEFT: Logo */}
        <div className="flex flex-1 justify-start">
          <Link 
            href="/" 
            className="relative flex h-16 w-16 shrink-0 translate-y-3 items-center justify-center lg:h-[68px] lg:w-[68px]"
          >
            <Image
              alt="Foursquare International Secondary School logo"
              src="/FOURSQUARE PICTURES/fisshead.png"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* 2. CENTER: Desktop Navigation (With Hover Dropdown) */}
        <nav className="hidden flex-[2] items-center justify-center gap-x-5 text-[15px] font-medium text-[#0b2c4d] lg:flex xl:gap-x-9">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.subLinks && link.subLinks.some(sub => pathname === sub.href));
            
            // Render Dropdown if subLinks exist
            if (link.subLinks) {
              return (
                <div key={link.name} className="relative group">
                  <button 
                    className={`flex items-center gap-1 py-1 whitespace-nowrap transition-colors hover:text-[#324e69] ${
                      isActive ? "font-bold text-[#324e69]" : ""
                    }`}
                  >
                    {link.name}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>

                  {/* The Dropdown Box */}
                  <div className="absolute left-1/2 top-full z-50 mt-1 hidden w-48 -translate-x-1/2 flex-col rounded-xl bg-white p-2 shadow-xl ring-1 ring-gray-900/5 group-hover:flex">
                    {link.subLinks.map((subLink) => (
                      <Link
                        key={subLink.name}
                        href={subLink.href}
                        className="block rounded-lg px-4 py-3 text-sm text-[#0b2c4d] hover:bg-gray-50 hover:text-[#324e69]"
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                  
                  {/* Active Underline for the main label */}
                  {isActive && <div className="absolute -bottom-2 left-0 h-[2.5px] w-full bg-[#324e69]" />}
                </div>
              );
            }

            // Standard Link
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 whitespace-nowrap transition-colors hover:text-[#324e69] ${
                  isActive
                    ? "font-bold text-[#324e69] after:absolute after:-bottom-2 after:left-0 after:h-[2.5px] after:w-full after:bg-[#324e69]"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* 3. RIGHT: Action Buttons */}
        <div className="flex flex-1 items-center justify-end gap-x-3">
          <Link 
            href="/portal" 
            className="hidden h-11 whitespace-nowrap items-center gap-2 rounded-xl bg-[#324e69] px-6 text-sm font-semibold text-white transition-all hover:bg-[#263b50] sm:flex"
          >
            <span className="leading-none">Portal Login</span>
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
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.subLinks ? (
                  // Mobile Dropdown Logic
                  <>
                    <button
                      onClick={() => toggleMobileSubMenu(link.name)}
                      className="flex w-full items-center justify-between py-2 text-lg font-medium text-[#0b2c4d]"
                    >
                      {link.name}
                      <ChevronDown className={`h-5 w-5 transition-transform ${mobileSubMenuOpen === link.name ? "rotate-180" : ""}`} />
                    </button>
                    {/* Expandable Sub-menu */}
                    {mobileSubMenuOpen === link.name && (
                      <div className="ml-4 flex flex-col gap-2 border-l-2 border-[#324e69]/20 pl-4">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            className="py-2 text-base font-medium text-[#0b2c4d]/80"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Normal Mobile Link
                  <Link
                    href={link.href}
                    className="block py-2 text-lg font-medium text-[#0b2c4d]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            
            <Link
              href="/portal"
              className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#324e69] text-white"
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