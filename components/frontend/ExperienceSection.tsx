"use client";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Sparkles } from "lucide-react";

export default function ExperienceSection({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <section
      id="experience"
      className="py-16 md:py-24 my-16 md:my-24 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black text-textMain tracking-tight">
            Professional Experience
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
        </motion.div>

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-border to-transparent md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {data.map((exp, index) => {
              const isEven = index % 2 === 0;
              const skillsArray = exp.skills
                ? exp.skills.split(",").map((s: string) => s.trim())
                : [];

              return (
                <motion.div
                  key={exp._id}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)] top-8"></div>

                  <div
                    className={`ml-12 md:ml-0 w-full md:w-1/2 ${isEven ? "md:pl-16" : "md:pr-16"}`}
                  >
                    <div className="bg-card/40 backdrop-blur-md border border-border/60 p-6 md:p-8 rounded-3xl shadow-xl hover:border-primary/40 transition-all group relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full mb-4">
                        <Calendar size={12} />
                        {exp.startDate} —{" "}
                        {exp.isCurrent ? "Present" : exp.endDate}
                      </div>

                      <h3 className="text-xl md:text-2xl font-black text-textMain mb-2 group-hover:text-primary transition-colors italic">
                        {exp.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-textDim mb-6">
                        <span className="flex items-center gap-1.5 text-textMain bg-background/50 px-3 py-1 rounded-lg border border-border/40">
                          <Briefcase size={14} className="text-primary" />{" "}
                          {exp.organization}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} /> {exp.location}
                        </span>
                      </div>

                      <p className="text-textDim text-sm leading-relaxed mb-6 font-medium">
                        {exp.description}
                      </p>

                      {skillsArray.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                          {skillsArray.map((skill: string, i: number) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-background/50 border border-border/50 text-[10px] font-bold text-textMain rounded-md hover:border-primary/30 transition-colors uppercase"
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
      </div>
    </section>
  );
}
