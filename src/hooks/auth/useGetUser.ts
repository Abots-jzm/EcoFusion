import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "./types";
import useUserId from "./useUserId";

async function getUser(userId: string) {
  const axiosUser = await axios.get<User>(`/api/users/${userId}`);
  return axiosUser.data;
}

function useGetUser(initialData?: User) {
  const userId = useUserId();
  const { data, isLoading, error } = useQuery({
    queryKey: [userId],
    queryFn: () => getUser(userId),
    initialData,
  });

  return { user: data, isGettingUser: isLoading, getUserError: error };
}

export default useGetUser;
