import { Credentials } from "@/app/api/register/types";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

async function register(credentials: Credentials) {
  const registerResponse = await axios.post("/api/register", credentials, {
    validateStatus: () => true,
  });
  if (registerResponse.status === 400)
    throw new AxiosError(registerResponse.data);

  const res = await signIn("credentials", { ...credentials, redirect: false });
  if (res?.error) throw new AxiosError(res.error);

  return res;
}

function useRegister() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { mutate, isLoading, error } = useMutation({
    mutationFn: register,
    onSuccess: () => router.replace(callbackUrl || "/dashboard"),
  });

  return {
    registerUser: mutate,
    isRegistering: isLoading,
    registerError: error,
  };
}

export default useRegister;
