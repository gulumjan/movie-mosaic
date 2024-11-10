import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json(
      {
        message: "User not authenticated",
      },
      { status: 401 }
    );
  }

  const { movieId, title, posterPath, release_date } = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session.user.email!,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const existingFavourite = await prisma.favourite.findUnique({
      where: {
        userId_movieId: {
          userId: user.id,
          movieId: Number(movieId),
        },
      },
    });

    if (existingFavourite) {
      return NextResponse.json(
        { message: "Movie already in favourites" },
        { status: 400 }
      );
    }

    const favourite = await prisma.favourite.create({
      data: {
        userId: user.id,
        movieId: Number(movieId),
        title,
        posterPath,
        release_date,
      },
    });

    return NextResponse.json({
      message: "Movie added to favourites",
      favourite,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding movie to favourites", error },
      { status: 500 }
    );
  }
};
