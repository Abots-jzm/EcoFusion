import { Store } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CreateStorePayload } from "../../app/api/stores/types";
import { User } from "../auth/types";
import useUserId from "../auth/useUserId";

async function createStore(payload: CreateStorePayload) {
  const newStore = await axios.post<Store>("/api/stores", payload);
  const user = await axios.patch<User>(
    `/api/users/${payload.ownerId}/lastSelected`,
    {
      storeId: newStore.data.id,
    },
  );
  return user.data;
}

function useCreateStore() {
  const userId = useUserId();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: createStore,
    onSuccess(user) {
      queryClient.invalidateQueries([userId, "store"]);
      router.push(`/dashboard/${user.lastSelected}`);
    },
  });

  return {
    createStore: mutate,
    isCreating: isLoading,
    createStoreError: error,
  };
}

export default useCreateStore;
