import Link from "next/link";
import React from "react";
import { MdAdd } from "react-icons/md";

type Props = {
  params: { storeId: string };
};

function BillBoardPage({ params }: Props) {
  return (
    <>
      <div className="flex items-center justify-between border-b pb-3 dark:border-b-darkAccent">
        <div>
          <div className="text-3xl font-bold">Billboards</div>
          <div className="text-gray-600 dark:text-darkMutedText">
            Manage billboards for your store
          </div>
        </div>
        <Link
          href={`/dashboard/${params.storeId}/billboards/new`}
          className="flex items-center gap-2 rounded-lg border border-black bg-black px-3 py-2 font-medium text-white transition-all hover:bg-white hover:text-black dark:border-lightGray dark:bg-lightGray dark:text-charcoal dark:hover:bg-charcoal dark:hover:text-lightGray"
        >
          <MdAdd />
          Add new
        </Link>
      </div>
    </>
  );
}

export default BillBoardPage;
