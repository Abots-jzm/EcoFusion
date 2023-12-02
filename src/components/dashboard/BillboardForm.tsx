"use client";

import { BILLBOARD_PRESET_URLS, getPresetBlur } from "@/libs/data";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import Image from "next/image";
import DynamicTextColorComponent from "../util/DynamicTextColor";
import { useRouter } from "next/navigation";

type FormData = {
  presetUrl?: string;
  newImage?: FileList;
  label?: string;
};
type PresetPriority = "url" | "upload" | undefined;

export type BillboardFormData = FormData & { presetPriority: PresetPriority };

type Props = {
  buttonTxt: "Create" | "Edit";
  initialData?: FormData;
  isLoading: boolean;
  onFormSubmit: (data: BillboardFormData) => void;
};

function BillboardForm({
  buttonTxt,
  initialData,
  isLoading,
  onFormSubmit,
}: Props) {
  const router = useRouter();
  const { register, handleSubmit, watch, formState, control, clearErrors } =
    useForm<FormData>({ defaultValues: initialData });
  const {
    errors: { newImage, presetUrl, label: labelError },
  } = formState;
  const bgError = newImage ?? presetUrl;

  const [presetPriority, setPresetPriority] = useState<PresetPriority>(
    initialData ? "url" : undefined,
  );

  function getCurrentImage() {
    const imageToUpload = watch("newImage")?.[0];
    if (presetPriority === "upload" && imageToUpload)
      return URL.createObjectURL(imageToUpload);
    if (presetPriority === "url" && watch("presetUrl"))
      return watch("presetUrl");
  }

  function getButtonText() {
    if (isLoading)
      if (buttonTxt === "Create") return "Creating";
      else return "Editing";

    return buttonTxt;
  }

  const currentImage = getCurrentImage();
  const currentBlurData = getPresetBlur(currentImage);

  return (
    <div className="flex flex-col justify-between gap-8 lg:flex-row">
      <div className="flex-1">
        <div className="pb-3 font-semibold">Preview</div>
        <div className="relative h-60 w-full overflow-hidden rounded bg-gray-100 dark:bg-[#2e2e2e]">
          {!currentImage && (
            <div className="grid h-full w-full place-items-center">
              Upload an image to get started
            </div>
          )}
          {!!currentImage && (
            <>
              <Image
                key={presetPriority === "url" ? currentImage : undefined}
                src={currentImage}
                alt="billboard background preview"
                className="object-cover object-center transition-all"
                fill
                placeholder={!currentBlurData ? "empty" : "blur"}
                blurDataURL={currentBlurData}
              />
              <DynamicTextColorComponent
                imageUrl={currentImage}
                className="absolute inset-0 z-10 grid place-items-center px-16 text-center text-4xl font-bold"
              >
                {watch("label")}
              </DynamicTextColorComponent>
            </>
          )}
        </div>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          if (!!initialData)
            if (
              data.label === initialData.label &&
              data.presetUrl === initialData.presetUrl &&
              !data.newImage
            ) {
              router.back();
              return;
            }

          onFormSubmit({ ...data, presetPriority });
        })}
        className="flex-1"
      >
        <div className="flex h-full flex-col items-start gap-3">
          <div className="hidden font-semibold lg:block">Customize</div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-sm font-semibold">Background image</div>
            <Controller
              name="presetUrl"
              control={control}
              rules={{
                validate(data) {
                  if (!data && !watch("newImage")?.[0])
                    return "A background image is required";
                },
              }}
              render={({ field }) => (
                <Listbox
                  value={field.value}
                  onChange={(newValue) => {
                    setPresetPriority("url");
                    field.onChange(newValue);
                    clearErrors("label");
                  }}
                >
                  <div className="relative">
                    <Listbox.Button className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-black px-2 py-1.5 text-sm font-medium transition-all hover:bg-black hover:text-white dark:border-lightGray dark:hover:bg-lightGray dark:hover:text-charcoal">
                      <RiImageAddFill />
                      {watch("presetUrl") ? "Change" : "Choose"} image
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute bottom-10 z-10 mt-1 w-72 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none dark:border dark:border-darkAccent dark:bg-charcoal sm:w-96 sm:text-sm lg:bottom-auto">
                        <div className="grid grid-cols-3 gap-5 p-4 sm:grid-cols-4">
                          {BILLBOARD_PRESET_URLS.map((url, index) => (
                            <Listbox.Option
                              value={url}
                              key={index}
                              className={({ selected }) =>
                                `h-10 w-20 cursor-pointer overflow-hidden rounded-lg hover:ring-2 hover:ring-blue-400 ${
                                  selected ? "ring-4 hover:ring-blue-400" : ""
                                }`
                              }
                            >
                              <Image
                                src={url}
                                alt={`preset ${index + 1}`}
                                className="h-full w-full object-cover object-center"
                                height={40}
                                width={80}
                                priority
                              />
                            </Listbox.Option>
                          ))}
                          <div className="sm:col-span-4 sm:border-t sm:border-t-gray-200 sm:pt-4 sm:dark:border-t-darkAccent">
                            <label
                              htmlFor="image"
                              className="flex h-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-black px-2 py-1.5 text-sm font-medium transition-all hover:bg-black hover:text-white dark:border-lightGray dark:hover:bg-lightGray dark:hover:text-charcoal"
                            >
                              <IoCloudUploadOutline />
                              <div className="hidden sm:block">
                                Upload image
                              </div>
                            </label>
                            <Controller
                              name="newImage"
                              control={control}
                              rules={{
                                validate(data) {
                                  if (!data?.[0] && !watch("presetUrl"))
                                    return "A background image is required";
                                },
                              }}
                              render={({
                                field: { onChange, value, ...field },
                              }) => (
                                <input
                                  {...field}
                                  type="file"
                                  id="image"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    setPresetPriority("upload");
                                    onChange(e.target.files);
                                    clearErrors("label");
                                  }}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              )}
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
            <div className="text-sm font-semibold">
              Label {presetPriority === "upload" ? "(optional)" : ""}
            </div>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none dark:border-darkAccent dark:bg-charcoal sm:w-96"
              {...register("label", {
                required: {
                  value: presetPriority === "url",
                  message: "A label is required",
                },
                maxLength: {
                  value: 35,
                  message: "Label cannot be more than 35 characters long",
                },
              })}
            />
            {labelError && (
              <div className="relative flex items-center text-sm text-red-600 dark:text-red-400">
                <div className="absolute top-1 grid place-items-center">
                  <MdErrorOutline />
                </div>
                <span className="ml-4">{labelError.message}</span>
              </div>
            )}
          </div>
          <button
            className="mt-5 flex items-center gap-2 rounded-lg border border-black bg-black px-3 py-2 font-medium text-white transition-all hover:bg-white hover:text-black disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white dark:border-lightGray dark:bg-lightGray dark:text-charcoal dark:hover:bg-charcoal dark:hover:text-lightGray dark:disabled:hover:bg-lightGray dark:disabled:hover:text-charcoal lg:mt-auto"
            type="submit"
            disabled={isLoading}
          >
            {getButtonText()}
            {isLoading && (
              <div className="h-5 w-5 animate-spin rounded-full border-l-2 border-white group-hover:border-black dark:border-charcoal" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BillboardForm;
