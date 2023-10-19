import { Credentials } from "@/app/(auth)/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";

async function googleSignIn() {
  const res = await signIn("google");
  if (res?.error) throw new AxiosError(res.error);

  return res;
}

function useGoogleSignIn() {
  const { mutate, isLoading, error } = useMutation({
    mutationFn: googleSignIn,
  });

  return {
    googleSignIn: mutate,
    isSigningInWithGoogle: isLoading,
    googleSignInError: error,
  };
}

export default useGoogleSignIn;
