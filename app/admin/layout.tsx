// app/admin/layout.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    // Basic route protection check
    const auth = localStorage.getItem("isAuthenticated");
    if (!auth) {
      router.push("/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) return null; // Don't render until verified

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Component with State */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 transition-all duration-300 w-full
        ${isCollapsed ? "md:ml-20" : "md:ml-64"} 
        p-4 md:p-8 pt-20 md:pt-8`}
      >
        {/* Mobile Header Bar (Only visible on small screens) */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center px-4 z-30">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="text-textMain p-2 -ml-2 rounded-lg hover:bg-background transition-colors"
          >
            <Menu size={24} />
          </button>
          <span className="ml-2 font-bold text-primary text-lg">
            Admin Panel
          </span>
        </div>

        {children}
      </main>
    </div>
  );
}
