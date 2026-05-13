"use client";

import { motion } from "framer-motion";
import { MapPin, User } from "lucide-react";

export default function AboutSection({ data }: { data: any }) {
  if (!data) return null;

  return (
    <section
      id="about"
      className="w-full bg-card border-y border-border/50 py-12 md:py-16 mt-16 md:mt-24 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 -z-10"></div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-textMain tracking-tight">
              About Me
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
          </div>

          <div className="bg-background/80 backdrop-blur-md border border-border/60 rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl shadow-black/5 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-400 to-transparent opacity-50"></div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              <div className="flex-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-textMain mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <User size={20} />
                  </div>
                  {data.title}
                </h3>

                <div className="flex items-center gap-2 text-textDim mb-6 sm:mb-8 font-medium bg-card w-fit px-4 py-2 rounded-full border border-border/50 shadow-sm">
                  <MapPin size={16} className="text-primary" />
                  <span>{data.location}</span>
                </div>

                <div className="text-base sm:text-lg text-textDim space-y-4 font-medium leading-relaxed">
                  {data.fullBiography
                    .split("\n")
                    .map((paragraph: string, index: number) => (
                      <p key={index} className="text-justify sm:text-left">
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
