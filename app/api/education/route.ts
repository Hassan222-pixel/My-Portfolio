import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Education from "@/models/Education";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const education = await Education.find({}).sort({ order: 1 });
    return NextResponse.json({ success: true, data: education });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    body.order = await Education.countDocuments();
    const education = await Education.create(body);
    revalidatePath("/");
    return NextResponse.json({ success: true, data: education });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
