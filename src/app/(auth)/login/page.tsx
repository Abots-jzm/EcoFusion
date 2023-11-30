"use client";

import { z } from "zod";
import AuthForm from "@/components/auth/AuthForm";
import useGoogleSignIn from "@/hooks/auth/useGoogleSignIn";
import useLogin from "@/hooks/auth/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TRPCError } from "@trpc/server";
import { useForm } from "react-hook-form";
import type { Credentials } from "@/trpc/shared";

function Login() {
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
  const { login, isLoggingIn, loginError } = useLogin();
  const typedError = loginError as TRPCError | null;

  const { googleSignIn, isSigningInWithGoogle } = useGoogleSignIn();

  function onFormSubmit(credentials: Credentials) {
    login(credentials);
  }

  function onGoogleSignIn() {
    googleSignIn();
  }

  return (
    <AuthForm
      register={register}
      handleSubmit={handleSubmit(onFormSubmit)}
      title="Login"
      isLoading={isLoggingIn}
      errors={errors}
      apiErrorMessage={typedError?.message}
      otherPageData={{
        link: "/register",
        linkQuestion: "Don't have an account?",
        linkText: "Register",
      }}
      showOtherSigninOptions
      googleSignInOptions={{
        onGoogleSignIn,
        isSigningInWithGoogle,
      }}
    />
  );
}

export default Login;
