// app/layout.tsx
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

// FIXED: Updated the tab title and description
export const metadata: Metadata = {
  title: "Hassan Awad | Portfolio",
  description: "Full Stack Developer Portfolio for Hassan Awad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.className} antialiased bg-background text-textMain transition-colors duration-300`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
