import { authoptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const serverSession = getServerSession(authoptions);
  if (!serverSession)
    return new NextResponse("You are not authorized to make this request", {
      status: 401,
    });

  const stores = await prisma.store.findMany({ where: { ownerId: params.id } });

  if (stores.length === 0)
    return new NextResponse("Stores for this user couldn't be found", {
      status: 404,
    });

  return NextResponse.json(stores);
}
