// app/admin/hero/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import {
  Save,
  Loader2,
  Image as ImageIcon,
  Upload,
  User,
  Type,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function HeroAdmin() {
  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    smallDescription: "",
    imageUrl: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFormData({
            name: data.data.name || "",
            headline: data.data.headline || "",
            smallDescription: data.data.smallDescription || "",
            imageUrl: data.data.imageUrl || "",
          });
        }
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    const res = await fetch("/api/hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage("Hero section updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
    setIsSaving(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () =>
        setFormData({ ...formData, imageUrl: reader.result as string });
    }
  };

  if (isLoading)
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Sticky Header with Action Button */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md pb-4 pt-4 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-textMain tracking-tight">
            Hero Section
          </h1>
          <p className="text-sm text-textDim mt-1">
            Manage your introduction and profile picture.
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

      {/* Media Card */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-background/30">
          <h2 className="text-lg font-semibold text-textMain flex items-center gap-2">
            <ImageIcon size={20} className="text-primary" /> Visual Identity
          </h2>
        </div>
        <div className="p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative w-40 h-40 shrink-0 rounded-full border-4 border-background shadow-lg overflow-hidden bg-background flex items-center justify-center cursor-pointer ring-2 ring-border hover:ring-primary transition-all"
          >
            {formData.imageUrl ? (
              <img
                src={formData.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <ImageIcon size={48} className="text-textDim" />
            )}
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              <Upload size={28} className="text-white mb-2" />
              <span className="text-white text-sm font-medium">
                Change Photo
              </span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left pt-4">
            <h3 className="text-lg font-semibold text-textMain">
              Profile Picture
            </h3>
            <p className="text-sm text-textDim mt-2 max-w-md">
              This is the first image people will see. We recommend a square
              image, at least 400x400px, with a clean background.
            </p>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border bg-background/30">
          <h2 className="text-lg font-semibold text-textMain flex items-center gap-2">
            <FileText size={20} className="text-primary" /> Core Content
          </h2>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-textMain mb-2">
                <User size={16} className="text-textDim" /> Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-textMain mb-2">
                <Type size={16} className="text-textDim" /> Professional
                Headline
              </label>
              <input
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-textMain mb-2">
              <FileText size={16} className="text-textDim" /> Short Biography
              (Hero Description)
            </label>
            <textarea
              name="smallDescription"
              value={formData.smallDescription}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-y"
            />
            <p className="text-xs text-textDim mt-2">
              Keep it punchy. This goes directly below your headline.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
