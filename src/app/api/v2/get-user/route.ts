import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json(
      {
        message: "User already logged in",
      },
      { status: 400 }
    );
  }
  try {
    const data = await prisma.user.findFirst({
      where: {
        email: session.user.email!,
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user", error },
      { status: 500 }
    );
  }
};
