import Navigation from "@/components/dashboard/Navigation";
import StoreSwitcher from "@/components/dashboard/StoreSwitcher";
import ThemeSwitcher from "@/components/util/ThemeSwitcher";
import { cookies } from "next/headers";
import React from "react";

type Props = {
  params: { storeId: string };
  children: React.ReactNode;
};

function DashboardDataLayout({ params, children }: Props) {
  const theme = cookies().get("theme")?.value as "dark" | "light" | undefined;

  return (
    <>
      <div className="dark:border-b-darkAccent border-b">
        <div className="flex h-16 items-center gap-6 px-4">
          <StoreSwitcher storeId={params.storeId} />
          <Navigation storeId={params.storeId} />
          <div className="ml-auto flex items-center gap-4">
            <ThemeSwitcher initialTheme={theme} />
            <div>user button</div>
          </div>
        </div>
      </div>
      <div className="m-auto max-w-[1440px] p-4">{children}</div>
    </>
  );
}

export default DashboardDataLayout;
