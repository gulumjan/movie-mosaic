import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const DELETE = async (request: Request) => {
  try {
    const { movieId } = await request.json();

    console.log("Attempting to delete item with productId:", movieId);

    if (!movieId) {
      return NextResponse.json(
        { message: "Product ID is required." },
        { status: 400 }
      );
    }

    const result = await prisma.favourite.delete({
      where: {
        id: movieId,
      },
    });

    console.log("Deleted item:", result);

    return NextResponse.json(
      { message: "Item successfully deleted." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting from favourites:", error);

    if (error === "P2025") {
      return NextResponse.json(
        { message: "No matching item found to delete." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Error deleting from favourites: ${error}` },
      { status: 500 }
    );
  }
};
