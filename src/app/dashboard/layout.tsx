import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "EcoFusion | Dashboard",
};

type Props = {
  children: React.ReactNode;
};

function DashboardLayout({ children }: Props) {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div>Store switcher</div>
          <nav className="flex items-center gap-4 lg:gap-6">
            <Link
              href="/settings"
              className="text-sm font-medium transition-colors"
            >
              Settings
            </Link>
            <Link
              href="/settings"
              className="text-sm font-medium transition-colors"
            >
              Settings
            </Link>
          </nav>
          <div className="ml-auto">user button</div>
        </div>
      </div>
      {children}
    </>
  );
}

export default DashboardLayout;
