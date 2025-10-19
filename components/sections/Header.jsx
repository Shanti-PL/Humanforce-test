"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header({ navigation, brand }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = navigation?.main || [];
  const ctaButton = navigation?.cta || { label: "Book a Demo", href: "#demo" };
  const brandName = brand?.name || "Humanforce";

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-primary"
      }`}
    >
      <div className="container md:px-4 2xl:px-0">
        <nav className="flex items-center justify-between h-20 px-4 md:px-0">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection(e, "#hero")}
            className="text-2xl font-bold font-bbh-sans-hegarty text-foreground hover:text-secondary transition-colors"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              className="w-auto h-10"
              width={400}
              height={100}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 xl:gap-6 2xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-foreground hover:text-tertiary transition-colors font-semibold"
              >
                {link.label}
              </a>
            ))}
            <a
              href={ctaButton.href}
              onClick={(e) => scrollToSection(e, ctaButton.href)}
              className={`inline-flex items-center justify-center px-4 2xl:px-6 py-2 text-foreground font-semibold rounded-lg transition-all border-2 border-foreground shadow-inner hover:shadow-md ${
                isScrolled
                  ? "bg-primary hover:bg-white hover:text-foreground"
                  : "bg-tertiary hover:bg-white hover:text-foreground"
              }`}
            >
              {ctaButton.label}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-secondary transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden pb-4 backdrop-blur-md rounded-b-2xl shadow-lg inset-x-0 bottom-0 ${
              isScrolled ? "bg-background/95" : "bg-primary"
            }`}
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="px-4 py-3 text-foreground hover:bg-primary/20 hover:text-secondary transition-all rounded-lg"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={ctaButton.href}
                onClick={(e) => scrollToSection(e, ctaButton.href)}
                className={`mx-4 mt-2 inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary/90 text-foreground font-semibold rounded-lg transition-all ${
                  isScrolled
                    ? "bg-primary hover:bg-white hover:text-foreground"
                    : "bg-tertiary hover:bg-white hover:text-foreground"
                }`}
              >
                {ctaButton.label}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
