import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authoptions } from "../auth/[...nextauth]/options";
import prisma from "@/libs/prismadb";
import { CreateBillBoardPayload } from "../uploadthing/core";

export async function POST(req: Request) {
  const session = await getServerSession(authoptions);

  if (!session)
    return new NextResponse("Unauthorized request", { status: 401 });

  const { imageUrl, label, storeId } =
    (await req.json()) as Partial<CreateBillBoardPayload>;

  if (!imageUrl || !storeId)
    return new NextResponse("A name for the store must be provided", {
      status: 400,
    });

  const newBillboard = await prisma.billboard.create({
    data: { storeId, imageUrl, label },
  });

  return NextResponse.json(newBillboard);
}
