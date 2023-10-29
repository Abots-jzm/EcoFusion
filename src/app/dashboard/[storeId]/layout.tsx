import Navigation from "@/components/dashboard/Navigation";
import React from "react";

type Props = {
  params: { storeId: string };
  children: React.ReactNode;
};

function DashboardDataLayout({ params, children }: Props) {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div>Store switcher</div>
          <Navigation storeId={params.storeId} />
          <div className="ml-auto">user button</div>
        </div>
      </div>
      {children}
    </>
  );
}

export default DashboardDataLayout;
