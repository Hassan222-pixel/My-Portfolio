"use client";
import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";

// --- CUSTOM BRAND ICONS ---
const Github = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

const Linkedin = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
// ---------------------------------------------------

export default function Footer({ data }: { data: any }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-card/30 border-t border-border mt-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-2xl font-bold text-textMain tracking-wide group"
            >
              Hassan
              <span className="text-primary group-hover:text-blue-500 transition-colors">
                .dev
              </span>
            </Link>
            <p className="text-sm text-textDim leading-relaxed max-w-xs">
              {data?.aboutText ||
                "Building fast, scalable, and visually engaging digital experiences."}
            </p>
          </div>

          <div className="flex flex-col space-y-4 md:items-center">
            <h3 className="text-sm font-semibold text-textMain uppercase tracking-wider">
              Quick Navigate
            </h3>
            <ul className="flex flex-wrap md:flex-col gap-4 md:gap-2 text-sm text-textDim">
              <li>
                <Link
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#skills"
                  className="hover:text-primary transition-colors"
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link
                  href="#experience"
                  className="hover:text-primary transition-colors"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="#education"
                  className="hover:text-primary transition-colors"
                >
                  Education
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  className="hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col space-y-4 md:items-end">
            <h3 className="text-sm font-semibold text-textMain uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex items-center gap-4">
              {data?.github && (
                <a
                  href={data.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-background border border-border rounded-lg text-textDim hover:text-textMain hover:border-textMain transition-all"
                >
                  <Github />
                </a>
              )}
              {data?.linkedin && (
                <a
                  href={data.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-background border border-border rounded-lg text-textDim hover:text-[#0A66C2] hover:border-[#0A66C2] transition-all"
                >
                  <Linkedin />
                </a>
              )}
              {data?.instagram && (
                <a
                  href={data.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-background border border-border rounded-lg text-textDim hover:text-[#E1306C] hover:border-[#E1306C] transition-all"
                >
                  <Instagram />
                </a>
              )}
              {data?.email && (
                <a
                  href={`mailto:${data.email}`}
                  className="p-2 bg-background border border-border rounded-lg text-textDim hover:text-primary hover:border-primary transition-all"
                >
                  <Mail size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-textDim">
            © {currentYear} {data?.copyrightName || "Hassan Awad"}. All rights
            reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-semibold text-textDim hover:text-primary transition-colors"
          >
            BACK TO TOP
            <span className="p-1.5 bg-background border border-border rounded-md group-hover:border-primary group-hover:bg-primary/10 transition-all">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
