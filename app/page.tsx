// app/page.tsx
import dbConnect from "@/lib/mongodb";
import HeroModel from "@/models/Hero";
import AboutModel from "@/models/About";
import SkillModel from "@/models/Skill";
import ExperienceModel from "@/models/Experience";
import EducationModel from "@/models/Education"; // ADD IMPORT

import Navbar from "@/components/frontend/Navbar";
import HeroSection from "@/components/frontend/HeroSection";
import AboutSection from "@/components/frontend/AboutSection";
import SkillsSection from "@/components/frontend/SkillsSection";
import ExperienceSection from "@/components/frontend/ExperienceSection";
import EducationSection from "@/components/frontend/EducationSection"; // ADD IMPORT
import ProjectModel from "@/models/Project";
import ProjectsSection from "@/components/frontend/ProjectsSection";
import ContactInfoModel from "@/models/ContactInfo";
import ContactSection from "@/components/frontend/ContactSection";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PortfolioPage() {
  await dbConnect();

  const heroData = await HeroModel.findOne().lean();
  const aboutData = await AboutModel.findOne().lean();
  const skillsData = await SkillModel.find().sort({ order: 1 }).lean();
  const experienceData = await ExperienceModel.find().sort({ order: 1 }).lean();
  const educationData = await EducationModel.find().sort({ order: 1 }).lean(); // ADD FETCH
  const projectData = await ProjectModel.find().sort({ order: 1 }).lean();
  const safeProjectData = projectData
    ? JSON.parse(JSON.stringify(projectData))
    : [];
  
  const contactData = await ContactInfoModel.findOne().lean();
  const safeContactData = contactData
    ? JSON.parse(JSON.stringify(contactData))
    : null;

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
  const safeEducationData = educationData
    ? JSON.parse(JSON.stringify(educationData))
    : []; // ADD PARSE

  return (
    <div className="min-h-screen bg-background text-textMain selection:bg-primary/30 font-sans">
      <Navbar />
      <main className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 overflow-hidden flex flex-col gap-8 md:gap-12">
        <HeroSection data={safeHeroData} />
        <AboutSection data={safeAboutData} />
        <SkillsSection data={safeSkillsData} />
        <ExperienceSection data={safeExperienceData} />
        <EducationSection data={safeEducationData} /> {/* ADD SECTION */}
        <ProjectsSection data={safeProjectData} />
        <ContactSection info={safeContactData} />
      </main>
    </div>
  );
}
