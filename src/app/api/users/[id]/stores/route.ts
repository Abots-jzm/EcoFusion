import { authoptions } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const serverSession = await getServerSession(authoptions);
  if (!serverSession)
    return new NextResponse("You are not authorized to make this request", {
      status: 401,
    });

  const stores = await prisma.store.findMany({ where: { ownerId: params.id } });

  return NextResponse.json(stores);
}
