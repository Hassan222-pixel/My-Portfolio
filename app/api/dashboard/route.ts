// app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import Message from "@/models/Message";
import Experience from "@/models/Experience";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();

    // Promise.all runs these database queries at the exact same time for maximum speed
    const [projectCount, skillCount, expCount, unreadMessages, recentMessages] =
      await Promise.all([
        Project.countDocuments(),
        Skill.countDocuments(),
        Experience.countDocuments(),
        Message.countDocuments({ isRead: false }),
        Message.find().sort({ createdAt: -1 }).limit(4).lean(), // Get the 4 most recent messages
      ]);

    return NextResponse.json({
      success: true,
      data: {
        projectCount,
        skillCount,
        expCount,
        unreadMessages,
        recentMessages,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
