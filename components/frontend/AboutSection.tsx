// components/frontend/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function AboutSection({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section id="about" className="py-24 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-textMain">
            About Me
          </h2>
          <div className="h-px flex-1 bg-border"></div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
          <h3 className="text-2xl font-bold text-textMain mb-2">
            {data.title}
          </h3>

          <div className="flex items-center gap-2 text-textDim mb-6">
            <MapPin size={18} className="text-primary" />
            <span className="font-medium">{data.location}</span>
          </div>

          <div className="prose prose-lg text-textDim max-w-none">
            {/* This splits the biography by new lines so it formats beautifully into paragraphs */}
            {data.fullBiography
              .split("\n")
              .map((paragraph: string, index: number) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
