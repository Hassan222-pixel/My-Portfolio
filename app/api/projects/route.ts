// app/api/projects/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";

// GET: Fetch all projects
export async function GET() {
  try {
    await dbConnect(); // Ensure the DB is connected
    const projects = await Project.find({}); // Fetch all projects from MongoDB
    return NextResponse.json(
      { success: true, data: projects },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

// POST: Create a new project (Useful for seeding your database initially)
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const project = await Project.create(body);
    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 400 },
    );
  }
}
