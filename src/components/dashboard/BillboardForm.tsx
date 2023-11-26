"use client";

import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";

type FormData = {
  backgroundImage?: FileList;
  label: string;
};

type Props = {
  buttonTxt: string;
  initialData?: any; //TODO
};

function BillboardForm({ buttonTxt }: Props) {
  const { register, handleSubmit, watch, formState } = useForm<FormData>();
  const {
    errors: { backgroundImage: bgError },
  } = formState;
  const currentImage = watch("backgroundImage")?.[0];

  function onFormSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <div className="flex flex-col justify-between gap-8 lg:flex-row">
      <div className="flex-1">
        <div className="pb-3 font-semibold">Preview</div>
        <div className="h-60 w-full overflow-hidden rounded bg-gray-100 dark:bg-[#2e2e2e]">
          {!currentImage && (
            <div className="grid h-full w-full place-items-center">
              Upload an image to get started
            </div>
          )}
          {currentImage && (
            <img
              src={URL.createObjectURL(currentImage)}
              alt="uploaded image"
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)} className="flex-1">
        <div className="flex h-full flex-col items-start gap-3">
          <div className="hidden font-semibold lg:block">Customize</div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-sm font-semibold">Background image</div>
            <label
              htmlFor="image"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-black px-2 py-1.5 text-sm font-medium transition-all hover:bg-black hover:text-white dark:border-lightGray dark:hover:bg-lightGray dark:hover:text-charcoal"
            >
              <RiImageAddFill />
              {!currentImage ? "Upload" : "Change"} image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              {...register("backgroundImage", {
                required: "A background image is required",
              })}
            />
            {bgError && (
              <div className="relative flex items-center text-sm text-red-600 dark:text-red-400">
                <div className="absolute top-1 grid place-items-center">
                  <MdErrorOutline />
                </div>
                <span className="ml-4">{bgError.message}</span>
              </div>
            )}
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="text-sm font-semibold">Label</div>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none dark:border-darkAccent dark:bg-charcoal sm:w-96"
              {...register("label")}
            />
          </div>
          <button
            className="mt-5 flex items-center gap-2 rounded-lg border border-black bg-black px-3 py-2 font-medium text-white transition-all hover:bg-white hover:text-black dark:border-lightGray dark:bg-lightGray dark:text-charcoal dark:hover:bg-charcoal dark:hover:text-lightGray lg:mt-auto"
            type="submit"
          >
            {buttonTxt}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BillboardForm;
