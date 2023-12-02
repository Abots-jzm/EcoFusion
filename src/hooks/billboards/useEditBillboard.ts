import { api } from "@/context/Providers";
import { useRouter } from "next/navigation";

function useEditBillboard() {
  const router = useRouter();

  const { mutate, isLoading, isError } =
    api.billboards.editBillboard.useMutation({
      onSuccess() {
        router.back();
        router.refresh();
      },
    });

  return {
    editBillboard: mutate,
    isEditing: isLoading,
    editBillboardError: isError,
  };
}

export default useEditBillboard;
