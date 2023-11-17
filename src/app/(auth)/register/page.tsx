"use client";

import { Credentials } from "@/app/api/users/types";
import AuthForm from "@/components/auth/AuthForm";
import useRegister from "@/hooks/auth/useRegister";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";

function Register() {
  const { register, handleSubmit } = useForm<Credentials>();
  const { registerUser, isRegistering, registerError } = useRegister();
  const typedError = registerError as AxiosError;

  function onFormSubmit(credentials: Credentials) {
    registerUser(credentials);
  }

  return (
    <AuthForm
      register={register}
      handleSubmit={handleSubmit(onFormSubmit)}
      title="Register"
      isLoading={isRegistering}
      error={typedError}
      otherPageData={{
        link: "/login",
        linkQuestion: "Already have an account?",
        linkText: "Login",
      }}
    />
  );
}

export default Register;
