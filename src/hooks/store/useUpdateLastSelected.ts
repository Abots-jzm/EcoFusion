import { UpdateLastSelectedPayload } from "@/app/api/users/[id]/lastSelected/types";
import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import useUserId from "../auth/useUserId";

async function updateLastSelected({
  storeId,
  userId,
}: UpdateLastSelectedPayload) {
  const user = await axios.patch<User>(`/api/users/${userId}/lastSelected`, {
    storeId,
  });
  return user.data;
}

function useUpdateLastSelected() {
  const userId = useUserId();
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: updateLastSelected,
    onSuccess: () => queryClient.invalidateQueries([userId]),
  });

  return {
    updateLastSelected: mutate,
    isUpdating: isLoading,
    updateLastSelectedError: error,
  };
}

export default useUpdateLastSelected;
