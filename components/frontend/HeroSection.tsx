// components/frontend/HeroSection.tsx
"use client";

import { motion } from "framer-motion";

export default function HeroSection({ data }: { data: any }) {
  if (!data)
    return (
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center"
      >
        Loading...
      </section>
    );

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20">
      <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Side: Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          <p className="text-primary font-semibold tracking-wide mb-2 uppercase text-sm">
            Welcome to my portfolio
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-textMain leading-tight mb-4">
            Hi, I'm <span className="text-primary">{data.name}</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-textDim mb-6">
            {data.headline}
          </h2>
          <p className="text-lg text-textDim leading-relaxed max-w-xl mx-auto md:mx-0 mb-8">
            {data.smallDescription}
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <a
              href="#projects"
              className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 bg-background border-2 border-border text-textMain font-medium rounded-lg hover:border-textDim transition-colors"
            >
              Contact Me
            </a>
          </div>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 flex justify-center md:justify-end"
        >
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            {/* Cool background decorative blob/circle */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <img
              src={data.imageUrl}
              alt={data.name}
              className="relative w-full h-full object-cover rounded-full border-4 border-card shadow-2xl z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
