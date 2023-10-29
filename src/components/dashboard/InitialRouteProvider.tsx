"use client";

import { useAppDispatch } from "@/store/hooks";
import { userActions } from "@/store/slices/userSlice";
import { User } from "@prisma/client";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  user: User;
};

function InitialRouteProvider({ children, user }: Props) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const isInCorrectStore = pathname.startsWith(
    "/dashboard/" + user.lastSelected,
  );
  if (user.lastSelected && !isInCorrectStore)
    redirect("/dashboard/" + user.lastSelected);

  useEffect(() => {
    dispatch(userActions.login(user.id));
  }, [user]);
  return <>{children}</>;
}

export default InitialRouteProvider;
