import { Store } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

async function getUserStores(userId?: string) {
  if (!userId) throw new AxiosError("Invalid Request. User Id is undefined");

  const stores = await axios.get<Store[]>(`/api/users/${userId}/stores`);
  return stores;
}

function useGetUserStores(userId?: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: [userId, "stores"],
    queryFn: () => getUserStores(userId),
    select: (data) => data.data,
  });

  return {
    userStores: data,
    isGettingStores: isLoading,
    getUserStoresError: error,
  };
}

export default useGetUserStores;
