import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Footer from "@/models/Footer";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const data = (await Footer.findOne()) || (await Footer.create({}));
  return NextResponse.json({ success: true, data });
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const data = await Footer.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });
  revalidatePath("/");
  return NextResponse.json({ success: true, data });
}
