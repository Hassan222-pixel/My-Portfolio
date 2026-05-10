import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/models/Message";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  const body = await request.json();
  // Used to mark a message as "Read"
  const message = await Message.findByIdAndUpdate(id, body, {
    returnDocument: "after",
  });
  return NextResponse.json({ success: true, data: message });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await dbConnect();
  const { id } = await params;
  await Message.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
