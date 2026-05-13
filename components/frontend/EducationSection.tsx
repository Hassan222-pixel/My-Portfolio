"use client";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, School } from "lucide-react";

export default function EducationSection({ data }: { data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    // UPDATED: Added rounded-[2rem] md:rounded-[4rem] to the section itself
    // and mx-4 to make the rounding visible on the sides
    <section
      id="education"
      className="w-full max-w-[1400px] mx-auto bg-card/20 border border-border/40 py-12 md:py-16 my-12 md:my-20 relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem]"
    >
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="px-6 sm:px-10 md:px-16 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-black text-textMain tracking-tight">
            Education Path
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {data.map((edu, index) => {
            const skillsArray = edu.skills
              ? edu.skills.split(",").map((s: string) => s.trim())
              : [];

            return (
              <motion.div
                key={edu._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-background/50 backdrop-blur-sm border border-border/50 p-6 md:p-7 rounded-3xl shadow-xl hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                    <GraduationCap size={20} />
                  </div>
                  <div className="px-3 py-1 bg-card/60 border border-border/40 text-textDim text-[9px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 shadow-sm">
                    <Calendar size={12} />
                    {edu.startDate} — {edu.isCurrent ? "Present" : edu.endDate}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-black text-textMain leading-tight group-hover:text-primary transition-colors italic">
                    {edu.title}
                  </h3>

                  <div className="flex flex-col gap-1.5 pb-3">
                    <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-tight">
                      <School size={15} />
                      {edu.organization}
                    </div>
                    <div className="flex items-center gap-2 text-textDim font-bold text-xs">
                      <MapPin size={15} />
                      {edu.location}
                    </div>
                  </div>

                  <p className="text-textDim text-sm leading-relaxed font-medium line-clamp-3">
                    {edu.description}
                  </p>
                </div>

                {skillsArray.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-5 mt-4 border-t border-border/30">
                    {skillsArray.map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/5 text-primary border border-primary/10 text-[9px] font-black uppercase rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
