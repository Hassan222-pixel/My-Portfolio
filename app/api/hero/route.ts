// app/api/hero/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hero from "@/models/Hero";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const hero = await Hero.findOne();
    return NextResponse.json({ success: true, data: hero });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    // This updates the existing hero document or creates one if it doesn't exist.
    // It will now automatically grab the topBadge, greeting, and badges array.
    const hero = await Hero.findOneAndUpdate({}, body, {
      new: true,
      upsert: true,
    });

    return NextResponse.json({ success: true, data: hero });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update hero data" },
      { status: 400 },
    );
  }
}
