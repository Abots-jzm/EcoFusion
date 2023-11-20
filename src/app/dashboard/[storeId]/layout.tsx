import Navigation from "@/components/dashboard/Navigation";
import StoreSwitcher from "@/components/dashboard/StoreSwitcher";
import React from "react";

type Props = {
  params: { storeId: string };
  children: React.ReactNode;
};

function DashboardDataLayout({ params, children }: Props) {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center gap-6 px-4">
          <StoreSwitcher storeId={params.storeId} />
          <Navigation storeId={params.storeId} />
          <div className="ml-auto">user button</div>
        </div>
      </div>
      <div className="m-auto max-w-[1440px] p-4">{children}</div>
    </>
  );
}

export default DashboardDataLayout;
