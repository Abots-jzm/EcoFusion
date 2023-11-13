import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authoptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { BASE_URL } from "@/libs/request";
import { User } from "@prisma/client";
import InitialRouteProvider from "@/components/dashboard/InitialRouteProvider";

export const metadata: Metadata = {
  title: "EcoFusion | Dashboard",
};

type Props = {
  children: React.ReactNode;
};

async function DashboardLayout({ children }: Props) {
  const serverSession = await getServerSession(authoptions);

  const response = await fetch(
    `${BASE_URL}/api/user/byEmail/${serverSession?.user?.email}`,
  );
  if (!response.ok) {
    signOut();
    redirect("/login");
  }

  const user: User = await response.json();

  return <InitialRouteProvider user={user}>{children}</InitialRouteProvider>;
}

export default DashboardLayout;
