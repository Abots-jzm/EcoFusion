import { UpdateLastSelectedPayload } from "@/app/api/user/lastSelected/types";
import { User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function updateLastSelected({
  storeId,
  userId,
}: UpdateLastSelectedPayload) {
  const user = await axios.patch<User>("/api/user/lastSelected", {
    storeId,
    userId,
  });
  return user;
}

function useUpdateLastSelected() {
  const { mutate, isLoading, error } = useMutation({
    mutationFn: updateLastSelected,
  });

  return {
    updateLastSelected: mutate,
    isUpdating: isLoading,
    updateLastSelectedError: error,
  };
}

export default useUpdateLastSelected;
