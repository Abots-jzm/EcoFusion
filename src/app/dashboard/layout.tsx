import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authoptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { BASE_URL } from "@/libs/request";
import InitialRouteProvider from "@/components/dashboard/InitialRouteProvider";
import { User } from "@/store/slices/userSlice";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "EcoFusion | Dashboard",
};

type Props = {
  children: React.ReactNode;
};

async function DashboardLayout({ children }: Props) {
  const serverSession = await getServerSession(authoptions);
  if (!serverSession?.user) {
    signOut();
    redirect("/login");
  }

  const response = await fetch(
    `${BASE_URL}/api/users/${serverSession.user.id}`,
    {
      method: "GET",
      headers: headers(),
    },
  );
  if (!response.ok) {
    signOut();
    redirect("/login");
  }

  const user: User = await response.json();

  return <InitialRouteProvider user={user}>{children}</InitialRouteProvider>;
}

export default DashboardLayout;
