import SignoutBtn from "@/components/auth/SignoutBtn";
import DesktopNavigation from "@/components/dashboard/navigation/DesktopNavigation";
import MobileNavigation from "@/components/dashboard/navigation/MobileNavigation";
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
      <div className="border-b dark:border-b-darkAccent">
        <div className="flex h-16 items-center justify-between gap-6 px-4">
          <StoreSwitcher storeId={params.storeId} />
          <DesktopNavigation storeId={params.storeId} />
          <div className="flex items-center gap-4">
            <ThemeSwitcher initialTheme={theme} />
            <div className="hidden md:grid md:place-items-center">
              <SignoutBtn />
            </div>
            <MobileNavigation storeId={params.storeId} />
          </div>
        </div>
      </div>
      <div className="m-auto max-w-[1440px] p-4">{children}</div>
    </>
  );
}

export default DashboardDataLayout;
