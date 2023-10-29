import { CreateStorePayload } from "@/app/api/store/types";
import prisma from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authoptions } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  const session = await getServerSession(authoptions);

  if (!session)
    return new NextResponse("Unauthorized request", { status: 401 });

  const { name, ownerId } = (await req.json()) as CreateStorePayload;

  if (!name || !ownerId)
    return new NextResponse("A name for the store must be provided", {
      status: 400,
    });

  const exist = await prisma.store.findFirst({
    where: {
      AND: [{ name }, { ownerId }],
    },
  });

  if (exist)
    return new NextResponse(
      `A store with name ${name} already exists for this user`,
      { status: 400 },
    );

  if (name.length >= 20)
    return new NextResponse("The store can be at most 20 characters long", {
      status: 400,
    });

  const store = await prisma.store.create({ data: { name, ownerId } });
  return NextResponse.json(store);
}
