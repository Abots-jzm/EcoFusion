import { DeleteStorePayload } from "@/app/api/stores/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useUserId from "../auth/useUserId";
import { useRouter } from "next/navigation";

async function deleteStore(payload: DeleteStorePayload) {
  const nextStoreId = await axios.delete<string | null>(
    `/api/stores/${payload.storeId}/delete`,
    {
      data: payload,
    },
  );
  return nextStoreId.data;
}

function useDeleteStore() {
  const queryClient = useQueryClient();
  const userId = useUserId();
  const router = useRouter();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: deleteStore,
    onSuccess(nextStoreId) {
      queryClient.invalidateQueries([userId, "stores"]);
      router.replace("/dashboard" + (nextStoreId ? `/${nextStoreId}` : ""));
    },
  });

  return {
    deleteStore: mutate,
    isDeleting: isLoading,
    deleteStoreError: error,
  };
}

export default useDeleteStore;
