"use client";

import { z } from "zod";
import AuthForm from "@/components/auth/AuthForm";
import useRegister from "@/hooks/auth/useRegister";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Credentials } from "@/trpc/shared";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: zodResolver(
      z.object({
        email: z.string().email("Invalid email address").trim(),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long")
          .trim(),
      }),
    ),
  });
  const { registerUser, isRegistering, registerError } = useRegister();

  function onFormSubmit(credentials: Credentials) {
    registerUser(credentials);
  }

  return (
    <AuthForm
      register={register}
      handleSubmit={handleSubmit(onFormSubmit)}
      title="Register"
      isLoading={isRegistering}
      errors={errors}
      apiErrorMessage={registerError?.message}
      otherPageData={{
        link: "/login",
        linkQuestion: "Already have an account?",
        linkText: "Login",
      }}
    />
  );
}

export default Register;
