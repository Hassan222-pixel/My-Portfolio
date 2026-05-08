// components/frontend/SkillsSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SkillsSection({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  // Extract unique categories from the data to build the tabs
  const categories = [
    "All",
    ...Array.from(new Set(data.map((skill) => skill.category))),
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter skills based on the active tab
  const displayedSkills =
    activeCategory === "All"
      ? data
      : data.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="py-24 border-t border-border/50 min-h-screen flex flex-col justify-center"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-textMain">
          My Arsenal
        </h2>
        <div className="h-px flex-1 bg-border"></div>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
                : "bg-card border border-border text-textDim hover:text-textMain hover:border-textDim"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {displayedSkills.map((skill, index) => (
            <motion.div
              layout
              key={skill._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group flex flex-col items-center justify-center p-6 bg-card border border-border rounded-2xl hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Featured Badge */}
              {skill.featured && (
                <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                  <div className="absolute top-1 -right-3 bg-yellow-500 text-white text-[10px] font-bold py-0.5 px-4 rotate-45 shadow-sm">
                    TOP
                  </div>
                </div>
              )}

              {/* Icon from Devicon CDN using your slug */}
              <div className="w-16 h-16 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                <img
                  src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${skill.icon}/${skill.icon}-original.svg`}
                  alt={skill.name}
                  className="w-full h-full object-contain"
                  // Fallback in case the slug is wrong or doesn't exist
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${skill.name}&background=random&color=fff&rounded=true&bold=true`;
                  }}
                />
              </div>

              {/* Skill Name */}
              <span className="text-sm font-semibold text-textMain text-center group-hover:text-primary transition-colors">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
