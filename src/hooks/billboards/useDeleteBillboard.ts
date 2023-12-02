import { useRouter } from "next/navigation";
import { api } from "@/context/Providers";

function useDeleteBillboard() {
  const router = useRouter();

  const { mutate, isLoading } = api.billboards.deleteBillboard.useMutation({
    onSuccess: () => router.refresh(),
  });

  return { deleteBillboard: mutate, isDeleting: isLoading };
}

export default useDeleteBillboard;
