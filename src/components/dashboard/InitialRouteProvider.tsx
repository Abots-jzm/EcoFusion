"use client";

import { useAppDispatch } from "@/store/hooks";
import { User, userActions } from "@/store/slices/userSlice";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  user: User;
};

function InitialRouteProvider({ children, user }: Props) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const serializedUser = JSON.parse(JSON.stringify(user)) as User;
    dispatch(userActions.login(serializedUser));

    const isInCorrectStore = pathname.startsWith(
      "/dashboard/" + user.lastSelected,
    );
    if (user.lastSelected && !isInCorrectStore)
      redirect("/dashboard/" + user.lastSelected);
  }, [user]);
  return <>{children}</>;
}

export default InitialRouteProvider;
