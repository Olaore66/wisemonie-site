"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Personal Loan", href: "#" },
  { label: "One Card", href: "#" },
  { label: "Savings", href: "#" },
  { label: "Checking", href: "#" },
  { label: "Help", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-sm border-b border-gray-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Wisemonie"
                width={180}
                height={40}
                className={`h-20 md:h-20 w-auto object-contain transition-all duration-300 ${
                  scrolled ? "brightness-0" : "brightness-100"
                }`}
                priority
              />
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                    scrolled
                      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link
                href="#"
                className={`px-5 py-2 rounded-md text-sm font-semibold border transition-all duration-300 ${
                  scrolled
                    ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-gray-900"
                }`}
              >
                Sign In
              </Link>

              <Link
                href="#"
                className="px-5 py-2 rounded-md text-sm font-semibold bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors duration-200"
              >
                Join The Waitlist
              </Link>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
                scrolled
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer - slides down from top with blurry background */}
      <div
        className={`fixed inset-x-0 top-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer content - slides down from top */}
        <div
          className={`absolute top-0 left-0 right-0 backdrop-blur-xl bg-black/80 shadow-2xl transition-transform duration-300 ${
            menuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="flex justify-between items-center px-5 pt-5 pb-3 ">
            {/* <span className="text-white font-semibold text-lg">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X size={22} />
            </button> */}
          </div>

          <div className="px-4 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-white/80 font-medium hover:bg-white/10 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="px-4 pb-6 flex flex-col gap-3">
            <Link
              href="#"
              onClick={() => setMenuOpen(false)}
              className="w-full py-3 rounded-md text-center text-sm font-semibold border border-white/30 text-white hover:bg-white hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="#"
              onClick={() => setMenuOpen(false)}
              className="w-full py-3 rounded-md text-center text-sm font-semibold bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors"
            >
              Join The Waitlist
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}