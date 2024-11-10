import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async () => {
  const session = await getServerSession();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json(
      { message: "Session or user email not found" },
      { status: 401 }
    );
  }

  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
    });

    if (findUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const [firstName, lastName] = session.user.name?.split(" ") ?? ["", ""];

    const data = await prisma.user.create({
      data: {
        email: session.user.email,
        firstName: firstName || "Unknown",
        lastName: lastName || "",
        photo: session.user.image || "",
        password: "",
      },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json(
      { message: `Error during sign-in: ${error}` },
      { status: 500 }
    );
  }
};
