import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CategoryForm from "@/components/dashboard/categories/CategoryForm";
import { api } from "@/trpc/server";
import React from "react";

type Props = {
  params: { storeId: string };
};

async function NewCategoryPage({ params: { storeId } }: Props) {
  const billboards = await api.billboards.getStoreBillboards.query({ storeId });

  return (
    <>
      <div className="mb-6 border-b pb-3 dark:border-b-darkAccent">
        <DashboardHeader
          heading="Create Category"
          subHeading="Add a new category"
        />
      </div>
      <CategoryForm billboards={billboards} storeId={storeId} />
    </>
  );
}

export default NewCategoryPage;
