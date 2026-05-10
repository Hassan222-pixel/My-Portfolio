import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  // Sort by newest first
  const messages = await Message.find().sort({ createdAt: -1 });
  return NextResponse.json({ success: true, data: messages });
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const message = await Message.create(body);
  return NextResponse.json({ success: true, data: message });
}
