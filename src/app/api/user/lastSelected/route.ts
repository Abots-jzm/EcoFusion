import prisma from "@/libs/prismadb";
import { UpdateLastSelectedPayload } from "./types";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authoptions } from "../../auth/[...nextauth]/options";
import { revalidatePath, revalidateTag } from "next/cache";

export async function PATCH(req: Request) {
  const session = await getServerSession(authoptions);

  if (!session)
    return new NextResponse("Unauthorized request", { status: 401 });

  const { storeId, userId } = (await req.json()) as UpdateLastSelectedPayload;

  if (!storeId || !userId)
    return new NextResponse("Invalid user Id or store Id", { status: 400 });

  const exist = await prisma.store.findFirst({
    where: {
      AND: [{ id: storeId }, { ownerId: userId }],
    },
  });

  if (!exist)
    return new NextResponse("This store doesn't exist for this user", {
      status: 400,
    });

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { lastSelected: storeId },
  });

  const { hashedPassword, ...userWithoutPassword } = updatedUser;
  return NextResponse.json(userWithoutPassword);
}
