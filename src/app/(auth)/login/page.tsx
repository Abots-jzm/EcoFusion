"use client";

import { Credentials } from "@/app/api/users/types";
import AuthForm from "@/components/auth/AuthForm";
import useGoogleSignIn from "@/hooks/auth/useGoogleSignIn";
import useLogin from "@/hooks/auth/useLogin";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm<Credentials>();
  const { login, isLoggingIn, loginError } = useLogin();
  const { googleSignIn, isSigningInWithGoogle, googleSignInError } =
    useGoogleSignIn();

  const typedError = loginError as AxiosError;
  const typedGoogleError = googleSignInError as AxiosError;

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
        isSigningInWithGoogle,
      }}
    />
  );
}

export default Login;
