import { useRouter } from "next/navigation";
import { api } from "@/context/Providers";

function useDeleteStore() {
  const router = useRouter();
  const utils = api.useUtils();

  const { mutate, isLoading, error } = api.stores.delete.useMutation({
    onSuccess(nextStoreId) {
      void utils.users.getInitialData.invalidate();
      void utils.users.getStores.invalidate();
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
