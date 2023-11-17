import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useUserId from "../auth/useUserId";
import { Store } from "@prisma/client";

async function getUserStores(userId: string) {
  const axiosStore = await axios.get<Store[]>(`/api/users/${userId}/stores`);
  return axiosStore.data;
}

function useGetUserStores(initialData?: Store[]) {
  const userId = useUserId();
  const { data, isLoading, error } = useQuery({
    queryKey: [userId, "stores"],
    queryFn: () => getUserStores(userId),
    initialData,
  });

  return {
    userStores: data,
    isGettingStores: isLoading,
    getUserStoresError: error,
  };
}

export default useGetUserStores;
