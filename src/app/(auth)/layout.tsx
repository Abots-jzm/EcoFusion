import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Store | Signin",
};

function AuthLayout({ children }: Props) {
  return (
    <div className="mx-auto h-screen place-items-center pt-6 sm:grid sm:max-w-md sm:pt-0">
      <div className="w-full p-8 pt-4 sm:rounded-lg sm:pt-8 sm:shadow-lg">
        <div className="text-xl font-bold">EcoFusion</div>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
