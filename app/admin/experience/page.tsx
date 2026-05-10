"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  Edit2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  Code,
} from "lucide-react";

interface Experience {
  _id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  location: string;
  description: string;
  skills: string;
  order: number;
}

export default function ExperienceAdmin() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    location: "",
    description: "",
    skills: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/experience", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setExperiences(data.data);
    } catch (error) {
      setExperiences([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openForm = (exp?: Experience) => {
    if (exp) {
      setEditingId(exp._id);
      setFormData({
        title: exp.title,
        organization: exp.organization,
        startDate: exp.startDate,
        endDate: exp.endDate,
        isCurrent: exp.isCurrent,
        location: exp.location,
        description: exp.description,
        skills: exp.skills,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        organization: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        location: "",
        description: "",
        skills: "",
      });
    }
    setView("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Safety check: if current, force endDate to be empty
    const payload = {
      ...formData,
      endDate: formData.isCurrent ? "Present" : formData.endDate,
    };

    try {
      const url = editingId
        ? `/api/experience/${editingId}`
        : "/api/experience";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage(editingId ? "Experience updated!" : "Experience added!");
        await fetchData();
        setView("list");
        setTimeout(() => setMessage(""), 3000);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience?")) return;
    await fetch(`/api/experience/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === experiences.length - 1)
    )
      return;
    const newExp = [...experiences];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newExp[index], newExp[targetIndex]] = [newExp[targetIndex], newExp[index]];

    const reordered = newExp.map((s, i) => ({ ...s, order: i }));
    setExperiences(reordered);
    await fetch("/api/experience/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: reordered.map((s) => ({ id: s._id, order: s.order })),
      }),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target as any;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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
            Experience
          </h1>
          <p className="text-sm text-textDim mt-1">
            Manage your work history and roles.
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
            <Plus size={18} /> Add Experience
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

      {/* VIEW 1: THE DATA TABLE */}
      {view === "list" && (
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background/50 border-b border-border text-xs uppercase tracking-wider text-textDim font-semibold">
                <th className="p-5">Role & Company</th>
                <th className="p-5">Duration</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {experiences.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-textDim">
                    No experience added yet.
                  </td>
                </tr>
              )}
              {experiences.map((exp, index) => (
                <tr
                  key={exp._id}
                  className="hover:bg-background/50 transition-colors group"
                >
                  <td className="p-5">
                    <p className="font-semibold text-textMain text-lg">
                      {exp.title}
                    </p>
                    <p className="text-sm text-textDim flex items-center gap-1 mt-1">
                      <Building2 size={14} /> {exp.organization}
                    </p>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-xs rounded-full font-medium whitespace-nowrap">
                      {exp.startDate} -{" "}
                      {exp.isCurrent ? "Present" : exp.endDate}
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
                        disabled={index === experiences.length - 1}
                        className="p-1.5 text-textDim hover:text-textMain disabled:opacity-30"
                      >
                        <ArrowDown size={18} />
                      </button>
                      <div className="w-px h-4 bg-border mx-1"></div>
                      <button
                        onClick={() => openForm(exp)}
                        className="p-2 text-textDim hover:text-primary"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(exp._id)}
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

      {/* VIEW 2: THE FORM */}
      {view === "form" && (
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
                  <Briefcase size={16} className="text-textDim" /> Job Title
                </label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Developer"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
                  <Building2 size={16} className="text-textDim" /> Organization
                  / Company
                </label>
                <input
                  required
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="e.g. Google"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
                  <MapPin size={16} className="text-textDim" /> Location
                </label>
                <input
                  required
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Remote, New York"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
                  <Code size={16} className="text-textDim" /> Skills Gained
                  (Comma Separated)
                </label>
                <input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, Leadership"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
                />
              </div>
            </div>

            <div className="p-5 border border-border bg-background/50 rounded-xl space-y-5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-textMain flex items-center gap-2">
                  <Calendar size={16} className="text-textDim" /> Time Period
                </label>
                <label className="flex items-center gap-2 text-sm text-primary cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    name="isCurrent"
                    checked={formData.isCurrent}
                    onChange={handleChange}
                    className="w-4 h-4 accent-primary"
                  />
                  I currently work here
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    required
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    placeholder="e.g. Jan 2022"
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-textMain focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <input
                    required={!formData.isCurrent}
                    disabled={formData.isCurrent}
                    name="endDate"
                    value={formData.isCurrent ? "Present" : formData.endDate}
                    onChange={handleChange}
                    placeholder="e.g. Dec 2023"
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-textMain focus:border-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-textMain mb-2 block">
                Role Description
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your responsibilities and achievements..."
                className="w-full px-4 py-4 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none resize-y"
              />
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
                {editingId ? "Save Changes" : "Publish Experience"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
