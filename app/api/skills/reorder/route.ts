import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  try {
    await dbConnect();
    const { items } = await request.json();

    for (const item of items) {
      await Skill.findByIdAndUpdate(item.id, { order: item.order });
    }

    // THIS KILLS THE NEXT.JS CACHE AND FORCES THE FRONTEND TO SHOW THE NEW ORDER
    revalidatePath("/", "page");

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
