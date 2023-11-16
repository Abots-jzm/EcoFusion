import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/options";
import { UpdateLastSelectedPayload } from "./types";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authoptions);

  if (!session)
    return new NextResponse("Unauthorized request", { status: 401 });

  const { storeId } = (await req.json()) as Omit<
    UpdateLastSelectedPayload,
    "userId"
  >;

  if (!storeId)
    return new NextResponse("Store Id is required", { status: 400 });

  const exist = await prisma.store.findFirst({
    where: {
      AND: [{ id: storeId }, { ownerId: params.id }],
    },
  });

  if (!exist)
    return new NextResponse("This store doesn't exist for this user", {
      status: 400,
    });

  const updatedUser = await prisma.user.update({
    where: { id: params.id },
    data: { lastSelected: storeId },
  });

  const { hashedPassword, ...userWithoutPassword } = updatedUser;
  return NextResponse.json(userWithoutPassword);
}