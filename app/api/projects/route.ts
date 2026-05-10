import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ order: 1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    body.order = await Project.countDocuments();
    const project = await Project.create(body);
    revalidatePath("/");
    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
