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

  const navRoutes = [
    {
      href: `/dashboard/${storeId}`,
      label: "Overview",
      isActive: pathname === `/dashboard/${storeId}`,
    },
    {
      href: `/dashboard/${storeId}/billboards`,
      label: "Billboards",
      isActive: pathname === `/dashboard/${storeId}/billboards`,
    },
    {
      href: `/dashboard/${storeId}/categories`,
      label: "Categories",
      isActive: pathname === `/dashboard/${storeId}/categories`,
    },
    {
      href: `/dashboard/${storeId}/sizes`,
      label: "Sizes",
      isActive: pathname === `/dashboard/${storeId}/sizes`,
    },
    {
      href: `/dashboard/${storeId}/colors`,
      label: "Colors",
      isActive: pathname === `/dashboard/${storeId}/colors`,
    },
    {
      href: `/dashboard/${storeId}/products`,
      label: "Products",
      isActive: pathname === `/dashboard/${storeId}/products`,
    },
    {
      href: `/dashboard/${storeId}/orders`,
      label: "Orders",
      isActive: pathname === `/dashboard/${storeId}/orders`,
    },
    {
      href: `/dashboard/${storeId}/settings`,
      label: "Settings",
      isActive: pathname === `/dashboard/${storeId}/settings`,
    },
  ];

  return (
    <nav className="flex items-center gap-4 lg:gap-6">
      {navRoutes.map(({ href, label, isActive }) => (
        <Link
          key={href}
          href={href}
          className={clsx(
            "text-sm font-semibold transition-colors hover:text-black",
            isActive ? "text-black" : "text-gray-500",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default Navigation;
