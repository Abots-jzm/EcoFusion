import type { User } from "@/trpc/shared";
import { api } from "@/context/Providers";

function useGetUser(initialData?: User) {
  const { data, isLoading, error } = api.users.getCurrent.useQuery(undefined, {
    initialData,
  });

  return { user: data, isGettingUser: isLoading, getUserError: error };
}

export default useGetUser;
