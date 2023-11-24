"use client";

import useSignOut from "@/hooks/auth/useSignOut";
import React from "react";
import { LuLogOut } from "react-icons/lu";

function SignoutBtn() {
  const { signOut } = useSignOut();

  return (
    <button
      onClick={() => signOut()}
      className="mt-auto text-2xl transition-opacity hover:opacity-50"
    >
      <LuLogOut />
    </button>
  );
}

export default SignoutBtn;
