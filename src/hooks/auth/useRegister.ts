import { Credentials } from "@/app/(auth)/types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function register(credentials: Credentials) {
  return axios.post("/api/register", credentials);
}

function useRegister() {
  const { mutate, isLoading, error } = useMutation({
    mutationFn: register,
  });

  return {
    registerUser: mutate,
    isRegistering: isLoading,
    registerError: error,
  };
}

export default useRegister;
