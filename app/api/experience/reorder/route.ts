import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const { items } = await request.json();
    for (const item of items) {
      await Experience.findByIdAndUpdate(item.id, { order: item.order });
    }
    revalidatePath("/", "page");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
