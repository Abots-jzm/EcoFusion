"use client";

import DynamicTextColorComponent from "@/components/util/DynamicTextColor";
import useDeleteBillboard from "@/hooks/billboards/useDeleteBillboard";
import Image from "next/image";
import Link from "next/link";
import { MdDelete, MdModeEdit } from "react-icons/md";

type Props = {
  id: string;
  label: string | null;
  imageUrl: string;
  storeId: string;
};

function BillboardItem({ imageUrl, label, id, storeId }: Props) {
  const { deleteBillboard, isDeleting } = useDeleteBillboard();

  return (
    <div className="group relative h-48 cursor-pointer overflow-hidden rounded-md transition-all">
      <Image
        src={imageUrl}
        alt={label ?? "Billboard"}
        fill
        className="object-cover object-center"
      />
      {!!label && (
        <DynamicTextColorComponent
          imageUrl={imageUrl}
          className="absolute inset-0 z-10 grid place-items-center px-16 text-center text-2xl font-semibold transition-opacity group-hover:opacity-50"
        >
          {label}
        </DynamicTextColorComponent>
      )}
      <div className="absolute inset-0 bg-black opacity-0 transition-all group-hover:opacity-70" />
      <div className="group absolute inset-0 flex items-end justify-center pb-8">
        <Link
          href={`/dashboard/${storeId}/billboards/${id}/edit`}
          className="group/edit relative z-10 grid h-8 w-8 translate-x-0 translate-y-20 transform place-items-center rounded-full bg-white text-xl text-black transition-all hover:opacity-50 group-hover:-translate-x-4 group-hover:translate-y-0"
        >
          <MdModeEdit />
        </Link>
        <button
          className="group relative z-10 grid h-8 w-8 translate-x-0 translate-y-20 transform place-items-center rounded-full bg-red-600 text-xl text-white transition-all hover:opacity-50 disabled:opacity-50 group-hover:translate-x-4 group-hover:translate-y-0"
          disabled={isDeleting}
          onClick={() => deleteBillboard({ id, storeId })}
        >
          {!isDeleting && <MdDelete />}
          {isDeleting && (
            <div className="h-4 w-4 animate-spin rounded-full border-l-2 border-white" />
          )}
        </button>
      </div>
    </div>
  );
}

export default BillboardItem;
