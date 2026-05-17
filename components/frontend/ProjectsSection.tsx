"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  ChevronRight,
  ChevronLeft,
  FolderGit2,
  LayoutGrid,
} from "lucide-react";

export default function ProjectsSection({ data }: { data: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  if (!data || data.length === 0) return null;

  const openModal = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    if (!selectedProject) return;
    const gallery = [
      selectedProject.profileImage,
      ...(selectedProject.projectImages || []),
    ];
    setCurrentImageIndex((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    if (!selectedProject) return;
    const gallery = [
      selectedProject.profileImage,
      ...(selectedProject.projectImages || []),
    ];
    setCurrentImageIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1,
    );
  };

  return (
    <section
      id="projects"
      className="w-full max-w-[1400px] mx-auto bg-card/20 border border-border/40 py-12 md:py-16 my-8 relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem]"
    >
      {/* Ambient background texture */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="px-6 sm:px-10 md:px-16 lg:px-20 relative z-10">
        {/* ── Section Header ── */}
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
                My Portfolio
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-textMain tracking-tight">
                Featured Projects
              </h2>
            </div>
            
          </div>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-primary/30 via-border/60 to-transparent" />
        </motion.div>

        {/* ── Grid of Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {data.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => openModal(project)}
              className="group bg-background/80 backdrop-blur-md border border-border/60 rounded-3xl overflow-hidden hover:border-primary/40 shadow-xl shadow-black/5 hover:shadow-primary/10 transition-all duration-500 flex flex-col cursor-pointer"
            >
              {/* Image Banner */}
              <div className="relative w-full h-56 overflow-hidden bg-card border-b border-border/50">
                <img
                  src={project.profileImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

                <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  {project.workType}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1 relative z-10 -mt-6">
                <h3 className="text-xl md:text-2xl font-black text-textMain mb-3 group-hover:text-primary transition-colors leading-tight italic">
                  {project.title}
                </h3>

                <p className="text-sm text-textDim mb-6 line-clamp-2 leading-relaxed font-medium">
                  {project.description[0]}
                </p>

                <div className="mt-auto pt-5 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <LayoutGrid size={14} className="text-primary shrink-0" />
                    <p className="text-[10px] font-black uppercase tracking-wider text-textDim truncate">
                      {project.languages.split(",").slice(0, 3).join(", ")}
                      {project.languages.split(",").length > 3 && "..."}
                    </p>
                  </div>

                  <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-primary group-hover:translate-x-1 transition-transform">
                    View <ExternalLink size={14} strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── PROJECT DETAILS MODAL ── */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pt-24 pb-6 md:p-8 md:pt-28 md:pb-8">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeModal}
                className="absolute inset-0 bg-background/90 backdrop-blur-md"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-6xl h-full max-h-[calc(100vh-7rem)] bg-card border border-border/60 rounded-3xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10"
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-50 p-2.5 bg-black/50 backdrop-blur-md text-white hover:bg-danger rounded-full transition-colors shadow-lg"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>

                {/* Left Panel: Image Gallery */}
                <div className="w-full lg:w-[55%] flex flex-col bg-background/50 border-b lg:border-b-0 lg:border-r border-border/50">
                  <div className="relative w-full min-h-[250px] lg:min-h-0 flex-1 bg-black/10 flex items-center justify-center p-4 md:p-8">
                    <img
                      src={
                        [
                          selectedProject.profileImage,
                          ...(selectedProject.projectImages || []),
                        ][currentImageIndex]
                      }
                      alt="Project Preview"
                      className="w-full h-full object-contain drop-shadow-2xl animate-in fade-in duration-500"
                      key={currentImageIndex}
                    />

                    {[
                      selectedProject.profileImage,
                      ...(selectedProject.projectImages || []),
                    ].length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/40 hover:bg-primary border border-white/10 text-white rounded-full transition-all shadow-md"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-black/40 hover:bg-primary border border-white/10 text-white rounded-full transition-all shadow-md"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails (Fixed Scrollbars) */}
                  {[
                    selectedProject.profileImage,
                    ...(selectedProject.projectImages || []),
                  ].length > 1 && (
                    <div className="w-full bg-card border-t border-border/50 shrink-0">
                      {/* Inner wrapper adds margins so the scrollbar track doesn't hit the physical edges */}
                      <div className="flex items-center gap-3 overflow-x-auto overflow-y-hidden custom-scrollbar py-4 px-2 mx-3 mb-3 md:mx-5 md:mb-4">
                        {[
                          selectedProject.profileImage,
                          ...(selectedProject.projectImages || []),
                        ].map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                              currentImageIndex === idx
                                ? "border-primary scale-105"
                                : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={img}
                              className="w-full h-full object-cover"
                              alt={`Thumbnail ${idx}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Panel: Project Details */}
                <div className="w-full lg:w-[45%] h-full overflow-y-auto custom-scrollbar p-6 md:p-10 flex flex-col bg-card">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest rounded-full w-fit mb-4">
                    <FolderGit2 size={14} /> {selectedProject.workType}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black text-textMain mb-6 leading-tight">
                    {selectedProject.title}
                  </h2>

                  <div className="mb-8 flex-1">
                    <h4 className="text-[10px] font-black text-textDim uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-4 h-px bg-border"></span>
                      Project Overview
                    </h4>
                    <ul className="space-y-4">
                      {selectedProject.description.map(
                        (point: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-textMain text-sm md:text-base leading-relaxed font-medium"
                          >
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                            <span className="opacity-90">{point}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-border/50 shrink-0">
                    <h4 className="text-[10px] font-black text-textDim uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <span className="w-4 h-px bg-border"></span>
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.languages
                        .split(",")
                        .map((lang: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-background border border-border text-textMain text-[10px] font-black uppercase tracking-wider rounded-lg shadow-sm"
                          >
                            {lang.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
