// app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Portfolio Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* We moved the background and text color classes here! */}
      <body
        className={`${jakarta.className} antialiased bg-background text-textMain transition-colors duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
