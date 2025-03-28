import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/mentors - Get all mentors
export async function GET(req: NextRequest) {
  try {
    const mentors = await prisma.mentor.findMany({
      select: {
        id: true,
        name: true,
        expertise: true,
        wallet: true,
        isApproved: true,
        createdAt: true,
      },
    });
    
    return NextResponse.json(mentors);
  } catch (error) {
    console.error("Error fetching mentors:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentors" },
      { status: 500 }
    );
  }
}

// POST /api/mentors - Create a new mentor
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, expertise, email, wallet, tx_hash } = body;

    // Check for required fields
    if (!name || !expertise || !email || !wallet || !tx_hash) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if mentor already exists with the same wallet or email
    const existingMentor = await prisma.mentor.findFirst({
      where: {
        OR: [
          { wallet },
          { email },
        ],
      },
    });

    if (existingMentor) {
      return NextResponse.json(
        { error: "Mentor already exists with this wallet or email" },
        { status: 409 }
      );
    }

    // Create new mentor
    const mentor = await prisma.mentor.create({
      data: {
        name,
        expertise,
        email,
        wallet,
        tx_hash,
        isApproved: false,
      },
    });

    return NextResponse.json(mentor, { status: 201 });
  } catch (error) {
    console.error("Error creating mentor:", error);
    return NextResponse.json(
      { error: "Failed to create mentor" },
      { status: 500 }
    );
  }
}

// PATCH /api/mentors/:id - Update mentor approval status
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { wallet, isApproved } = body;

    if (!wallet) {
      return NextResponse.json(
        { error: "Missing wallet address" },
        { status: 400 }
      );
    }

    const mentor = await prisma.mentor.update({
      where: {
        wallet,
      },
      data: {
        isApproved,
      },
    });

    return NextResponse.json(mentor);
  } catch (error) {
    console.error("Error updating mentor:", error);
    return NextResponse.json(
      { error: "Failed to update mentor" },
      { status: 500 }
    );
  }
} 