// app/api/categories/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

// EDIT a category
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    // WE MUST AWAIT PARAMS HERE FOR NEXT.JS 15+
    const { id } = await params;

    const body = await request.json();
    // Fixed the Mongoose warning!
    const category = await Category.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    });

    revalidatePath("/");
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}

// DELETE a category
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await dbConnect();
    // WE MUST AWAIT PARAMS HERE FOR NEXT.JS 15+
    const { id } = await params;

    await Category.findByIdAndDelete(id);

    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
