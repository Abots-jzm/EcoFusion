"use client";

import AuthForm from "@/components/AuthForm";
import React from "react";
import { Credentials } from "../types";
import { useForm } from "react-hook-form";
import useLogin from "@/hooks/auth/useLogin";
import { AxiosError } from "axios";
import useGoogleSignIn from "@/hooks/auth/useGoogleSignIn";

function Login() {
  const { register, handleSubmit } = useForm<Credentials>();
  const { login, isLoggingIn, loginError } = useLogin();
    const { googleSignIn, isSigningInWithGoogle, googleSignInError } =
      useGoogleSignIn();

  const typedError = loginError as AxiosError;
  const typedGoogleError = googleSignInError as AxiosError

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
      error={typedError}
      otherPageData={{
        link: "/register",
        linkQuestion: "Don't have an account?",
        linkText: "Register",
      }}
      showOtherSigninOptions
      googleSignInOptions={{
        onGoogleSignIn,
        googleSignInError: typedGoogleError,
        isSigningInWithGoogle
      }}
    />
  );
}

export default Login;
