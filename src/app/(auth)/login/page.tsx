"use client";

import AuthForm from "@/components/AuthForm";
import React from "react";
import { Credentials } from "../types";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm<Credentials>();

  function onFormSubmit(credentials: Credentials) {}

  return (
    <AuthForm
      register={register}
      handleSubmit={handleSubmit(onFormSubmit)}
      title="Login"
      otherPageData={{
        link: "/register",
        linkQuestion: "Don't have an account?",
        linkText: "Register",
      }}
      showOtherSigninOptions
    />
  );
}

export default Login;
