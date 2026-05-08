// app/api/categories/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find().sort({ createdAt: 1 });
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // If it fails, return an empty array safely instead of crashing
    return NextResponse.json({ success: false, data: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const category = await Category.create(body);
    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("Failed to create category:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save" },
      { status: 400 },
    );
  }
}
