import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactInfo from "@/models/ContactInfo";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET() {
  await dbConnect();
  const info = (await ContactInfo.findOne()) || (await ContactInfo.create({}));
  return NextResponse.json({ success: true, data: info });
}

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();
  const info = await ContactInfo.findOneAndUpdate({}, body, {
    new: true,
    upsert: true,
  });
  revalidatePath("/");
  return NextResponse.json({ success: true, data: info });
}
