"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon, Menu, X, Download } from "lucide-react";

export default function Navbar({ cvUrl }: { cvUrl?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" }, // Added Education
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 150;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;
          if (scrollPosition >= top && scrollPosition <= bottom) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-lg border-b border-border/50 py-3 shadow-sm" : "bg-transparent py-5"}`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 flex items-center justify-between">
        <Link
          href="#hero"
          className="text-xl md:text-2xl font-bold tracking-tight z-50 relative group"
        >
          Hassan
          <span className="text-primary group-hover:text-blue-500 transition-colors">
            .dev
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-2 ${activeSection === link.href.substring(1) ? "text-primary" : "text-textDim hover:text-textMain"}`}
                >
                  {link.name}
                  {activeSection === link.href.substring(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 border-l border-border pl-6">
            <button
              onClick={toggleTheme}
              className="p-2 text-textDim hover:text-primary transition-colors bg-card border border-border rounded-full hover:shadow-md hover:shadow-primary/20"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {cvUrl && (
              <a
                href={cvUrl}
                download="Hassan_Awad_CV.pdf"
                className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all"
              >
                <Download size={16} /> Resume
              </a>
            )}
          </div>
        </nav>

        <button
          className="md:hidden z-50 p-2 text-textMain bg-card border border-border rounded-full"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 h-[calc(100vh-70px)] bg-background/95 backdrop-blur-xl border-t border-border flex flex-col md:hidden overflow-y-auto"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-2xl font-bold py-3 border-b border-border/50 ${activeSection === link.href.substring(1) ? "text-primary" : "text-textDim"}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4 mt-auto pt-8">
                <button
                  onClick={() => {
                    toggleTheme();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 bg-card border border-border text-textMain py-4 rounded-xl font-bold w-full"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun size={20} /> Switch to Light Mode
                    </>
                  ) : (
                    <>
                      <Moon size={20} /> Switch to Dark Mode
                    </>
                  )}
                </button>
                {cvUrl && (
                  <a
                    href={cvUrl}
                    download="Hassan_Awad_CV.pdf"
                    className="flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-bold w-full shadow-lg shadow-primary/20"
                  >
                    <Download size={20} /> Download Resume
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
