// app/admin/categories/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  Edit2,
  X,
  Layers,
} from "lucide-react";

interface Category {
  _id: string;
  name: string;
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchCategories = async () => {
    try {
      // Adding cache: 'no-store' forces the browser to get fresh data immediately
      const res = await fetch("/api/categories", { cache: "no-store" });

      // If the server returns a 500 or 404 error, stop here before trying to parse JSON
      if (!res.ok) throw new Error("Server returned an error");

      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
      // Failsafe: keep categories empty so the page doesn't crash
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = editingId
        ? `/api/categories/${editingId}`
        : "/api/categories";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setMessage(editingId ? "Category updated!" : "Category added!");
        setName("");
        setEditingId(null);
        await fetchCategories(); // Re-fetch immediately
        setTimeout(() => setMessage(""), 3000);
      } else {
        alert("Something went wrong saving the category.");
      }
    } catch (error) {
      console.error("Failed to save:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat._id);
    setName(cat.name);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Delete this category? Associated skills will lose their category tag.",
      )
    )
      return;

    try {
      const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        await fetchCategories(); // Instantly update the table
      } else {
        alert("Failed to delete category. Check your API route.");
      }
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Network error while deleting.");
    }
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
        <div>
          <h1 className="text-3xl font-bold text-textMain tracking-tight">
            Categories
          </h1>
          <p className="text-sm text-textDim mt-1">
            Manage skill and project categories.
          </p>
        </div>
        {message && (
          <span className="text-sm font-medium text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full animate-in fade-in slide-in-from-right-4">
            <CheckCircle2 size={16} className="inline mr-2" />
            {message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1">
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
                    <Edit2 size={20} className="text-primary" /> Edit Category
                  </>
                ) : (
                  <>
                    <Plus size={20} className="text-primary" /> Add Category
                  </>
                )}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setName("");
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
                  Category Name
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-textMain focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="e.g. Frontend Frameworks"
                />
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all shadow-md shadow-primary/20 disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : editingId ? (
                  <Edit2 size={18} />
                ) : (
                  <Plus size={18} />
                )}
                {editingId ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </div>

        {/* Table Column */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-background/50 border-b border-border text-xs uppercase tracking-wider text-textDim font-semibold">
                  <th className="p-5">Category Name</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="p-8 text-center text-textDim">
                      No categories added yet.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr
                      key={cat._id}
                      className={`hover:bg-background/50 transition-colors group ${editingId === cat._id ? "bg-primary/5" : ""}`}
                    >
                      <td className="p-5 font-semibold text-textMain flex items-center gap-3">
                        <Layers size={18} className="text-textDim" /> {cat.name}
                      </td>
                      <td className="p-5 text-right">
                        {/* Made opacity-50 by default so you can see them, opacity-100 on hover */}
                        <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEdit(cat)}
                            className="p-2 text-textDim hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(cat._id)}
                            className="p-2 text-textDim hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
