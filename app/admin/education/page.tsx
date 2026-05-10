// app/admin/education/page.tsx
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
  GraduationCap,
  MapPin,
  Calendar,
  School,
  BookOpen,
} from "lucide-react";

interface Education {
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

export default function EducationAdmin() {
  const [educationList, setEducationList] = useState<Education[]>([]);
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
      const res = await fetch("/api/education", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setEducationList(data.data);
    } catch {
      setEducationList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openForm = (edu?: Education) => {
    if (edu) {
      setEditingId(edu._id);
      setFormData({
        title: edu.title,
        organization: edu.organization,
        startDate: edu.startDate,
        endDate: edu.endDate,
        isCurrent: edu.isCurrent,
        location: edu.location,
        description: edu.description,
        skills: edu.skills,
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
    const payload = {
      ...formData,
      endDate: formData.isCurrent ? "Present" : formData.endDate,
    };

    try {
      const url = editingId ? `/api/education/${editingId}` : "/api/education";
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage(editingId ? "Education updated!" : "Education added!");
        await fetchData();
        setView("list");
        setTimeout(() => setMessage(""), 3000);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this education record?")) return;
    await fetch(`/api/education/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === educationList.length - 1)
    )
      return;
    const newList = [...educationList];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newList[index], newList[targetIndex]] = [
      newList[targetIndex],
      newList[index],
    ];

    const reordered = newList.map((s, i) => ({ ...s, order: i }));
    setEducationList(reordered);
    await fetch("/api/education/reorder", {
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
            Education
          </h1>
          <p className="text-sm text-textDim mt-1">
            Manage your academic background and certifications.
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
            <Plus size={18} /> Add Education
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
                <th className="p-5">Degree & Institution</th>
                <th className="p-5">Duration</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {educationList.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-textDim">
                    No education added yet.
                  </td>
                </tr>
              )}
              {educationList.map((edu, index) => (
                <tr
                  key={edu._id}
                  className="hover:bg-background/50 transition-colors group"
                >
                  <td className="p-5">
                    <p className="font-semibold text-textMain text-lg">
                      {edu.title}
                    </p>
                    <p className="text-sm text-textDim flex items-center gap-1 mt-1">
                      <School size={14} /> {edu.organization}
                    </p>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 text-xs rounded-full font-medium whitespace-nowrap">
                      {edu.startDate} -{" "}
                      {edu.isCurrent ? "Present" : edu.endDate}
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
                        disabled={index === educationList.length - 1}
                        className="p-1.5 text-textDim hover:text-textMain disabled:opacity-30"
                      >
                        <ArrowDown size={18} />
                      </button>
                      <div className="w-px h-4 bg-border mx-1"></div>
                      <button
                        onClick={() => openForm(edu)}
                        className="p-2 text-textDim hover:text-primary"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(edu._id)}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
                  <GraduationCap size={16} className="text-textDim" /> Degree /
                  Certificate Title
                </label>
                <input
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. B.S. Computer Science"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
                  <School size={16} className="text-textDim" /> Institution /
                  University
                </label>
                <input
                  required
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="e.g. MIT"
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
                  placeholder="e.g. Boston, MA"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
                  <BookOpen size={16} className="text-textDim" /> Key Topics /
                  Skills (Comma Separated)
                </label>
                <input
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Data Structures, Algorithms, Calculus"
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
                  I am currently studying here
                </label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    required
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    placeholder="e.g. Sep 2018"
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
                    placeholder="e.g. May 2022"
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl text-textMain focus:border-primary outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-textMain mb-2 block">
                Description
              </label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your coursework, honors, and activities..."
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
                {editingId ? "Save Changes" : "Publish Education"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
