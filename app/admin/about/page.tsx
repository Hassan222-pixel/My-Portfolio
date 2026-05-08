// app/admin/about/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Save,
  Loader2,
  CheckCircle2,
  UserCircle,
  MapPin,
  FileText,
  AlignLeft,
} from "lucide-react";

export default function AboutAdmin() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    fullBiography: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFormData({
            title: data.data.title || "",
            location: data.data.location || "",
            fullBiography: data.data.fullBiography || "",
          });
        }
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    const res = await fetch("/api/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage("About section updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
    setIsSaving(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading)
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md pb-4 pt-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-textMain tracking-tight">
            About Me
          </h1>
          <p className="text-sm text-textDim mt-1">
            Manage your personal details and full story.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {message && (
            <span className="flex items-center gap-2 text-sm font-medium text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full animate-in fade-in slide-in-from-right-4">
              <CheckCircle2 size={16} /> {message}
            </span>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:shadow-none"
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* Details Card */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-background/30">
          <h2 className="text-lg font-semibold text-textMain flex items-center gap-2">
            <UserCircle size={20} className="text-primary" /> Profile Details
          </h2>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-textMain mb-2">
                <FileText size={16} className="text-textDim" /> Section Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-textMain mb-2">
                <MapPin size={16} className="text-textDim" /> Current Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Biography Card */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-background/30">
          <h2 className="text-lg font-semibold text-textMain flex items-center gap-2">
            <AlignLeft size={20} className="text-primary" /> The Full Story
          </h2>
        </div>
        <div className="p-8">
          <label className="sr-only">Full Biography</label>
          <textarea
            name="fullBiography"
            value={formData.fullBiography}
            onChange={handleChange}
            rows={8}
            className="w-full px-4 py-4 bg-background border border-border rounded-xl text-textMain focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none leading-relaxed"
          />
          <p className="text-sm text-textDim mt-3">
            Press Enter twice to create new paragraphs. These will be formatted
            beautifully on your public site.
          </p>
        </div>
      </div>
    </form>
  );
}
