import { type Metadata } from "next";
import React from "react";
import InitialRouteProvider from "@/components/dashboard/InitialRouteProvider";
import { api } from "@/trpc/server";

export const metadata: Metadata = {
  title: "EcoFusion | Dashboard",
};

type Props = {
  children: React.ReactNode;
};

async function DashboardLayout({ children }: Props) {
  const { stores, user } = await api.users.getInitialData.query();

  return (
    <InitialRouteProvider user={user} stores={stores}>
      {children}
    </InitialRouteProvider>
  );
}

export default DashboardLayout;
