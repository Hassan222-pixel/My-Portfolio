// app/page.tsx
import dbConnect from "@/lib/mongodb";
import HeroModel from "@/models/Hero";
import AboutModel from "@/models/About";
import SkillModel from "@/models/Skill";

import Navbar from "@/components/frontend/Navbar";
import HeroSection from "@/components/frontend/HeroSection";
import AboutSection from "@/components/frontend/AboutSection";
import SkillsSection from "@/components/frontend/SkillsSection";

// ABSOLUTELY KILL CACHE SO FRONTEND UPDATES INSTANTLY
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PortfolioPage() {
  await dbConnect();

  const heroData = await HeroModel.findOne().lean();
  const aboutData = await AboutModel.findOne().lean();

  // SORT BY ORDER INSTEAD OF CREATION DATE
  const skillsData = await SkillModel.find().sort({ order: 1 }).lean();

  const safeHeroData = heroData ? JSON.parse(JSON.stringify(heroData)) : null;
  const safeAboutData = aboutData
    ? JSON.parse(JSON.stringify(aboutData))
    : null;
  const safeSkillsData = skillsData
    ? JSON.parse(JSON.stringify(skillsData))
    : [];

  return (
    <div className="min-h-screen bg-background text-textMain selection:bg-primary/30 font-sans">
      <Navbar />
      <main className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 overflow-hidden">
        <HeroSection data={safeHeroData} />
        <AboutSection data={safeAboutData} />
        <SkillsSection data={safeSkillsData} />
      </main>
    </div>
  );
}
