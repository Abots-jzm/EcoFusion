import { api } from "@/context/Providers";
import { useRouter } from "next/navigation";

function useCreateBillboard() {
  const router = useRouter();

  const { mutate, isLoading, isError } = api.billboards.create.useMutation({
    onSuccess: () => router.back(),
  });

  return {
    createBillboard: mutate,
    isCreating: isLoading,
    createBillboardError: isError,
  };
}

export default useCreateBillboard;
