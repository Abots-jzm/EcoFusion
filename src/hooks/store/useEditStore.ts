import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUserId from "../auth/useUserId";
import axios from "axios";
import { Store } from "@prisma/client";
import { EditStorePayload } from "@/app/api/stores/types";

async function editStore(payload: EditStorePayload) {
  const store = await axios.patch<Store>(
    `/api/stores/${payload.storeId}/edit`,
    payload,
  );
  return store.data;
}

function useEditStore() {
  const queryClient = useQueryClient();
  const userId = useUserId();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: editStore,
    onSuccess() {
      queryClient.invalidateQueries([userId, "stores"]);
    },
  });

  return { editStore: mutate, editingStore: isLoading, editStoreError: error };
}

export default useEditStore;
