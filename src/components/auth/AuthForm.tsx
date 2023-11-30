import type { Credentials } from "@/trpc/shared";
import Link from "next/link";
import React from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { IoLogoGoogle } from "react-icons/io";
import { MdEmail, MdErrorOutline, MdLock } from "react-icons/md";

type Props = {
  register: UseFormRegister<Credentials>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  isLoading: boolean;
  errors: FieldErrors<Credentials>;
  apiErrorMessage?: string;
  showOtherSigninOptions?: boolean;
  otherPageData: {
    link: string;
    linkText: string;
    linkQuestion: string;
  };
  googleSignInOptions?: {
    onGoogleSignIn: () => void;
    isSigningInWithGoogle: boolean;
  };
};

function AuthForm({
  register,
  handleSubmit,
  title,
  isLoading,
  errors,
  apiErrorMessage,
  showOtherSigninOptions,
  googleSignInOptions,
  otherPageData,
}: Props) {
  return (
    <>
      <div className="mt-7 text-lg font-medium">{title}</div>
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute left-3 top-[11px] text-xl text-gray-400">
            <MdEmail />
          </div>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="w-full rounded-lg border border-gray-300 p-2 pl-10 placeholder:text-gray-400 dark:border-darkAccent dark:bg-charcoal"
            placeholder="Email"
            // required
          />
        </div>
        <div className="relative">
          <div className="absolute left-3 top-[11px] text-xl text-gray-400">
            <MdLock />
          </div>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="w-full rounded-lg border border-gray-300 p-2 pl-10 placeholder:text-gray-400 dark:border-darkAccent dark:bg-charcoal"
            placeholder="Password"
            // required
          />
        </div>
        {!!apiErrorMessage && (
          <div className="relative flex items-center text-sm text-red-600 dark:text-red-400">
            <div className="absolute top-1 grid place-items-center">
              <MdErrorOutline />
            </div>
            <span className="ml-4">{apiErrorMessage}</span>
          </div>
        )}
        {!!errors.email && (
          <div className="relative flex items-center text-sm text-red-600 dark:text-red-400">
            <div className="absolute top-1 grid place-items-center">
              <MdErrorOutline />
            </div>
            <span className="ml-4">{errors.email.message}</span>
          </div>
        )}
        {!!errors.password && (
          <div className="relative flex items-center text-sm text-red-600 dark:text-red-400">
            <div className="absolute top-1 grid place-items-center">
              <MdErrorOutline />
            </div>
            <span className="ml-4">{errors.password.message}</span>
          </div>
        )}
        <button
          className="group flex items-center justify-center gap-4 rounded-lg border border-black bg-black p-2 font-semibold text-white transition-all hover:bg-white hover:text-black disabled:opacity-50 dark:bg-lightGray dark:text-charcoal dark:hover:border-lightGray dark:hover:bg-charcoal dark:hover:text-lightGray"
          disabled={isLoading}
          type="submit"
        >
          <span>{title}</span>
          {isLoading && (
            <div className="h-5 w-5 animate-spin rounded-full border-l-2 border-white group-hover:border-black dark:border-charcoal dark:group-hover:border-lightGray" />
          )}
        </button>
      </form>
      {showOtherSigninOptions && (
        <>
          <div className="py-5 text-center">or</div>
          <div className="flex flex-col gap-4 font-medium">
            <button
              className="group relative flex items-center justify-center gap-4 rounded-lg border border-black bg-white p-2 text-black transition-all hover:bg-black hover:text-white dark:border-lightGray dark:bg-charcoal dark:text-lightGray dark:hover:bg-lightGray dark:hover:text-charcoal"
              onClick={googleSignInOptions?.onGoogleSignIn}
            >
              <div className="absolute left-6">
                <IoLogoGoogle />
              </div>
              <span>Sign in with Google</span>
              {googleSignInOptions?.isSigningInWithGoogle && (
                <div className="h-5 w-5 animate-spin rounded-full border-l-2 border-black group-hover:border-white dark:border-lightGray dark:group-hover:border-charcoal" />
              )}
            </button>
          </div>
        </>
      )}
      <div className="pt-6 text-center">
        {otherPageData.linkQuestion}{" "}
        <Link className="font-semibold underline" href={otherPageData.link}>
          {otherPageData.linkText}
        </Link>
      </div>
    </>
  );
}

export default AuthForm;
