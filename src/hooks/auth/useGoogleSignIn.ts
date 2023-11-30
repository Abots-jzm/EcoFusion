import { useMutation } from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

async function googleSignIn() {
  const res = await signIn("google");

  if (res?.error) throw new TRPCClientError(res.error);

  return res;
}

function useGoogleSignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { mutate, isLoading, error } = useMutation({
    mutationFn: googleSignIn,
    onSuccess: () => router.replace(callbackUrl ?? "/dashboard"),
  });

  return {
    googleSignIn: mutate,
    isSigningInWithGoogle: isLoading,
    googleSignInError: error,
  };
}

export default useGoogleSignIn;
