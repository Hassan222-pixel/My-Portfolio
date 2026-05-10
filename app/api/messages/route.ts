// app/api/messages/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    // Sort by newest first
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    // Safely return an empty array if the database isn't ready yet
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const message = await Message.create(body);
    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 400 },
    );
  }
}
