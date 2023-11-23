import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authoptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import InitialRouteProvider from "@/components/dashboard/InitialRouteProvider";
import { Store, User } from "@prisma/client";
import prisma from "@/libs/prismadb";

export const metadata: Metadata = {
  title: "EcoFusion | Dashboard",
};

type Props = {
  children: React.ReactNode;
};

async function DashboardLayout({ children }: Props) {
  const serverSession = await getServerSession(authoptions);
  if (!serverSession?.user) {
    redirect("/login");
  }

  const userId = serverSession.user.id;
  const userPromise = prisma.user.findFirst({
    where: { id: userId },
  });
  const storesPromise = prisma.store.findMany({
    where: { ownerId: userId },
  });

  const [userWithPassword, stores] = (await Promise.all([
    userPromise,
    storesPromise,
  ])) as [User, Store[]];

  if (!userWithPassword) redirect("/login");

  const { hashedPassword, ...user } = userWithPassword;

  return (
    <InitialRouteProvider user={user} stores={stores}>
      {children}
    </InitialRouteProvider>
  );
}

export default DashboardLayout;
