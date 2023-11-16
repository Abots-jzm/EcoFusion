import { Store } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CreateStorePayload } from "../../app/api/stores/types";
import { User } from "@/store/slices/userSlice";

async function createStore(payload: CreateStorePayload) {
  const newStore = await axios.post<Store>("/api/stores", payload);
  const user = await axios.patch<User>(
    `/api/users/${payload.ownerId}/lastSelected`,
    {
      storeId: newStore.data.id,
    },
  );
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
