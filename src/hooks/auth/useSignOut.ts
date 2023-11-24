import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      queryClient.clear();
      router.push("/");
    },
  });

  return { signOut: mutate, isSigningOut: isLoading, signOutError: error };
}

export default useSignOut;
