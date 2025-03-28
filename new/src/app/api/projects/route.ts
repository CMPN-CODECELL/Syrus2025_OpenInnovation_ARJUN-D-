import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/projects - Get all projects or filter by mentor/student
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const mentorWallet = url.searchParams.get("mentor");
    const studentWallet = url.searchParams.get("student");
    
    let projects;
    
    if (mentorWallet) {
      // Get projects for a specific mentor
      projects = await prisma.project.findMany({
        where: {
          mentorWallet: mentorWallet,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else if (studentWallet) {
      // Get projects assigned to a specific student
      projects = await prisma.project.findMany({
        where: {
          studentWallet: studentWallet,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      // Get all projects
      projects = await prisma.project.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectName, projectDescription, skillArea, mentorWallet, tx_hash } = body;

    // Check for required fields
    if (!projectName || !projectDescription || !skillArea || !mentorWallet || !tx_hash) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if mentor exists
    const mentor = await prisma.mentor.findUnique({
      where: {
        wallet: mentorWallet,
      },
    });

    if (!mentor) {
      return NextResponse.json(
        { error: "Mentor not found" },
        { status: 404 }
      );
    }

    // Create new project
    const project = await prisma.project.create({
      data: {
        projectName,
        projectDescription,
        skillArea,
        mentorWallet,
        tx_hash,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

// PATCH /api/projects/:id - Update project status
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, studentWallet, isAssigned, isCompleted } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing project ID" },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    
    if (studentWallet !== undefined) {
      updateData.studentWallet = studentWallet;
      updateData.isAssigned = true;
    }
    
    if (isAssigned !== undefined) {
      updateData.isAssigned = isAssigned;
    }
    
    if (isCompleted !== undefined) {
      updateData.isCompleted = isCompleted;
    }

    // Update project
    const project = await prisma.project.update({
      where: {
        id: Number(id),
      },
      data: updateData,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
} 