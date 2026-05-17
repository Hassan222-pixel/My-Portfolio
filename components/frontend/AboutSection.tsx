"use client";
import { motion } from "framer-motion";
import { MapPin, User } from "lucide-react";

export default function AboutSection({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section
      id="about"
      className="w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] xl:w-full max-w-[1400px] mx-auto bg-card/20 border border-border/40 py-10 md:py-16 my-6 md:my-8 relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem]"
    >
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 -z-10"></div>

      <div className="px-5 sm:px-10 md:px-16 lg:px-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-textMain tracking-tight">
              About Me
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent"></div>
          </div>

          <div className="bg-background/80 backdrop-blur-md border border-border/60 rounded-3xl p-5 sm:p-8 md:p-12 shadow-xl shadow-black/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-transparent opacity-50"></div>

            <div className="flex flex-col gap-6 md:gap-10">
              <div className="flex-1">
                {/* FIXED: Changed to items-start on mobile, items-center on desktop. Added leading-snug so text doesn't crash into itself. */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-textMain mb-4 flex flex-col sm:flex-row sm:items-center items-start gap-3 sm:gap-4 leading-snug">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <User size={20} />
                  </div>
                  <span>{data.title}</span>
                </h3>

                <div className="flex items-center gap-2 text-textDim mb-6 sm:mb-8 text-xs sm:text-sm font-bold bg-card w-fit px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-border/50 shadow-sm uppercase tracking-wide">
                  <MapPin size={14} className="text-primary" />
                  <span>{data.location}</span>
                </div>

                <div className="text-sm sm:text-base md:text-lg text-textDim space-y-4 font-medium leading-relaxed">
                  {data.fullBiography
                    .split("\n")
                    .map((paragraph: string, index: number) => (
                      <p key={index} className="text-left">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
