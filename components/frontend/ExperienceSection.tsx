"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export default function ExperienceSection({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section id="experience" className="py-24 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-textMain">
          Experience
        </h2>
        <div className="h-px flex-1 bg-border"></div>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* The Vertical Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2"></div>

        <div className="space-y-12">
          {data.map((exp, index) => {
            const isEven = index % 2 === 0;
            const skillsArray = exp.skills
              ? exp.skills.split(",").map((s: string) => s.trim())
              : [];

            return (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* Glowing Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"></div>

                {/* Content Card */}
                <div
                  className={`ml-12 md:ml-0 w-full md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12"}`}
                >
                  <div className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-sm hover:border-primary/50 transition-colors group relative overflow-hidden">
                    {/* Date Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                      <Calendar size={14} />
                      {exp.startDate} -{" "}
                      {exp.isCurrent ? "Present" : exp.endDate}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-textMain mb-1 group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-textDim mb-4">
                      <span className="flex items-center gap-1 text-textMain">
                        <Briefcase size={16} className="text-primary" />{" "}
                        {exp.organization}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={16} /> {exp.location}
                      </span>
                    </div>

                    <p className="text-textDim text-sm leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Skill Tags */}
                    {skillsArray.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {skillsArray.map((skill: string, i: number) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-background border border-border text-xs font-medium text-textMain rounded-lg"
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
