import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { authoptions } from "@/app/api/auth/[...nextauth]/options";
import { EditStorePayload } from "../../types";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const serverSession = await getServerSession(authoptions);
  if (!serverSession)
    return new NextResponse("You are not authorized to make this request", {
      status: 401,
    });

  const { userId, name } = (await req.json()) as EditStorePayload;

  if (!userId || !name) {
    return new NextResponse("Invalid request", { status: 400 });
  }

  const updatedStore = await prisma.store.update({
    where: { id: params.id, ownerId: userId },
    data: { name },
  });

  if (!updatedStore)
    return new NextResponse("Store could not be found.", { status: 404 });

  return NextResponse.json(updatedStore);
}
