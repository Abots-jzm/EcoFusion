"use client";

import AuthForm from "@/components/AuthForm";
import React from "react";
import { useForm } from "react-hook-form";
import { Credentials } from "../types";
import { useRegister } from "@/hooks/auth/useRegister";

function Register() {
  const { register, handleSubmit } = useForm<Credentials>();
  const { registerUser, isLoading, error } = useRegister();

  function onFormSubmit(credentials: Credentials) {
    registerUser(credentials);
  }

  return (
    <AuthForm
      register={register}
      handleSubmit={handleSubmit(onFormSubmit)}
      title="Register"
      otherPageData={{
        link: "/login",
        linkQuestion: "Already have an account?",
        linkText: "Login",
      }}
    />
  );
}

export default Register;
