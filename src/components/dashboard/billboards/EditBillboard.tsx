"use client";

import BillboardForm, {
  type BillboardFormData,
} from "@/components/dashboard/billboards/BillboardForm";
import { useEditBillboardUpload } from "@/hooks/billboards/upload/generateReactHelpers";
import useEditBillboard from "@/hooks/billboards/useEditBillboard";
import type { Billboard } from "@/trpc/shared";
import DashboardHeader from "../DashboardHeader";

type Props = {
  billboard: Billboard;
};

function EditBillboard({ billboard: { storeId, label, imageUrl, id } }: Props) {
  const { editBillboard, isEditing } = useEditBillboard();
  const { editBillboardUpload, isUploading } = useEditBillboardUpload();
  const isLoading = isUploading || isEditing;

  async function onFormSubmit({
    label,
    newImage,
    presetUrl,
    presetPriority,
  }: BillboardFormData) {
    if (presetPriority === "upload" && !!newImage?.[0])
      await editBillboardUpload([newImage[0]], {
        storeId,
        label,
        mode: "edit",
        billboardId: id,
      });
    if (presetPriority === "url" && !!presetUrl)
      editBillboard({ label, storeId, imageUrl: presetUrl, id });
  }

  return (
    <>
      <div className="mb-6 border-b pb-3 dark:border-b-darkAccent">
        <DashboardHeader
          heading="Edit billboard"
          subHeading="Edit an existing billboard"
        />
      </div>
      <BillboardForm
        buttonTxt="Edit"
        isLoading={isLoading}
        onFormSubmit={onFormSubmit}
        initialData={{
          label: label ?? undefined,
          presetUrl: imageUrl,
        }}
      />
    </>
  );
}

export default EditBillboard;
