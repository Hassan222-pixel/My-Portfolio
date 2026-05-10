// components/frontend/EducationSection.tsx
"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, School } from "lucide-react";

export default function EducationSection({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="education" className="py-24 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-textMain">
          Education
        </h2>
        <div className="h-px flex-1 bg-border"></div>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Subtle background line for the timeline */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2"></div>

        <div className="space-y-16">
          {data.map((edu, index) => {
            const isEven = index % 2 === 0;
            const skillsArray = edu.skills
              ? edu.skills.split(",").map((s: string) => s.trim())
              : [];

            return (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* Custom Education Center Icon */}
                <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center md:-translate-x-1/2 z-10 shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] -translate-x-1/2">
                  <GraduationCap size={20} className="text-primary" />
                </div>

                <div
                  className={`ml-16 md:ml-0 w-full md:w-1/2 ${isEven ? "md:pl-16" : "md:pr-16"}`}
                >
                  <div className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-textMain">
                        {edu.title}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-background border border-border text-textDim text-xs font-bold uppercase tracking-wider rounded-lg shrink-0 w-fit">
                        <Calendar size={14} />
                        {edu.startDate} -{" "}
                        {edu.isCurrent ? "Present" : edu.endDate}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-primary mb-5">
                      <span className="flex items-center gap-1">
                        <School size={16} /> {edu.organization}
                      </span>
                      <span className="text-textDim">•</span>
                      <span className="flex items-center gap-1 text-textDim">
                        <MapPin size={16} /> {edu.location}
                      </span>
                    </div>

                    <p className="text-textDim text-sm leading-relaxed mb-6">
                      {edu.description}
                    </p>

                    {skillsArray.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                        {skillsArray.map((skill: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-primary/5 text-primary border border-primary/10 text-xs font-medium rounded-lg"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
