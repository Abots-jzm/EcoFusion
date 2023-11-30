import { api } from "@/context/Providers";

function useUpdateLastSelected() {
  const utils = api.useUtils();

  const {mutate, isLoading, error} = api.users.updateLastSelected.useMutation({
    onSuccess: () => utils.users.getInitialData.invalidate(),
  });

  return {
    updateLastSelected: mutate,
    isUpdating: isLoading,
    updateLastSelectedError: error,
  };
}

export default useUpdateLastSelected;
