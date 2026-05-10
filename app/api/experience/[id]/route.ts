import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const experience = await Experience.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    });
    revalidatePath("/");
    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params;
    await Experience.findByIdAndDelete(id);
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
