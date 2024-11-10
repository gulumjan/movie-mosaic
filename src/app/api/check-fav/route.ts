import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const { userId, movieId } = await request.json();
    console.log("Received userId:", userId);
    console.log("Received movieId:", movieId);

    if (!userId || !movieId) {
      return NextResponse.json(
        { message: "User ID and Movie ID are required." },
        { status: 400 }
      );
    }

    const movieIdInt = parseInt(movieId, 10);
    if (isNaN(movieIdInt)) {
      return NextResponse.json(
        { message: "Invalid Movie ID format." },
        { status: 400 }
      );
    }

    const favourite = await prisma.favourite.findFirst({
      where: {
        userId,
        movieId: movieIdInt,
      },
    });

    return NextResponse.json({ exists: Boolean(favourite) }, { status: 200 });
  } catch (error) {
    console.error("Error checking favourites:", error);
    return NextResponse.json(
      { message: `Error checking favourites: ${error}` },
      { status: 500 }
    );
  }
};
