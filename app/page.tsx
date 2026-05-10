// app/page.tsx
import dbConnect from "@/lib/mongodb";
import HeroModel from "@/models/Hero";
import AboutModel from "@/models/About";
import SkillModel from "@/models/Skill";
import ExperienceModel from "@/models/Experience";

import Navbar from "@/components/frontend/Navbar";
import HeroSection from "@/components/frontend/HeroSection";
import AboutSection from "@/components/frontend/AboutSection";
import SkillsSection from "@/components/frontend/SkillsSection";
import ExperienceSection from "@/components/frontend/ExperienceSection";

// ABSOLUTELY KILL CACHE SO FRONTEND UPDATES INSTANTLY
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PortfolioPage() {
  await dbConnect();

  // Fetch all data
  const heroData = await HeroModel.findOne().lean();
  const aboutData = await AboutModel.findOne().lean();
  const skillsData = await SkillModel.find().sort({ order: 1 }).lean();
  const experienceData = await ExperienceModel.find().sort({ order: 1 }).lean();

  // Parse data for safe passing to Client Components
  const safeHeroData = heroData ? JSON.parse(JSON.stringify(heroData)) : null;
  const safeAboutData = aboutData
    ? JSON.parse(JSON.stringify(aboutData))
    : null;
  const safeSkillsData = skillsData
    ? JSON.parse(JSON.stringify(skillsData))
    : [];
  const safeExperienceData = experienceData
    ? JSON.parse(JSON.stringify(experienceData))
    : [];

  return (
    <div className="min-h-screen bg-background text-textMain selection:bg-primary/30 font-sans">
      <Navbar />

      {/* Reduced the gaps between sections by removing unnecessary vertical margins */}
      <main className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 overflow-hidden flex flex-col gap-8 md:gap-12">
        <HeroSection data={safeHeroData} />
        <AboutSection data={safeAboutData} />
        <SkillsSection data={safeSkillsData} />
        <ExperienceSection data={safeExperienceData} />
      </main>
    </div>
  );
}
