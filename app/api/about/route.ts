// app/api/about/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import About from "@/models/About";

// THIS LINE FIXES THE DISAPPEARING DATA BUG
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const about = await About.findOne();
    return NextResponse.json({ success: true, data: about || {} });
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

    let about = await About.findOne();
    if (about) {
      about = await About.findByIdAndUpdate(about._id, body, { new: true });
    } else {
      about = await About.create(body);
    }

    return NextResponse.json({ success: true, data: about });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to save" },
      { status: 400 },
    );
  }
}
