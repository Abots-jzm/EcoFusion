import { type UploadRouter } from "@/app/api/uploadthing/core";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import { useRouter } from "next/navigation";

const { useUploadThing } = generateReactHelpers<UploadRouter>();

export function useCreateBillboardUpload() {
  const router = useRouter();

  const { isUploading, startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete() {
      router.back();
      router.refresh();
    },
  });

  return { isUploading, createBillboardUpload: startUpload };
}

export function useEditBillboardUpload() {
  const router = useRouter();

  const { isUploading, startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete() {
      router.back();
      router.refresh();
    },
  });

  return { isUploading, editBillboardUpload: startUpload };
}
