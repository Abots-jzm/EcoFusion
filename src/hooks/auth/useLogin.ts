import { type Credentials } from "@/trpc/shared";
import { useMutation } from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

async function login(credentials: Credentials) {
  const res = await signIn("credentials", { ...credentials, redirect: false });
  if (res?.error) throw new TRPCClientError(res.error);

  return res;
}

function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { mutate, isLoading, error } = useMutation({
    mutationFn: login,
    onSuccess: () => router.replace(callbackUrl ?? "/dashboard"),
  });

  return { login: mutate, isLoggingIn: isLoading, loginError: error };
}

export default useLogin;
