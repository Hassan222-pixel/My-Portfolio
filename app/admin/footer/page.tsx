"use client";
import { useEffect, useState } from "react";
import {
  Save,
  Loader2,
  CheckCircle2,
  Type,
  AtSign,
  Link as LinkIcon,
} from "lucide-react";

export default function FooterAdmin() {
  const [formData, setFormData] = useState({
    aboutText: "",
    github: "",
    linkedin: "",
    instagram: "",
    email: "",
    copyrightName: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/footer")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFormData((prev) => ({ ...prev, ...data.data }));
        }
        setIsLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/footer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Footer saved!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      alert("Error saving footer data.");
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
    <form onSubmit={handleSubmit} className="w-full max-w-[1200px] pb-16">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md pb-4 pt-4 border-b border-border flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-textMain tracking-tight">
            Footer Settings
          </h1>
          <p className="text-sm text-textDim mt-1">
            Manage the content displayed at the bottom of your site.
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
            Save Footer
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm p-8 space-y-6">
        <div>
          <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
            <Type size={16} className="text-textDim" /> About Text
          </label>
          <textarea
            name="aboutText"
            value={formData.aboutText || ""}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none resize-none"
            placeholder="Building fast, scalable, and visually engaging digital experiences."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
              <AtSign size={16} className="text-textDim" /> Copyright Name
            </label>
            <input
              type="text"
              name="copyrightName"
              value={formData.copyrightName || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
              placeholder="Hassan Awad"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
              <AtSign size={16} className="text-textDim" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
              <LinkIcon size={16} className="text-textDim" /> GitHub URL
            </label>
            <input
              type="url"
              name="github"
              value={formData.github || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
              <LinkIcon size={16} className="text-textDim" /> LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
              <LinkIcon size={16} className="text-textDim" /> Instagram URL
            </label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
