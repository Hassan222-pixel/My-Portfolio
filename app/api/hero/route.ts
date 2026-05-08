// app/api/hero/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Hero from "@/models/Hero";

// THIS LINE FIXES THE DISAPPEARING DATA BUG
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const hero = await Hero.findOne();
    return NextResponse.json({ success: true, data: hero || {} });
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

    let hero = await Hero.findOne();
    if (hero) {
      hero = await Hero.findByIdAndUpdate(hero._id, body, { new: true });
    } else {
      hero = await Hero.create(body);
    }

    return NextResponse.json({ success: true, data: hero });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save" },
      { status: 400 },
    );
  }
}
