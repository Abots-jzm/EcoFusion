import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

function useSignOut() {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: () => signOut(),
    onMutate: () => queryClient.clear(),
  });

  return { signOut: mutate, isSigningOut: isLoading, signOutError: error };
}

export default useSignOut;
