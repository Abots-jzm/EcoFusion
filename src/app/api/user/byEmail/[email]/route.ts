import { authoptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { email: string } },
) {
  const serverSession = getServerSession(authoptions);
  if (!serverSession)
    return new NextResponse("You are not authorized to make this request", {
      status: 401,
    });

  const user = await prisma.user.findUnique({ where: { email: params.email } });

  if (!user)
    return new NextResponse("User could not be found.", { status: 404 });

  const { hashedPassword, ...userWithoutPassword } = user;
  return NextResponse.json(userWithoutPassword);
}
