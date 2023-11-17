"use client";

import { User } from "@/hooks/auth/types";
import useGetUser from "@/hooks/auth/useGetUser";
import useGetUserStores from "@/hooks/store/useGetUserStores";
import { Store } from "@prisma/client";
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
