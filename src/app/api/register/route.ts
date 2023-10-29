import { Credentials } from "@/app/api/register/types";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body: Credentials = await req.json();
  const { email, password } = body;

  if (!email || !password)
    return new NextResponse("Email and password is required", { status: 400 });

  const exist = await prisma.user.findUnique({ where: { email } });
  if (exist) return new NextResponse("Email already exists", { status: 400 });

  if (password.length < 6)
    return new NextResponse("Password must be at least 6 characters long", {
      status: 400,
    });

  const hpassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, hashedPassword: hpassword },
  });
  const { hashedPassword, ...userWithoutPassword } = user;

  return NextResponse.json(userWithoutPassword);
}
