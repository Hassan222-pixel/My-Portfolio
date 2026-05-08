// app/api/skills/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params; // Await the params!

    await Skill.findByIdAndDelete(id);

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    const { id } = await params; // Await the params!

    const body = await request.json();
    const skill = await Skill.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, data: skill });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
