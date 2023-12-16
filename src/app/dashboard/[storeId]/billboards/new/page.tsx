"use client";

import BillboardForm, {
  type BillboardFormData,
} from "@/components/dashboard/billboards/BillboardForm";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useCreateBillboardUpload } from "@/hooks/billboards/upload/generateReactHelpers";
import useCreateBillboard from "@/hooks/billboards/useCreateBillboard";

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
        <DashboardHeader
          heading="Create billboard"
          subHeading="Add a new billboard"
        />
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
