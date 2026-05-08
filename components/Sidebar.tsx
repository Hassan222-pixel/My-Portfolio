// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  MessageSquare,
  LogOut,
  Sun,
  Moon,
  PanelLeftClose,
  PanelRightClose,
  X,
  Home,
  User,
  Briefcase,
  Mail,
  Layers, // <-- Added Layers icon for Categories
} from "lucide-react";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
}

export default function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  const menuGroups = [
    {
      title: "Overview",
      items: [
        { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
        { name: "Messages", path: "/admin/messages", icon: MessageSquare },
      ],
    },
    {
      title: "Page Sections",
      items: [
        { name: "Hero Section", path: "/admin/hero", icon: Home },
        { name: "About Me", path: "/admin/about", icon: User },
        { name: "Categories", path: "/admin/categories", icon: Layers }, // <-- ADDED THIS
        { name: "Skills", path: "/admin/skills", icon: Code2 },
        { name: "Experience", path: "/admin/experience", icon: Briefcase },
        { name: "Projects", path: "/admin/projects", icon: FolderKanban },
        { name: "Contact Info", path: "/admin/contact", icon: Mail },
      ],
    },
  ];

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-card border-r border-border flex flex-col z-50 transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-20" : "w-64"} 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div
          className={`h-16 flex items-center border-b border-border shrink-0 transition-all
          ${isCollapsed ? "justify-center" : "justify-between px-4"}`}
        >
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-primary tracking-wide whitespace-nowrap">
              Hassan Admin
            </h1>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex text-textDim hover:text-textMain p-2 rounded-lg hover:bg-background transition-colors"
            title={isCollapsed ? "Expand Menu" : "Collapse Menu"}
          >
            {isCollapsed ? (
              <PanelRightClose size={22} />
            ) : (
              <PanelLeftClose size={20} />
            )}
          </button>

          <button
            className="md:hidden text-textDim hover:text-textMain p-1 rounded-md"
            onClick={() => setIsMobileOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex} className={`${groupIndex > 0 ? "mt-6" : ""}`}>
              {!isCollapsed && (
                <h3 className="px-4 mb-2 text-xs font-semibold text-textDim uppercase tracking-wider">
                  {group.title}
                </h3>
              )}
              {isCollapsed && (
                <div className="w-full border-t border-border my-3 first:hidden"></div>
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      onClick={() => setIsMobileOpen(false)}
                      className={`flex items-center py-2.5 rounded-lg text-sm font-medium transition-all group
                      ${isCollapsed ? "justify-center px-2" : "px-4 gap-3"} 
                      ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-textDim hover:bg-background hover:text-textMain"
                      }`}
                      title={isCollapsed ? item.name : ""}
                    >
                      <Icon
                        size={20}
                        className={`shrink-0 ${isActive ? "text-primary" : "text-textDim group-hover:text-primary transition-colors"}`}
                      />
                      {!isCollapsed && (
                        <span className="whitespace-nowrap">{item.name}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-border space-y-1 shrink-0 bg-card">
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center py-2.5 rounded-lg text-sm font-medium transition-all group
            ${isCollapsed ? "justify-center px-2" : "px-4 gap-3"} 
            text-textDim hover:bg-background hover:text-textMain`}
          >
            {theme === "dark" ? (
              <Sun
                size={20}
                className="shrink-0 text-textDim group-hover:text-yellow-400"
              />
            ) : (
              <Moon
                size={20}
                className="shrink-0 text-textDim group-hover:text-slate-600"
              />
            )}
            {!isCollapsed && (
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            )}
          </button>

          <button
            onClick={handleLogout}
            className={`w-full flex items-center py-2.5 rounded-lg text-sm font-medium transition-all group
            ${isCollapsed ? "justify-center px-2" : "px-4 gap-3"} 
            text-textDim hover:bg-danger/10 hover:text-danger`}
          >
            <LogOut
              size={20}
              className="shrink-0 text-textDim group-hover:text-danger"
            />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
