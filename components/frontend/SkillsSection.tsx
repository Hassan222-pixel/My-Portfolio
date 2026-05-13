"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsSection({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  const categories = [
    "All",
    ...Array.from(new Set(data.map((skill) => skill.category))),
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const displayedSkills =
    activeCategory === "All"
      ? data
      : data.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-12 md:py-16 relative">
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-textMain tracking-tight">
            My Skills
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide gap-3 mb-8 sm:mb-10 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shrink-0 ${
                activeCategory === category
                  ? "bg-primary text-white shadow-md shadow-primary/30 scale-105"
                  : "bg-card/50 backdrop-blur-sm border border-border text-textDim hover:text-textMain hover:border-primary/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-5"
        >
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill, index) => (
              <motion.div
                layout
                key={skill._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group aspect-square flex flex-col items-center justify-center p-3 sm:p-5 bg-card/40 backdrop-blur-sm border border-border/60 rounded-2xl sm:rounded-3xl hover:border-primary/50 hover:bg-card hover:shadow-xl hover:shadow-primary/10 transition-all cursor-pointer relative overflow-hidden"
              >
                {skill.featured && (
                  <div className="absolute top-0 right-0 w-10 h-10 overflow-hidden z-10">
                    <div className="absolute top-1 -right-4 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-[8px] font-black py-0.5 px-4 rotate-45 shadow-sm">
                      TOP
                    </div>
                  </div>
                )}

                <div className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-3 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1 relative z-10">
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}/${skill.icon}-original.svg`}
                    alt={skill.name}
                    className="w-full h-full object-contain drop-shadow-sm"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${skill.name}&background=random&color=fff&rounded=true&bold=true`;
                    }}
                  />
                </div>

                <span className="text-[10px] sm:text-xs font-bold text-textMain text-center group-hover:text-primary transition-colors line-clamp-1 px-1 relative z-10">
                  {skill.name}
                </span>

                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}
