import { CreateBillBoardPayload } from "@/app/api/uploadthing/core";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

async function createBillboard(payload: CreateBillBoardPayload) {
  await axios.post("/api/billboards", payload);
}

function useCreateBillboard() {
  const router = useRouter();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: createBillboard,
    onSuccess: () => router.back(),
  });

  return {
    createBillboard: mutate,
    isCreating: isLoading,
    createBillboardError: isError,
  };
}

export default useCreateBillboard;
