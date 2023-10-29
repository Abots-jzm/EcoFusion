import { Store, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { CreateStorePayload } from "../../app/api/store/types";
import { useRouter } from "next/navigation";

async function createStore(payload: CreateStorePayload) {
  const newStore = await axios.post<Store>("/api/store", payload);
  const user = await axios.patch<User>("/api/user/lastSelected", {
    storeId: newStore.data.id,
    userId: newStore.data.ownerId,
  });
  return user;
}

function useCreateStore() {
  const router = useRouter();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: createStore,
    onSuccess: (user) => router.push(`/dashboard/${user.data.lastSelected}`),
  });

  return {
    createStore: mutate,
    isCreating: isLoading,
    createStoreError: error,
  };
}

export default useCreateStore;
