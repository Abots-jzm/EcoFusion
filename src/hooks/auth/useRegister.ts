import { api } from "@/context/Providers";
import { useRouter, useSearchParams } from "next/navigation";

function useRegister() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { mutate, isLoading, error } = api.users.register.useMutation({
    onSuccess: () => router.replace(callbackUrl ?? "/dashboard"),
  });

  return {
    registerUser: mutate,
    isRegistering: isLoading,
    registerError: error,
  };
}

export default useRegister;
