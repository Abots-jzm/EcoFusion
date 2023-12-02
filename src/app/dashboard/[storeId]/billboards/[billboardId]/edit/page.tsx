import EditBillboard from "@/components/dashboard/billboards/EditBillboard";
import { api } from "@/trpc/server";
import React from "react";

type Props = {
  params: { storeId: string; billboardId: string };
};

async function EditBillboardPage({ params: { storeId, billboardId } }: Props) {
  const billboard = await api.billboards.getBillboard.query({
    storeId,
    id: billboardId,
  });
  return <EditBillboard billboard={billboard} />;
}

export default EditBillboardPage;
