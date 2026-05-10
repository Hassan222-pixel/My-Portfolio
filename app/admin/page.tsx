// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Code2,
  MessageSquare,
  Briefcase,
  Plus,
  FileText,
  ArrowRight,
  Clock,
  Mail,
  Loader2,
} from "lucide-react";

interface DashboardData {
  projectCount: number;
  skillCount: number;
  expCount: number;
  unreadMessages: number;
  recentMessages: any[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/dashboard", { cache: "no-store" });
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (error) {
        console.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading)
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );

  return (
    <div className="w-full max-w-[1200px] pb-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-textMain tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-textDim mt-1">
          Welcome back, Hassan. Here is what's happening with your portfolio
          today.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Projects Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-start justify-between group hover:border-primary/50 transition-colors">
          <div>
            <p className="text-sm font-medium text-textDim mb-1">
              Total Projects
            </p>
            <h3 className="text-3xl font-bold text-textMain">
              {data?.projectCount || 0}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <FolderKanban size={24} />
          </div>
        </div>

        {/* Skills Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-start justify-between group hover:border-primary/50 transition-colors">
          <div>
            <p className="text-sm font-medium text-textDim mb-1">
              Arsenal Skills
            </p>
            <h3 className="text-3xl font-bold text-textMain">
              {data?.skillCount || 0}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
            <Code2 size={24} />
          </div>
        </div>

        {/* Experience Card */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex items-start justify-between group hover:border-primary/50 transition-colors">
          <div>
            <p className="text-sm font-medium text-textDim mb-1">
              Experience Roles
            </p>
            <h3 className="text-3xl font-bold text-textMain">
              {data?.expCount || 0}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
            <Briefcase size={24} />
          </div>
        </div>

        {/* Messages Card (Dynamic Color based on Unread) */}
        <div
          className={`bg-card border rounded-2xl p-6 shadow-sm flex items-start justify-between group transition-colors ${data?.unreadMessages && data.unreadMessages > 0 ? "border-red-500/50 hover:border-red-500" : "border-border hover:border-primary/50"}`}
        >
          <div>
            <p className="text-sm font-medium text-textDim mb-1">
              Unread Messages
            </p>
            <h3
              className={`text-3xl font-bold ${data?.unreadMessages && data.unreadMessages > 0 ? "text-red-500" : "text-textMain"}`}
            >
              {data?.unreadMessages || 0}
            </h3>
          </div>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${data?.unreadMessages && data.unreadMessages > 0 ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"}`}
          >
            <MessageSquare size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT PANEL: Recent Messages */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden h-full">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold text-textMain flex items-center gap-2">
                <Clock size={18} className="text-primary" /> Recent Inbox
                Activity
              </h2>
              <Link
                href="/admin/messages"
                className="text-sm font-medium text-primary hover:text-blue-500 flex items-center gap-1 transition-colors"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div className="divide-y divide-border">
              {!data?.recentMessages || data.recentMessages.length === 0 ? (
                <div className="p-8 text-center text-textDim">
                  No recent messages.
                </div>
              ) : (
                data.recentMessages.map((msg: any) => (
                  <Link
                    key={msg._id}
                    href="/admin/messages"
                    className={`flex items-start gap-4 p-5 hover:bg-background/50 transition-colors ${!msg.isRead ? "bg-primary/5" : ""}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${!msg.isRead ? "bg-primary text-white" : "bg-background border border-border text-textDim"}`}
                    >
                      <Mail size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p
                          className={`text-sm truncate ${!msg.isRead ? "font-bold text-textMain" : "font-semibold text-textMain"}`}
                        >
                          {msg.name}
                        </p>
                        <span className="text-xs text-textDim whitespace-nowrap ml-2">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p
                        className={`text-sm truncate mb-1 ${!msg.isRead ? "text-textMain font-medium" : "text-textDim"}`}
                      >
                        {msg.subject}
                      </p>
                      <p className="text-xs text-textDim truncate">
                        {msg.message}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6 h-full">
            <h2 className="text-lg font-semibold text-textMain mb-6 flex items-center gap-2">
              Quick Actions
            </h2>

            <div className="space-y-3">
              <Link
                href="/admin/projects"
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-background hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FolderKanban size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-textMain">
                    Add New Project
                  </p>
                  <p className="text-xs text-textDim">
                    Publish a new case study
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/skills"
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-background hover:border-emerald-500 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-textMain">
                    Add New Skill
                  </p>
                  <p className="text-xs text-textDim">Update your tech stack</p>
                </div>
              </Link>

              <Link
                href="/admin/contact"
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-background hover:border-purple-500 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-textMain">
                    Update Resume
                  </p>
                  <p className="text-xs text-textDim">Upload latest CV (PDF)</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
