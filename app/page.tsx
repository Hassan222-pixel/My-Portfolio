// app/page.tsx
import dbConnect from "@/lib/mongodb";
import HeroModel from "@/models/Hero";
import AboutModel from "@/models/About";

import Navbar from "@/components/frontend/Navbar";
import HeroSection from "@/components/frontend/HeroSection";
import AboutSection from "@/components/frontend/AboutSection";

// Force Next.js to always fetch fresh data when someone visits your site
export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  await dbConnect();

  // Fetch data directly from MongoDB (Lightning fast Server-Side Rendering)
  const heroData = await HeroModel.findOne().lean();
  const aboutData = await AboutModel.findOne().lean();

  // Convert MongoDB ObjectIDs to strings so React can pass them safely
  const safeHeroData = heroData ? JSON.parse(JSON.stringify(heroData)) : null;
  const safeAboutData = aboutData
    ? JSON.parse(JSON.stringify(aboutData))
    : null;

  return (
    <div className="min-h-screen bg-background text-textMain selection:bg-primary/30 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection data={safeHeroData} />
        <AboutSection data={safeAboutData} />
        {/* We will add <SkillsSection /> here next! */}
      </main>
    </div>
  );
}
