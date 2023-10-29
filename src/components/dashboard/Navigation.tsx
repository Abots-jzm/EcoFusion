"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  storeId: string;
};

function Navigation({ storeId }: Props) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4 lg:gap-6">
      <Link
        href={`/dashboard/${storeId}/settings`}
        className={clsx(
          "text-sm font-semibold transition-colors hover:text-black",
          pathname === "/dashboard/settings" ? "text-black" : "text-gray-500",
        )}
      >
        Settings
      </Link>
    </nav>
  );
}

export default Navigation;
