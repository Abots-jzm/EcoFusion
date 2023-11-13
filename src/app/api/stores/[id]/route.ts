import { getServerSession } from "next-auth";
import { authoptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const serverSession = getServerSession(authoptions);
  if (!serverSession)
    return new NextResponse("You are not authorized to make this request", {
      status: 401,
    });

  const store = await prisma.store.findFirst({ where: { id: params.id } });

  if (!store)
    return new NextResponse("Store could not be found.", { status: 404 });

  return NextResponse.json(store);
}
