"use client";
import { motion } from "framer-motion";
import { Briefcase, MapPin, CalendarDays } from "lucide-react";

export default function ExperienceSection({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    // STANDARDIZED WRAPPER: Matches About and Education exactly
    <section
      id="experience"
      className="w-full max-w-[1400px] mx-auto bg-card/20 border border-border/40 py-12 md:py-16 my-8 relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem]"
    >
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute bottom-[-100px] left-[10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      {/* Standardized Padding */}
      <div className="px-6 sm:px-10 md:px-16 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary/80 mb-3 flex items-center gap-2">
                <span className="inline-block w-6 h-px bg-primary/50" />
                Career Journey
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-textMain tracking-tight">
                Experience
              </h2>
            </div>
          </div>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-primary/30 via-border/60 to-transparent" />
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {data.map((exp, index) => {
            const skillsArray = exp.skills
              ? exp.skills.split(",").map((s: string) => s.trim())
              : [];
            const paddedIndex = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={exp._id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group relative bg-background/80 backdrop-blur-md border border-border/60 rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl shadow-black/5 transition-all duration-500 overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />

                  <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-6 md:gap-8 pl-0 md:pl-2">
                    <div className="hidden md:flex flex-col items-start pt-1">
                      <span className="text-[56px] font-black leading-none text-border/40 group-hover:text-primary/30 transition-colors duration-500 select-none tabular-nums">
                        {paddedIndex}
                      </span>
                    </div>

                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-2xl sm:text-3xl font-black text-textMain leading-tight group-hover:text-primary transition-colors duration-300">
                            {exp.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
                            <span className="flex items-center gap-1.5 text-primary font-black text-xs uppercase tracking-wider">
                              <Briefcase size={14} strokeWidth={2.5} />{" "}
                              {exp.organization}
                            </span>
                            <span className="flex items-center gap-1.5 text-textDim text-xs font-semibold">
                              <MapPin size={14} strokeWidth={2} />{" "}
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 self-start">
                          <div className="flex items-center gap-2 px-3.5 py-2 border border-border/50 bg-background/50 backdrop-blur-sm rounded-xl text-[10px] font-black uppercase text-textDim shadow-sm">
                            <CalendarDays size={12} strokeWidth={2.5} />
                            {exp.startDate}{" "}
                            <span className="text-border/70 mx-0.5">—</span>{" "}
                            {exp.isCurrent ? (
                              <span className="text-primary">Present</span>
                            ) : (
                              exp.endDate
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-textDim text-sm md:text-base leading-relaxed font-medium">
                        {exp.description}
                      </p>

                      {skillsArray.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {skillsArray.map((skill: string, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg border border-border/40 text-textDim"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
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
