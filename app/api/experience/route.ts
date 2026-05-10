import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const experiences = await Experience.find({}).sort({ order: 1 });
    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    body.order = await Experience.countDocuments(); // Add to bottom of list
    const experience = await Experience.create(body);
    revalidatePath("/");
    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
