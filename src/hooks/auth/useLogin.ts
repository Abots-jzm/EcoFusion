import { Credentials } from "@/app/(auth)/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";

async function login(credentials: Credentials) {
  const res = await signIn("credentials", { ...credentials, redirect: false });
  if (res?.error) throw new AxiosError(res.error);

  return res;
}

export function useLogin() {
  const { mutate, isLoading, error } = useMutation({
    mutationFn: login,
  });

  return { login: mutate, isLoggingIn: isLoading, loginError: error };
}
