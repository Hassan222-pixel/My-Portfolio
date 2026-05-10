"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  ChevronRight,
  ChevronLeft,
  FolderGit2,
} from "lucide-react";

export default function ProjectsSection({ data }: { data: any[] }) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!data || data.length === 0) return null;

  const openModal = (project: any) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    // Prevent scrolling on the body when modal is open
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto";
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
    <section id="projects" className="py-24 border-t border-border/50 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-textMain">
          Featured Projects
        </h2>
        <div className="h-px flex-1 bg-border"></div>
      </motion.div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col"
          >
            {/* Image Banner */}
            <div className="relative w-full h-48 overflow-hidden bg-background">
              <img
                src={project.profileImage}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                {project.workType}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-textMain mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-textDim mb-6 line-clamp-2 leading-relaxed">
                {project.description[0]}{" "}
                {/* Show a sneak peek of the first bullet point */}
              </p>

              <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                <p className="text-xs font-medium text-textDim truncate max-w-[60%]">
                  {project.languages.split(",").slice(0, 3).join(", ")}{" "}
                  {project.languages.split(",").length > 3 && "..."}
                </p>
                <button
                  onClick={() => openModal(project)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-blue-500 transition-colors"
                >
                  View Details <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
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
              className="relative w-full max-w-5xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white hover:bg-danger rounded-full transition-colors backdrop-blur-md"
              >
                <X size={20} />
              </button>

              {/* Left: Image Gallery */}
              <div className="w-full md:w-1/2 bg-background relative flex flex-col border-b md:border-b-0 md:border-r border-border">
                <div className="relative flex-1 min-h-[300px] flex items-center justify-center bg-black">
                  <img
                    src={
                      [
                        selectedProject.profileImage,
                        ...(selectedProject.projectImages || []),
                      ][currentImageIndex]
                    }
                    alt="Gallery"
                    className="w-full h-full object-contain animate-in fade-in duration-300"
                    key={currentImageIndex} // forces re-render for animation
                  />
                  {[
                    selectedProject.profileImage,
                    ...(selectedProject.projectImages || []),
                  ].length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {[
                  selectedProject.profileImage,
                  ...(selectedProject.projectImages || []),
                ].length > 1 && (
                  <div className="h-20 bg-card border-t border-border flex items-center gap-2 px-4 overflow-x-auto custom-scrollbar shrink-0">
                    {[
                      selectedProject.profileImage,
                      ...(selectedProject.projectImages || []),
                    ].map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-colors ${currentImageIndex === idx ? "border-primary" : "border-transparent opacity-50 hover:opacity-100"}`}
                      >
                        <img src={img} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Project Details */}
              <div className="w-full md:w-1/2 p-8 overflow-y-auto custom-scrollbar flex flex-col">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full w-fit mb-4">
                  <FolderGit2 size={14} /> {selectedProject.workType}
                </div>

                <h2 className="text-3xl font-bold text-textMain mb-6">
                  {selectedProject.title}
                </h2>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-textMain uppercase tracking-wider mb-3">
                    About the Project
                  </h4>
                  <ul className="space-y-3">
                    {selectedProject.description.map(
                      (point: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-textDim text-sm leading-relaxed"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                          {point}
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="mt-auto">
                  <h4 className="text-sm font-semibold text-textMain uppercase tracking-wider mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.languages
                      .split(",")
                      .map((lang: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-background border border-border text-textMain text-xs font-medium rounded-lg"
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
    </section>
  );
}
