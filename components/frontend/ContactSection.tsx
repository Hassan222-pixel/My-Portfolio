// components/frontend/ContactSection.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  Download,
} from "lucide-react";

// --- CUSTOM BRAND ICONS (Since Lucide removed them) ---
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
// ------------------------------------------------------

export default function ContactSection({ info }: { info: any }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 border-t border-border/50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-4 mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-textMain">
          Get In Touch
        </h2>
        <div className="h-px flex-1 bg-border"></div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left Side: Contact Info & CV */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/3 space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-textMain mb-4">
              Let's Connect
            </h3>
            <p className="text-textDim leading-relaxed">
              {info?.subtitle ||
                "I'm currently available for freelance work and full-time opportunities. Send me a message and let's talk!"}
            </p>
          </div>

          <div className="space-y-6">
            {info?.email && (
              <a
                href={`mailto:${info.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-textMain">Email</p>
                  <p className="text-sm text-textDim group-hover:text-primary transition-colors">
                    {info.email}
                  </p>
                </div>
              </a>
            )}
            {info?.phone && (
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-textMain">Phone</p>
                  <p className="text-sm text-textDim">{info.phone}</p>
                </div>
              </div>
            )}
            {info?.location && (
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-textMain">
                    Location
                  </p>
                  <p className="text-sm text-textDim">{info.location}</p>
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 flex items-center gap-4">
            {info?.github && (
              <a
                href={info.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-textMain hover:bg-primary hover:text-white hover:border-primary transition-all"
              >
                <Github size={18} />
              </a>
            )}
            {info?.linkedin && (
              <a
                href={info.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-textMain hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all"
              >
                <Linkedin size={18} />
              </a>
            )}
          </div>

          {/* DOWNLOAD CV BUTTON */}
          {info?.cvFile && (
            <div className="pt-8 mt-8 border-t border-border">
              <a
                href={info.cvFile}
                download="Hassan_Awad_CV.pdf"
                className="inline-flex items-center gap-3 bg-card hover:bg-primary border border-border hover:border-primary text-textMain hover:text-white px-6 py-3.5 rounded-xl font-medium transition-all shadow-sm group w-full sm:w-auto justify-center"
              >
                <Download
                  size={20}
                  className="text-primary group-hover:text-white transition-colors"
                />
                Download Resume / CV
              </a>
            </div>
          )}
        </motion.div>

        {/* Right Side: The Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-2/3"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border p-8 rounded-2xl shadow-sm space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 block">
                  Your Name
                </label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 block">
                  Your Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-textMain mb-2 block">
                Subject
              </label>
              <input
                required
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none transition-all"
                placeholder="Project Inquiry"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-textMain mb-2 block">
                Message
              </label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-4 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none transition-all resize-y"
                placeholder="Hello Hassan, I would like to discuss..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-medium transition-all shadow-md shadow-primary/20 disabled:opacity-50"
            >
              {status === "loading" ? (
                <Loader2 size={18} className="animate-spin" />
              ) : status === "success" ? (
                <CheckCircle2 size={18} />
              ) : (
                <Send size={18} />
              )}
              {status === "success" ? "Message Sent!" : "Send Message"}
            </button>
            {status === "error" && (
              <p className="text-sm text-danger mt-2">
                Failed to send message. Please try again.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
