"use client";

import useGetNavRoutes from "@/hooks/data/useGetNavRoutes";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  storeId: string;
};

function DesktopNavigation({ storeId }: Props) {
  const pathname = usePathname();
  const navRoutes = useGetNavRoutes(storeId, pathname);

  return (
    <nav className="hidden items-center gap-4 md:flex lg:gap-6">
      {navRoutes.map(({ href, label, isActive }) => (
        <Link
          key={href}
          href={href}
          className={clsx(
            "text-sm transition-colors hover:text-black dark:hover:text-lightGray",
            isActive
              ? "font-semibold text-black dark:text-lightGray"
              : "font-medium text-darkMutedText",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default DesktopNavigation;
