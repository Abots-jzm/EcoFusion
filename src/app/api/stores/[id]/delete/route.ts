import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { authoptions } from "@/app/api/auth/[...nextauth]/options";
import { DeleteStorePayload } from "../../types";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const serverSession = await getServerSession(authoptions);
  if (!serverSession)
    return new NextResponse("You are not authorized to make this request", {
      status: 401,
    });

  const { userId, storeId } = (await req.json()) as DeleteStorePayload;

  if (!userId) {
    return new NextResponse("Invalid request", { status: 400 });
  }

  await prisma.store.delete({ where: { id: params.id, ownerId: userId } });
  const nextStoreId = (
    await prisma.store.findFirst({ where: { ownerId: userId } })
  )?.id;

  await prisma.user.update({
    where: { id: userId },
    data: { lastSelected: nextStoreId || null },
  });

  return new NextResponse(nextStoreId);
}
