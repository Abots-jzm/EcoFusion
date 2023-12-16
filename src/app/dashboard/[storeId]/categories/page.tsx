import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { api } from "@/trpc/server";
import Link from "next/link";
import React from "react";
import { MdAdd } from "react-icons/md";

type Props = {
  params: { storeId: string };
};

async function CategoriesPage({ params: { storeId } }: Props) {
  const categories = await api.categories.getStoreCategories.query({ storeId });

  return (
    <>
      <div className="flex items-center justify-between border-b pb-3 dark:border-b-darkAccent">
        <div>
          <DashboardHeader
            heading="Categories"
            subHeading="Manage store categories"
          />
        </div>
        <Link
          href={`/dashboard/${storeId}/categories/new`}
          className="flex items-center gap-2 rounded-lg border border-black bg-black px-2 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black dark:border-lightGray dark:bg-lightGray dark:text-charcoal dark:hover:bg-charcoal dark:hover:text-lightGray sm:px-3 sm:py-2 sm:text-base"
        >
          <MdAdd />
          Add new
        </Link>
      </div>
      {categories.length === 0 && (
        <div className="mt-14 text-center">
          You don't have any billboards yet.
        </div>
      )}
      {categories.length > 0 && (
        <div className="mt-10">
          {categories.map((category) => (
            <div>{category.name}</div>
          ))}
        </div>
      )}
    </>
  );
}

export default CategoriesPage;
