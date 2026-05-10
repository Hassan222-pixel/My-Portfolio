"use client";

import { motion, Variants } from "framer-motion";
import {
  Download,
  ArrowRight,
  Mail,
  Sparkles,
  Code2,
  Briefcase,
  Smartphone,
  LayoutTemplate,
} from "lucide-react";

export default function HeroSection({
  data,
  cvUrl,
}: {
  data: any;
  cvUrl?: string;
}) {
  // STRICT MONGODB BINDING (Based exactly on your Hero.ts schema)
  const name = data?.name || "Hassan Awad";
  const headline = data?.headline || "Full Stack Web Developer";
  const smallDescription =
    data?.smallDescription ||
    "With 4 years of experience building reliable, scalable web solutions. Specializing in modern technologies like Next.js, Laravel, and the MERN stack to deliver clean, user-centered digital experiences.";
  const imageUrl = data?.imageUrl || "";

  // Hardcoded personal tag
  const greeting = "COMPUTER ENGINEERING GRADUATE";

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const floatVars: Variants = {
    float: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-12 overflow-x-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[60%] md:w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[60%] md:w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center z-10 relative">
        {/* LEFT SIDE: DYNAMIC TEXT FROM MONGODB */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5 md:gap-6 relative z-20 max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
        >
          <motion.div
            variants={itemVars}
            className="flex justify-center lg:justify-start"
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-card border border-border text-primary text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-sm backdrop-blur-md">
              <Sparkles size={14} className="text-primary animate-pulse" />
              {greeting}
            </div>
          </motion.div>

          <motion.h1
            variants={itemVars}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black text-textMain leading-[1.1] tracking-tight"
          >
            Hi, I'm <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient pb-2 block mt-1">
              {name}
            </span>
          </motion.h1>

          <motion.h2
            variants={itemVars}
            className="text-xl sm:text-2xl md:text-3xl font-bold text-textDim flex items-center justify-center lg:justify-start gap-3"
          >
            <span className="hidden sm:block w-8 h-1 bg-primary rounded-full shrink-0"></span>
            {headline}
          </motion.h2>

          <motion.p
            variants={itemVars}
            className="text-sm sm:text-base md:text-lg text-textDim leading-relaxed font-medium px-4 sm:px-0"
          >
            {smallDescription}
          </motion.p>

          <motion.div
            variants={itemVars}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto group relative flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </a>

            {cvUrl && (
              <a
                href={cvUrl}
                download="Hassan_Awad_CV.pdf"
                className="w-full sm:w-auto group relative flex items-center justify-center gap-2 bg-card hover:bg-primary/5 border border-border hover:border-primary text-textMain px-8 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <Download
                  size={18}
                  className="text-primary group-hover:-translate-y-1 transition-transform"
                />{" "}
                Download CV
              </a>
            )}

            <a
              href="#contact"
              className="hidden sm:flex w-12 h-12 rounded-xl bg-card border border-border hover:border-primary hover:bg-primary text-textDim hover:text-white items-center justify-center transition-all hover:-translate-y-0.5 shadow-sm shrink-0"
            >
              <Mail size={20} />
            </a>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: IMAGE & 4 BADGES */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative flex justify-center lg:justify-end z-10 mt-6 lg:mt-0"
        >
          <motion.div
            variants={floatVars}
            animate="float"
            className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-[380px] lg:h-[380px] xl:w-[420px] xl:h-[420px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-blue-500 rounded-full blur-3xl opacity-20"></div>

            {/* Image Frame */}
            <div className="relative w-full h-full rounded-full border border-border/40 bg-background/50 p-2 sm:p-3 lg:p-4 shadow-2xl overflow-hidden backdrop-blur-md">
              <div className="w-full h-full rounded-full overflow-hidden border border-border/50 bg-card relative flex items-center justify-center group">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                ) : (
                  <span className="text-textDim text-sm font-medium">
                    No Image Found
                  </span>
                )}
              </div>
            </div>

            {/* Badge 1: Experience (Top Left) */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -top-2 -left-2 sm:-left-4 lg:top-4 lg:-left-12 bg-background/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full p-2 pr-4 sm:pr-5 flex items-center gap-2 sm:gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white flex items-center justify-center shadow-inner">
                <Briefcase size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[10px] text-textDim font-bold uppercase tracking-wider">
                  Experience
                </span>
                <span className="text-[10px] sm:text-xs font-black text-textMain leading-tight">
                  4+ Years
                </span>
              </div>
            </motion.div>

            {/* Badge 2: Core Stack (Bottom Right) */}
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-2 -right-2 sm:-right-4 lg:bottom-12 lg:-right-12 bg-background/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full p-2 pr-4 sm:pr-5 flex items-center gap-2 sm:gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-inner">
                <Code2 size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[10px] text-textDim font-bold uppercase tracking-wider">
                  Core Stack
                </span>
                <span className="text-[10px] sm:text-xs font-black text-textMain leading-tight">
                  Next.js & Laravel
                </span>
              </div>
            </motion.div>

            {/* Badge 3: CMS Expert (Bottom Left) */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute -bottom-2 -left-2 sm:-left-4 lg:bottom-4 lg:-left-6 bg-background/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full p-2 pr-4 sm:pr-5 flex items-center gap-2 sm:gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 text-white flex items-center justify-center shadow-inner">
                <LayoutTemplate size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[10px] text-textDim font-bold uppercase tracking-wider">
                  CMS Expert
                </span>
                <span className="text-[10px] sm:text-xs font-black text-textMain leading-tight">
                  WordPress
                </span>
              </div>
            </motion.div>

            {/* Badge 4: Platforms (Top Right) */}
            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="absolute -top-2 -right-2 sm:-right-4 lg:top-8 lg:-right-8 bg-background/60 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full p-2 pr-4 sm:pr-5 flex items-center gap-2 sm:gap-3"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center shadow-inner">
                <Smartphone size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[8px] sm:text-[10px] text-textDim font-bold uppercase tracking-wider">
                  Platforms
                </span>
                <span className="text-[10px] sm:text-xs font-black text-textMain leading-tight">
                  Mobile & Web UI
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
