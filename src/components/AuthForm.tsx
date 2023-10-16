import React from "react";
import { MdEmail, MdLock } from "react-icons/md";
import { IoLogoGoogle } from "react-icons/io";
import Link from "next/link";
import { UseFormRegister } from "react-hook-form";
import { Credentials } from "@/app/(auth)/types";

type Props = {
  register: UseFormRegister<Credentials>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  showOtherSigninOptions?: boolean;
  otherPageData: {
    link: string;
    linkText: string;
    linkQuestion: string;
  };
};

function AuthForm({
  register,
  handleSubmit,
  title,
  showOtherSigninOptions,
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
            className="w-full rounded-lg border border-gray-300 p-2 pl-10 placeholder:text-gray-400"
            placeholder="Email"
            required
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
            className="w-full rounded-lg border border-gray-300 p-2 pl-10 placeholder:text-gray-400"
            placeholder="Password"
            required
          />
        </div>
        <button
          className="flex items-center justify-center gap-4 rounded-lg border border-black bg-black p-2 font-semibold text-white transition-all hover:bg-white hover:text-black"
          type="submit"
        >
          {title}
        </button>
      </form>
      {showOtherSigninOptions && (
        <>
          <div className="py-5 text-center">or</div>
          <div className="flex flex-col gap-4 font-medium">
            <button className="relative flex items-center justify-center gap-4 rounded-lg border border-black bg-white p-2 text-black transition-all hover:bg-black hover:text-white">
              <div className="absolute left-6">
                <IoLogoGoogle />
              </div>
              Sign in with Google
            </button>
            <button className="flex items-center justify-center gap-4 rounded-lg border border-black bg-white p-2 text-black transition-all hover:bg-black hover:text-white">
              Continue as guest
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
