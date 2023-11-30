"use client";

import useGetUser from "@/hooks/auth/useGetUser";
import useGetUserStores from "@/hooks/store/useGetUserStores";
import type { Store, User } from "@/trpc/shared";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  user: User;
  stores: Store[];
};

function InitialRouteProvider({ children, user, stores }: Props) {
  const pathname = usePathname();
  useGetUser(user);
  useGetUserStores(stores);

  useEffect(() => {
    const isInCorrectStore = pathname.startsWith(
      "/dashboard/" + user.lastSelected,
    );
    if (user.lastSelected && !isInCorrectStore)
      redirect("/dashboard/" + user.lastSelected);
  }, [user]);
  return <>{children}</>;
}

export default InitialRouteProvider;
