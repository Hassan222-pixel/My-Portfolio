"use client";

import { useEffect, useState, useRef } from "react";
import {
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  Edit2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Image as ImageIcon,
  Briefcase,
  Code,
  FileText,
  Upload,
  X,
} from "lucide-react";

interface Project {
  _id: string;
  title: string;
  workType: string;
  description: string[];
  languages: string;
  profileImage: string;
  projectImages: string[];
  order: number;
}

const WORK_TYPES = [
  "Company Project",
  "Freelance",
  "Personal Project",
  "Training / Bootcamp",
  "Open Source",
];

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<string | null>(null);

  // We use a single string for description in the form, and split it by \n before sending to DB
  const [formData, setFormData] = useState({
    title: "",
    workType: WORK_TYPES[0],
    descriptionStr: "",
    languages: "",
    profileImage: "",
    projectImages: [] as string[],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const profileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch {
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openForm = (proj?: Project) => {
    if (proj) {
      setEditingId(proj._id);
      setFormData({
        title: proj.title,
        workType: proj.workType,
        descriptionStr: proj.description.join("\n"),
        languages: proj.languages,
        profileImage: proj.profileImage,
        projectImages: proj.projectImages || [],
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        workType: WORK_TYPES[0],
        descriptionStr: "",
        languages: "",
        profileImage: "",
        projectImages: [],
      });
    }
    setView("form");
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () =>
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
    }
  };

  const handleGalleryImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          projectImages: [...prev.projectImages, reader.result as string],
        }));
      };
    });
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      projectImages: prev.projectImages.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.profileImage)
      return alert("Please upload a Profile Image for the card!");

    setIsSaving(true);
    // Convert text area to array of bullet points
    const descriptionArray = formData.descriptionStr
      .split("\n")
      .filter((line) => line.trim() !== "");
    const payload = { ...formData, description: descriptionArray };

    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage(editingId ? "Project updated!" : "Project added!");
        await fetchData();
        setView("list");
        setTimeout(() => setMessage(""), 3000);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === projects.length - 1)
    )
      return;
    const newList = [...projects];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newList[index], newList[targetIndex]] = [
      newList[targetIndex],
      newList[index],
    ];

    const reordered = newList.map((s, i) => ({ ...s, order: i }));
    setProjects(reordered);
    await fetch("/api/projects/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: reordered.map((s) => ({ id: s._id, order: s.order })),
      }),
    });
  };

  if (isLoading)
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );

  return (
    <div className="w-full max-w-[1200px] pb-16">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md pb-4 pt-4 border-b border-border flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-textMain tracking-tight">
            Projects Showcase
          </h1>
          <p className="text-sm text-textDim mt-1">
            Manage your portfolio works and case studies.
          </p>
        </div>
        {message && (
          <span className="text-sm font-medium text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full">
            <CheckCircle2 size={16} className="inline mr-2" />
            {message}
          </span>
        )}

        {view === "list" ? (
          <button
            onClick={() => openForm()}
            className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md"
          >
            <Plus size={18} /> Add Project
          </button>
        ) : (
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-2 bg-card border border-border hover:bg-background text-textMain px-5 py-2.5 rounded-xl font-medium transition-all"
          >
            <ArrowLeft size={18} /> Back to List
          </button>
        )}
      </div>

      {view === "list" && (
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 border-b border-border text-xs uppercase tracking-wider text-textDim font-semibold">
                <th className="p-5">Project Details</th>
                <th className="p-5">Type</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-textDim">
                    No projects added yet.
                  </td>
                </tr>
              )}
              {projects.map((proj, index) => (
                <tr
                  key={proj._id}
                  className="hover:bg-background/50 transition-colors group"
                >
                  <td className="p-5 flex items-center gap-4">
                    <img
                      src={proj.profileImage}
                      alt={proj.title}
                      className="w-16 h-12 object-cover rounded-md border border-border"
                    />
                    <div>
                      <p className="font-semibold text-textMain">
                        {proj.title}
                      </p>
                      <p className="text-xs text-textDim truncate max-w-xs">
                        {proj.languages}
                      </p>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-background border border-border text-xs rounded-full font-medium text-textDim whitespace-nowrap">
                      {proj.workType}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleMove(index, "up")}
                        disabled={index === 0}
                        className="p-1.5 text-textDim hover:text-textMain disabled:opacity-30"
                      >
                        <ArrowUp size={18} />
                      </button>
                      <button
                        onClick={() => handleMove(index, "down")}
                        disabled={index === projects.length - 1}
                        className="p-1.5 text-textDim hover:text-textMain disabled:opacity-30"
                      >
                        <ArrowDown size={18} />
                      </button>
                      <div className="w-px h-4 bg-border mx-1"></div>
                      <button
                        onClick={() => openForm(proj)}
                        className="p-2 text-textDim hover:text-primary"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(proj._id)}
                        className="p-2 text-textDim hover:text-danger"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === "form" && (
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="p-8 space-y-8">
            {/* Title & Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
                  <Briefcase size={16} className="text-textDim" /> Project Title
                </label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g. E-Commerce Dashboard"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
                  <FileText size={16} className="text-textDim" /> Type of Work
                </label>
                <select
                  required
                  value={formData.workType}
                  onChange={(e) =>
                    setFormData({ ...formData, workType: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none appearance-none"
                >
                  {WORK_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Languages */}
            <div>
              <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
                <Code size={16} className="text-textDim" /> Languages & Tools
                Used (Comma Separated)
              </label>
              <input
                required
                value={formData.languages}
                onChange={(e) =>
                  setFormData({ ...formData, languages: e.target.value })
                }
                placeholder="React, Node.js, Tailwind, MongoDB"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
              />
            </div>

            {/* Bullet Points Description */}
            <div>
              <label className="text-sm font-semibold text-textMain mb-2 block">
                Project Details (Bullet Points)
              </label>
              <p className="text-xs text-textDim mb-2">
                Press <strong>Enter</strong> to create a new bullet point. Do
                not type the bullet point symbol itself.
              </p>
              <textarea
                required
                value={formData.descriptionStr}
                onChange={(e) =>
                  setFormData({ ...formData, descriptionStr: e.target.value })
                }
                rows={6}
                placeholder="Developed a custom authentication system...&#10;Integrated Stripe API for payments...&#10;Improved load times by 40%..."
                className="w-full px-4 py-4 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none resize-y leading-relaxed"
              />
            </div>

            {/* Media Uploads */}
            <div className="p-6 border border-border bg-background/30 rounded-2xl space-y-8">
              {/* Profile Image (Main Card) */}
              <div>
                <h3 className="text-md font-semibold text-textMain mb-4 flex items-center gap-2">
                  <ImageIcon size={18} className="text-primary" /> Profile Image
                  (Main Card Cover)
                </h3>
                <div className="flex items-center gap-6">
                  <div
                    onClick={() => profileInputRef.current?.click()}
                    className="group relative w-48 h-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary transition-colors bg-background"
                  >
                    {formData.profileImage ? (
                      <img
                        src={formData.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-textDim">
                        <Upload size={24} className="mb-2" />
                        <span className="text-xs font-medium">
                          Click to Upload
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={profileInputRef}
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="w-full h-px bg-border"></div>

              {/* Gallery Images (Modal details) */}
              <div>
                <h3 className="text-md font-semibold text-textMain mb-2 flex items-center gap-2">
                  <ImageIcon size={18} className="text-primary" /> Project
                  Details Gallery (Optional)
                </h3>
                <p className="text-xs text-textDim mb-4">
                  Upload multiple images to showcase inside the project popup
                  modal.
                </p>

                <div className="flex flex-wrap gap-4">
                  {formData.projectImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-32 h-24 rounded-lg overflow-hidden border border-border group"
                    >
                      <img
                        src={img}
                        alt={`Gallery ${idx}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-black/60 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-danger"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  <div
                    onClick={() => galleryInputRef.current?.click()}
                    className="w-32 h-24 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors bg-background text-textDim hover:text-primary"
                  >
                    <Plus size={20} className="mb-1" />
                    <span className="text-[10px] font-medium uppercase">
                      Add Image
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={galleryInputRef}
                    onChange={handleGalleryImagesChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-md shadow-primary/20 disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <CheckCircle2 size={18} />
                )}
                {editingId ? "Save Changes" : "Publish Project"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
