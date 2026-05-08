"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Star,
  Loader2,
  CheckCircle2,
  Edit2,
  ArrowUp,
  ArrowDown,
  X,
} from "lucide-react";

interface Category {
  _id: string;
  name: string;
}
interface Skill {
  _id: string;
  name: string;
  category: string;
  icon: string;
  featured: boolean;
  order: number;
}

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    icon: "",
    featured: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    const [skillsRes, catRes] = await Promise.all([
      fetch("/api/skills").then((res) => res.json()),
      fetch("/api/categories").then((res) => res.json()),
    ]);
    if (catRes.success) {
      setCategories(catRes.data);
      if (catRes.data.length > 0 && !formData.category) {
        setFormData((prev) => ({ ...prev, category: catRes.data[0].name }));
      }
    }
    if (skillsRes.success) setSkills(skillsRes.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (categories.length === 0)
      return alert("Please add a category in the Categories tab first!");

    setIsSaving(true);
    const url = editingId ? `/api/skills/${editingId}` : "/api/skills";
    const res = await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage(editingId ? "Skill updated!" : "Skill added!");
      setFormData({
        name: "",
        category: categories.length > 0 ? categories[0].name : "",
        icon: "",
        featured: false,
      });
      setEditingId(null);
      fetchData();
      setTimeout(() => setMessage(""), 3000);
    }
    setIsSaving(false);
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill._id);
    setFormData({
      name: skill.name,
      category: skill.category,
      icon: skill.icon,
      featured: skill.featured,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm("Delete this skill?")) return;
    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === skills.length - 1)
    )
      return;

    const newSkills = [...skills];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newSkills[index], newSkills[targetIndex]] = [
      newSkills[targetIndex],
      newSkills[index],
    ];

    const reordered = newSkills.map((s, i) => ({ ...s, order: i }));
    setSkills(reordered); // Updates UI instantly

    // Updates Database
    await fetch("/api/skills/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: reordered.map((s) => ({ id: s._id, order: s.order })),
      }),
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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
    <div className="w-full max-w-[1600px] pb-16">
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md pb-4 pt-4 border-b border-border flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-textMain tracking-tight">
          Skills Arsenal
        </h1>
        {message && (
          <span className="text-sm font-medium text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full">
            <CheckCircle2 size={16} className="inline mr-2" />
            {message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Skill Form ONLY */}
        <div className="lg:col-span-1 space-y-6">
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden sticky top-32"
          >
            <div
              className={`p-6 border-b border-border bg-background/30 flex justify-between items-center ${editingId ? "bg-primary/5" : ""}`}
            >
              <h2 className="text-lg font-semibold text-textMain flex items-center gap-2">
                {editingId ? (
                  <>
                    <Edit2 size={20} className="text-primary" /> Edit Skill
                  </>
                ) : (
                  <>
                    <Plus size={20} className="text-primary" /> Add New Skill
                  </>
                )}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      ...formData,
                      name: "",
                      icon: "",
                      featured: false,
                    });
                  }}
                  className="text-textDim hover:text-danger"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 block">
                  Skill Name
                </label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 block">
                  Category
                </label>
                <select
                  required
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none appearance-none"
                >
                  {categories.length === 0 ? (
                    <option value="">Add a category first...</option>
                  ) : (
                    categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-textMain mb-2 block">
                  Icon Slug
                </label>
                <input
                  required
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-textMain focus:border-primary outline-none"
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-background rounded-xl border border-border mt-2">
                <label className="text-sm font-semibold text-textMain flex items-center gap-2">
                  <Star
                    size={16}
                    className={
                      formData.featured
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-textDim"
                    }
                  />{" "}
                  Featured Skill
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : editingId ? (
                  <Edit2 size={18} />
                ) : (
                  <Plus size={18} />
                )}
                {editingId ? "Update Skill" : "Add Skill"}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Table */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background/50 border-b border-border text-xs uppercase tracking-wider text-textDim font-semibold">
                  <th className="p-5">Skill Name</th>
                  <th className="p-5">Category</th>
                  <th className="p-5 text-center">Featured</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {skills.map((skill, index) => (
                  <tr
                    key={skill._id}
                    className={`hover:bg-background/50 transition-colors group ${editingId === skill._id ? "bg-primary/5" : ""}`}
                  >
                    <td className="p-5 font-semibold text-textMain">
                      {skill.name}
                    </td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-background border border-border text-xs rounded-full text-textDim">
                        {skill.category}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      {skill.featured ? (
                        <Star
                          size={18}
                          className="text-yellow-500 fill-yellow-500 mx-auto"
                        />
                      ) : (
                        <span className="text-textDim">-</span>
                      )}
                    </td>

                    <td className="p-5 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleMove(index, "up")}
                          disabled={index === 0}
                          className="p-1.5 text-textDim hover:text-textMain disabled:opacity-30"
                        >
                          <ArrowUp size={18} />
                        </button>
                        <button
                          onClick={() => handleMove(index, "down")}
                          disabled={index === skills.length - 1}
                          className="p-1.5 text-textDim hover:text-textMain disabled:opacity-30"
                        >
                          <ArrowDown size={18} />
                        </button>
                        <div className="w-px h-4 bg-border mx-1"></div>
                        <button
                          onClick={() => handleEdit(skill)}
                          className="p-1.5 text-textDim hover:text-primary"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteSkill(skill._id)}
                          className="p-1.5 text-textDim hover:text-danger"
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
        </div>
      </div>
    </div>
  );
}
