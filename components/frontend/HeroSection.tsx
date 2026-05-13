"use client";

import { motion, Variants } from "framer-motion";
import { Download, ArrowRight, Mail, Sparkles } from "lucide-react";

export default function HeroSection({
  data,
  cvUrl,
}: {
  data: any;
  cvUrl?: string;
}) {
  if (!data) return null;

  const topBadge = data?.topBadge || "COMPUTER ENGINEERING GRADUATE";
  const greeting = data?.greeting || "Hi, I'm";
  const name = data?.name || "Hassan Awad";
  const headline = data?.headline || "Full Stack Web Developer";
  const smallDescription = data?.smallDescription || "";
  const imageUrl = data?.imageUrl || "";
  const badges = data?.badges || [];

  // FIXED: Percentage-based positioning to push them exactly into the red circles you drew (NW, SE, SW, NE)
  const badgePositions = [
    "top-[-5%] left-[-5%] sm:top-[0%] sm:left-[-10%] lg:top-[5%] lg:left-[-15%]", // Badge 1: Top Left
    "bottom-[-5%] right-[-5%] sm:bottom-[0%] sm:right-[-10%] lg:bottom-[5%] lg:right-[-15%]", // Badge 2: Bottom Right
    "bottom-[10%] left-[-15%] sm:bottom-[15%] sm:left-[-20%] lg:bottom-[20%] lg:left-[-25%]", // Badge 3: Bottom Left
    "top-[10%] right-[-15%] sm:top-[15%] sm:right-[-20%] lg:top-[20%] lg:right-[-25%]", // Badge 4: Top Right
  ];

  const badgeGradients = [
    "from-blue-500 to-cyan-500",
    "from-emerald-500 to-teal-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
  ];

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const floatVars: Variants = {
    float: {
      y: [0, -8, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center pt-28 pb-12 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[40%] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-full h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none opacity-50"></div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 items-center z-10 relative">
        {/* LEFT SIDE */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5 md:gap-6 relative z-20 text-center lg:text-left"
        >
          <motion.div
            variants={itemVars}
            className="flex justify-center lg:justify-start"
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-card border border-border text-primary text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-sm backdrop-blur-md">
              <Sparkles
                size={14}
                className="text-primary animate-pulse shrink-0"
              />
              <span>{topBadge}</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVars}
            className="text-4xl sm:text-5xl md:text-6xl xl:text-[4.5rem] font-black text-textMain leading-[1.1] tracking-tight"
          >
            {greeting} <br className="hidden lg:block" />
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
            className="text-sm sm:text-base md:text-lg text-textDim leading-relaxed font-medium"
          >
            {smallDescription}
          </motion.p>

          <motion.div
            variants={itemVars}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold transition-all shadow-md hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              View My Work <ArrowRight size={18} />
            </a>
            {cvUrl && (
              <a
                href={cvUrl}
                download={`${name.replace(/\s+/g, "_")}_CV.pdf`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-card border border-border hover:border-primary text-textMain px-8 py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 shadow-sm"
              >
                <Download size={18} className="text-primary" /> Download CV
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE: IMAGE & ORBITAL BADGES */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center w-full z-10"
        >
          <motion.div
            variants={floatVars}
            animate="float"
            className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] xl:w-[450px] xl:h-[450px]"
          >
            <div className="relative w-full h-full rounded-full border border-border/40 bg-background/50 p-2 sm:p-4 shadow-2xl overflow-hidden backdrop-blur-md">
              <div className="w-full h-full rounded-full overflow-hidden border border-border/50 bg-card relative flex items-center justify-center">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-textDim text-sm font-medium">
                    No Image
                  </span>
                )}
              </div>
            </div>

            {badges.map((badge: any, index: number) => {
              if (index > 3) return null;
              if (!badge.title && !badge.subtitle) return null;

              return (
                <motion.div
                  key={index}
                  animate={{
                    y: [
                      index % 2 === 0 ? -4 : 4,
                      index % 2 === 0 ? 4 : -4,
                      index % 2 === 0 ? -4 : 4,
                    ],
                  }}
                  transition={{
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  className={`absolute ${badgePositions[index]} bg-card border border-border shadow-xl rounded-xl sm:rounded-2xl p-1.5 pr-3 sm:p-2.5 sm:pr-5 flex items-center gap-2 sm:gap-3 z-20`}
                >
                  <div
                    className={`w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${badgeGradients[index]} flex items-center justify-center shrink-0 shadow-inner`}
                  >
                    {badge.iconUrl ? (
                      <img
                        src={badge.iconUrl}
                        alt="icon"
                        className="w-3.5 h-3.5 sm:w-5 sm:h-5 object-contain filter drop-shadow-sm"
                      />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                    )}
                  </div>

                  <div className="flex flex-col justify-center">
                    {badge.title && (
                      <span className="text-[7px] sm:text-[10px] text-textDim font-bold uppercase tracking-wider mb-[1px]">
                        {badge.title}
                      </span>
                    )}
                    {badge.subtitle && (
                      <span className="text-[9px] sm:text-xs font-black text-textMain leading-none">
                        {badge.subtitle}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
