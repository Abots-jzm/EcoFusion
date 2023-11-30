import { api } from "@/context/Providers";

function useEditStore() {
  const utils = api.useUtils();

  const { mutate, isLoading, error } = api.stores.edit.useMutation({
    onSuccess() {
      void utils.users.getInitialData.invalidate();
      void utils.users.getStores.invalidate();
    },
  });

  return { editStore: mutate, editingStore: isLoading, editStoreError: error };
}

export default useEditStore;
