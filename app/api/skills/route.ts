import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    // 1 means Top to Bottom (Ascending)
    const skills = await Skill.find({}).sort({ order: 1 });
    return NextResponse.json({ success: true, data: skills });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const count = await Skill.countDocuments();
    body.order = count; // New skills go to the bottom
    const skill = await Skill.create(body);

    revalidatePath("/"); // Force frontend update
    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to add" },
      { status: 400 },
    );
  }
}
