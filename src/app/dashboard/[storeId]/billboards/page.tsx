import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BillboardItem from "@/components/dashboard/billboards/BillboardItem";
import { api } from "@/trpc/server";
import Link from "next/link";
import { MdAdd } from "react-icons/md";

type Props = {
  params: { storeId: string };
};

async function BillBoardPage({ params: { storeId } }: Props) {
  const billboards = await api.billboards.getUserBillboards.query({ storeId });

  return (
    <>
      <div className="flex items-center justify-between border-b pb-3 dark:border-b-darkAccent">
        <div>
          <DashboardHeader
            heading="Billboards"
            subHeading="Manage billboards for your store"
          />
        </div>
        <Link
          href={`/dashboard/${storeId}/billboards/new`}
          className="flex items-center gap-2 rounded-lg border border-black bg-black px-2 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black dark:border-lightGray dark:bg-lightGray dark:text-charcoal dark:hover:bg-charcoal dark:hover:text-lightGray sm:px-3 sm:py-2 sm:text-base"
        >
          <MdAdd />
          Add new
        </Link>
      </div>
      {billboards.length === 0 && (
        <div className="mt-14 text-center">
          You don't have any billboards yet.
        </div>
      )}
      {billboards.length !== 0 && (
        <div className="grid grid-cols-fluid gap-6 py-10">
          {billboards.map((billboard) => (
            <BillboardItem key={billboard.id} {...billboard} />
          ))}
        </div>
      )}
    </>
  );
}

export default BillBoardPage;
