import { useRouter } from "next/navigation";
import { api } from "@/context/Providers";

function useCreateStore() {
  const router = useRouter();
  const utils = api.useUtils();

  const { mutate, isLoading, error } = api.stores.create.useMutation({
    onSuccess(lastSelected) {
      lastSelected && router.push(`/dashboard/${lastSelected}`);
      void utils.users.getInitialData.invalidate();
      void utils.users.getStores.invalidate();
    },
  });

  return {
    createStore: mutate,
    isCreating: isLoading,
    createStoreError: error,
  };
}

export default useCreateStore;
