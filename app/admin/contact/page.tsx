// app/admin/contact/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Save,
  Loader2,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  FileText,
  Trash2,
} from "lucide-react";

// --- CUSTOM BRAND ICONS ---
const Github = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
// --------------------------

export default function ContactAdmin() {
  const [formData, setFormData] = useState({
    subtitle: "",
    email: "",
    phone: "",
    location: "",
    github: "",
    linkedin: "",
    cvFile: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/contact-info")
      .then((res) => res.json())
      .then((data) => {
        // FIXED: Merge the data so cvFile doesn't get overwritten with undefined
        if (data.success && data.data) {
          setFormData((prev) => ({ ...prev, ...data.data }));
        }
        setIsLoading(false);
      });
  }, []);

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf")
        return alert("Please upload a PDF file only.");
      if (file.size > 5 * 1024 * 1024)
        return alert("File is too large! Maximum is 5MB.");

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, cvFile: reader.result as string }));
      };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/contact-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // If this payload is too big, Next.js will block it
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Contact info & CV saved!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        // FIXED: Catch silent payload errors
        alert(
          "Failed to save! If your PDF is too large, try compressing it to under 2MB.",
        );
      }
    } catch (error) {
      alert("A network error occurred while saving.");
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
            Contact Info & CV
          </h1>
          <p className="text-sm text-textDim mt-1">
            Manage your public contact details, social links, and Resume.
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

      <div className="bg-card border border-border rounded-2xl shadow-sm p-8 space-y-6">
        <div>
          <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
            <MessageSquare size={16} className="text-textDim" /> Subtitle / Hook
          </label>
          <textarea
            name="subtitle"
            value={formData.subtitle || ""}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none resize-none"
            placeholder="e.g. Let's work together to build something great."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
              <Mail size={16} className="text-textDim" /> Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
              <Phone size={16} className="text-textDim" /> Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
              <MapPin size={16} className="text-textDim" /> Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
            />
          </div>
        </div>

        <hr className="border-border my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-textMain mb-2 flex items-center gap-2">
              <Github size={16} className="text-textDim" /> GitHub URL
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
              <Linkedin size={16} className="text-textDim" /> LinkedIn URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin || ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
            />
          </div>
        </div>

        {/* CV UPLOAD SECTION */}
        <div className="mt-4 p-6 bg-background/50 border border-border rounded-xl">
          <label className="text-sm font-semibold text-textMain mb-3 flex items-center gap-2">
            <FileText size={18} className="text-primary" /> Upload Resume / CV
            (PDF)
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            <input
              type="file"
              accept=".pdf"
              onChange={handleCvChange}
              className="block w-full sm:w-auto text-sm text-textDim file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-blue-600 cursor-pointer transition-colors"
            />
            {/* Added a visual Remove button to easily clear the CV */}
            {formData.cvFile && (
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-emerald-500 font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                  <CheckCircle2 size={16} /> CV Saved
                </span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, cvFile: "" })}
                  className="text-xs font-semibold text-danger hover:underline flex items-center gap-1"
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            )}
          </div>
          <p className="text-xs text-textDim mt-3">
            Try to keep your PDF under 2MB for the fastest download speeds!
          </p>
        </div>
      </div>
    </form>
  );
}
