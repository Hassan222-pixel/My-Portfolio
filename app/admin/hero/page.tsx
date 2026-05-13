// app/admin/hero/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Save,
  Loader2,
  CheckCircle2,
  Image as ImageIcon,
  LayoutTemplate,
  Plus,
  Trash2,
} from "lucide-react";

export default function HeroAdmin() {
  const [formData, setFormData] = useState({
    topBadge: "",
    greeting: "",
    name: "",
    headline: "",
    smallDescription: "",
    imageUrl: "",
  });

  const [badges, setBadges] = useState<
    { iconUrl: string; title: string; subtitle: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFormData({
            topBadge: data.data.topBadge || "",
            greeting: data.data.greeting || "",
            name: data.data.name || "",
            headline: data.data.headline || "",
            smallDescription: data.data.smallDescription || "",
            imageUrl: data.data.imageUrl || "",
          });
          if (data.data.badges) setBadges(data.data.badges);
        }
        setIsLoading(false);
      });
  }, []);

  // PROPER IMAGE UPLOADER LOGIC
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/hero", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, badges }), // Merges the text fields and the badges array
      });
      if (res.ok) {
        setMessage("Hero section saved!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        alert("Failed to save. File might be too large.");
      }
    } catch (error) {
      alert("Network error. Failed to save.");
    }
    setIsSaving(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addBadge = () =>
    setBadges([...badges, { iconUrl: "", title: "", subtitle: "" }]);
  const updateBadge = (index: number, field: string, value: string) => {
    const newBadges = [...badges];
    newBadges[index] = { ...newBadges[index], [field]: value };
    setBadges(newBadges);
  };
  const removeBadge = (index: number) =>
    setBadges(badges.filter((_, i) => i !== index));

  if (isLoading)
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[1200px] pb-16">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md pb-4 pt-4 border-b border-border flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-textMain tracking-tight">
            Hero Section
          </h1>
          <p className="text-sm text-textDim mt-1">
            Manage your main homepage content and dynamic floating badges.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {message && (
            <span className="flex items-center gap-2 text-sm font-medium text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full">
              <CheckCircle2 size={16} /> {message}
            </span>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-md disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}{" "}
            Save Changes
          </button>
        </div>
      </div>

      <div className="space-y-8">
        <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
          <h2 className="text-lg font-bold text-textMain mb-6 flex items-center gap-2">
            <LayoutTemplate size={20} className="text-primary" /> Core Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-semibold text-textMain mb-2 block">
                Top Badge (e.g. Computer Eng Graduate)
              </label>
              <input
                name="topBadge"
                value={formData.topBadge}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-textMain mb-2 block">
                Greeting (e.g. Hi, I'm)
              </label>
              <input
                name="greeting"
                value={formData.greeting}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-textMain mb-2 block">
                Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-textMain mb-2 block">
                Professional Headline
              </label>
              <input
                name="headline"
                value={formData.headline}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-textMain mb-2 block">
              Short Biography (Hero Description)
            </label>
            <textarea
              name="smallDescription"
              value={formData.smallDescription}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none resize-none"
            />
          </div>
        </div>

        {/* RESTORED IMAGE UPLOADER */}
        <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
          <h2 className="text-lg font-bold text-textMain mb-6 flex items-center gap-2">
            <ImageIcon size={20} className="text-primary" /> Profile Image
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full max-w-md text-sm text-textDim file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-600 cursor-pointer transition-colors"
            />
            {formData.imageUrl && (
              <div className="mt-4 p-4 border border-border bg-background/50 rounded-xl inline-block">
                <p className="text-xs font-semibold text-textDim mb-3 uppercase tracking-wider">
                  Current Image Preview
                </p>
                <img
                  src={formData.imageUrl}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full border-4 border-card shadow-lg"
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-textMain flex items-center gap-2">
                <LayoutTemplate size={20} className="text-primary" /> Floating
                Badges
              </h2>
              <p className="text-xs text-textDim mt-1">
                Add up to 4 dynamic badges to orbit your profile picture.
              </p>
            </div>
            <button
              type="button"
              onClick={addBadge}
              disabled={badges.length >= 4}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} /> Add Badge
            </button>
          </div>

          <div className="space-y-4">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-border bg-background/50 rounded-xl relative group"
              >
                <div className="w-full md:w-1/3">
                  <label className="text-xs text-textDim mb-1 block">
                    Icon Image (URL / Base64)
                  </label>
                  <input
                    placeholder="Icon Link"
                    value={badge.iconUrl}
                    onChange={(e) =>
                      updateBadge(index, "iconUrl", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg outline-none text-sm focus:border-primary"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <label className="text-xs text-textDim mb-1 block">
                    Top Title
                  </label>
                  <input
                    placeholder="e.g. Stack"
                    value={badge.title}
                    onChange={(e) =>
                      updateBadge(index, "title", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg outline-none text-sm focus:border-primary"
                  />
                </div>
                <div className="w-full md:w-1/3">
                  <label className="text-xs text-textDim mb-1 block">
                    Bottom Value
                  </label>
                  <input
                    placeholder="e.g. Next.js"
                    value={badge.subtitle}
                    onChange={(e) =>
                      updateBadge(index, "subtitle", e.target.value)
                    }
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg outline-none text-sm font-bold focus:border-primary"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeBadge(index)}
                  className="absolute top-2 right-2 md:relative md:top-0 md:right-0 w-8 h-8 flex items-center justify-center bg-danger/10 text-danger rounded-lg hover:bg-danger hover:text-white transition-colors shrink-0 md:mt-5"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
