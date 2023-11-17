import { Metadata } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authoptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { BASE_URL } from "@/libs/request";
import InitialRouteProvider from "@/components/dashboard/InitialRouteProvider";
import { headers } from "next/headers";
import { User } from "@/hooks/auth/types";
import { Store } from "@prisma/client";

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

  const userPromise = fetch(`${BASE_URL}/api/users/${serverSession.user.id}`, {
    method: "GET",
    headers: headers(),
  });
  const storePromise = fetch(
    `${BASE_URL}/api/users/${serverSession.user.id}/stores`,
    {
      method: "GET",
      headers: headers(),
    },
  );

  const responses = await Promise.all([userPromise, storePromise]);
  const [user, stores] = (await Promise.all(
    responses.map((response) => {
      if (!response.ok) {
        signOut();
        redirect("/login");
      }
      return response.json();
    }),
  )) as [User, Store[]];

  return (
    <InitialRouteProvider user={user} stores={stores}>
      {children}
    </InitialRouteProvider>
  );
}

export default DashboardLayout;
