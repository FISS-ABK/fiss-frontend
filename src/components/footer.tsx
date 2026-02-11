"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Instagram, Facebook, ArrowUp } from "lucide-react";

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Admissions", href: "/admissions" },
    { name: "Academics", href: "/academics" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact Us", href: "/contact" },
    { name: "Admin", href: "/admin/overview" },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="mt-auto bg-[#edf5f5]">
            {/* Main Footer */}
            <div className="px-4 py-8 sm:px-6 sm:py-10 md:py-12 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-8 rounded-xl bg-white p-5 sm:grid-cols-2 sm:rounded-2xl sm:p-6 md:gap-10 lg:grid-cols-4 lg:gap-12 lg:p-8">
                        {/* Logo */}
                        <div className="flex items-start justify-center sm:justify-start">
                            <Image
                                src="/FOURSQUARE PICTURES/fisshead.png"
                                alt="Foursquare International Schools"
                                width={150}
                                height={60}
                                className="h-auto w-28 sm:w-32 md:w-36"
                            />
                        </div>

                        {/* Quick Links */}
                        <div className="text-center sm:text-left">
                            <h3 className="font-suisse mb-3 text-xs text-gray-500 sm:mb-4 sm:text-sm">
                                Quick Links
                            </h3>
                            <ul className="space-y-2 sm:space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="font-suisse text-sm text-[#0a1628] transition-colors hover:text-[#bed3d3]"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Us */}
                        <div className="text-center sm:text-left">
                            <div className="flex flex-col">
                                <h3 className="font-suisse mb-3 text-xs text-gray-500 sm:mb-4 sm:text-sm">
                                    Contact Us
                                </h3>

                                {/* Phone */}
                                <p className="font-poppins mb-3 text-lg font-semibold text-[#0a1628] sm:mb-4 sm:text-xl md:text-2xl">
                                    ( 08079951366 )
                                </p>

                                {/* Call Us Button */}
                                <Link
                                    href="tel:+2348079951366"
                                    className="font-poppins mb-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B2C4D] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#1a2a42] sm:mb-6 sm:rounded-xl sm:px-6 sm:py-3"
                                >
                                    Call Us
                                    <Phone className="h-4 w-4" />
                                </Link>
                            </div>

                            {/* Email */}
                            <div className="mb-3 sm:mb-4">
                                <p className="font-suisse mb-1 text-xs text-gray-500 sm:text-sm">Email</p>
                                <a
                                    href="mailto:hello@logoipsum.com"
                                    className="font-suisse text-sm text-[#0a1628] transition-colors hover:text-[#203572]"
                                >
                                    fissabk@yahoo.com
                                </a>
                            </div>

                            {/* Location */}
                            <div>
                                <p className="font-suisse mb-1 text-xs text-gray-500 sm:text-sm">
                                    Location
                                </p>
                                <p className="font-suisse text-sm text-[#0a1628]">
                                    Besde Muda Lawal Stadium, Asero
                                    <br />
                                    Abeokuta, Ogun State.
                                </p>
                            </div>
                        </div>

                        {/* Social Media & Back to Top */}
                        <div className="flex flex-row items-center justify-between gap-4 sm:flex-col sm:items-start sm:justify-start lg:items-end lg:justify-between">
                            {/* Social Icons */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <a
                                    href="https://instagram.com/fiss_abk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1628] transition-colors hover:bg-[#1a2a42] sm:h-10 sm:w-10"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                                </a>
                                <a
                                    href="https://facebook.com/fiss_abk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1628] transition-colors hover:bg-[#1a2a42] sm:h-10 sm:w-10"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                                </a>
                                <a
                                    href="https://x.com/fiss_abk"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1628] transition-colors hover:bg-[#1a2a42] sm:h-10 sm:w-10"
                                    aria-label="X (Twitter)"
                                >
                                    <svg
                                        className="h-4 w-4 text-white sm:h-5 sm:w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                            </div>

                            {/* Back to Top Button */}
                            <button
                                onClick={scrollToTop}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0a1628] transition-colors hover:bg-[#1a2a42] sm:mt-8 sm:h-12 sm:w-12 lg:mt-0"
                                aria-label="Back to top"
                            >
                                <ArrowUp className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="px-4 py-6 sm:px-6 sm:py-8 md:py-10 lg:px-8 lg:py-12">
                <div className="mx-auto max-w-7xl">
                    <p className="font-poppins text-center text-lg font-semibold leading-tight text-[#04101C] sm:text-left sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                        Foursquare International Secondary School is committed to providing
                        quality education rooted in strong values.
                    </p>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:gap-0 sm:text-left">
                    <p className="font-suisse text-xs text-gray-600 sm:text-sm">© 2026 — Copyright</p>
                    <sub className="order-last text-xs text-gray-500 sm:order-0 sm:text-sm">
                        Built by
                        <Link href={"https://x.com/mhetHQ"} className="hover:underline">
                            {" "} mhetLabs
                        </Link>
                    </sub>
                    <Link
                        href="/privacy"
                        className="font-suisse text-xs text-gray-600 transition-colors hover:text-[#0a1628] sm:text-sm"
                    >
                        Privacy
                    </Link>
                </div>
            </div>
        </footer>
    );
}
