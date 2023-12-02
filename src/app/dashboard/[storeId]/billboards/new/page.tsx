"use client";

import BillboardForm, {
  type BillboardFormData,
} from "@/components/dashboard/BillboardForm";
import { useCreateBillboardUpload } from "@/hooks/billboards/upload/generateReactHelpers";
import useCreateBillboard from "@/hooks/billboards/useCreateBillboard";
import React from "react";

type Props = {
  params: { storeId: string };
};

function NewBillboard({ params: { storeId } }: Props) {
  const { createBillboard, isCreating } = useCreateBillboard();
  const { createBillboardUpload, isUploading } = useCreateBillboardUpload();
  const isLoading = isUploading || isCreating;

  async function onFormSubmit({
    label,
    newImage,
    presetUrl,
    presetPriority,
  }: BillboardFormData) {
    if (presetPriority === "upload" && !!newImage?.[0])
      await createBillboardUpload([newImage[0]], {
        storeId,
        label,
        mode: "create",
      });
    if (presetPriority === "url" && !!presetUrl)
      createBillboard({ label, storeId, imageUrl: presetUrl });
  }

  return (
    <>
      <div className="mb-6 border-b pb-3 dark:border-b-darkAccent">
        <div className="text-3xl font-bold">Create billboard</div>
        <div className="text-gray-600 dark:text-darkMutedText">
          Add a new billboard
        </div>
      </div>
      <BillboardForm
        buttonTxt="Create"
        isLoading={isLoading}
        onFormSubmit={onFormSubmit}
      />
    </>
  );
}

export default NewBillboard;
