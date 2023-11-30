import { api } from "@/context/Providers";
import type { Store } from "@/trpc/shared";

function useGetUserStores(initialData?: Store[]) {
  const { data, isLoading, error } = api.users.getStores.useQuery(undefined, {
    initialData,
  });

  return {
    userStores: data,
    isGettingStores: isLoading,
    getUserStoresError: error,
  };
}

export default useGetUserStores;
