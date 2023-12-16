"use client";

import { Fragment } from "react";
import type { Billboard } from "@/trpc/shared";
import { Listbox, Transition, Popover } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import DynamicTextColorComponent from "@/components/util/DynamicTextColor";
import clsx from "clsx";
import { MdAdd, MdInfo } from "react-icons/md";
import ColorForm from "./ColorForm";
import SizeForm from "./SizeForm";
import useCreateCategory from "@/hooks/categories/useCreateCategory";

export type ColorField = {
  name: string;
  hex: string;
};

export type CategoryFormData = {
  name: string;
  billboard: Billboard;
  colors: ColorField[];
  sizes: string[];
};

type Props = {
  billboards: Billboard[];
  storeId: string;
};

function CategoryForm({ billboards, storeId }: Props) {
  const { createCategory, isCreating, createCategoryError } =
    useCreateCategory();
  const { register, handleSubmit, control, watch, clearErrors, setValue } =
    useForm<CategoryFormData>();

  const selectedBillboard = watch("billboard");
  const addedColors = watch("colors");
  const addedSizes = watch("sizes");

  function handleFormSubmit({
    name,
    sizes,
    billboard,
    colors,
  }: CategoryFormData) {
    createCategory({
      name,
      storeId,
      billboardId: billboard.id,
      colors,
      sizes:
        !sizes || sizes.length === 0
          ? undefined
          : sizes.map((size) => ({ name: size })),
    });
  }

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div>
        <label className="block text-sm font-semibold" htmlFor="name">
          Name
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="mt-2 w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none dark:border-darkAccent dark:bg-charcoal sm:w-96"
        />
      </div>
      <div>
        <div className="text-sm font-semibold">Billboard</div>
        <Controller
          control={control}
          name="billboard"
          rules={{
            required: { value: true, message: "A billboard is required" },
          }}
          render={({ field }) => (
            <Listbox
              value={field.value}
              onChange={(billboard) => {
                field.onChange(billboard);
                clearErrors("billboard");
              }}
            >
              <div className="relative">
                <Listbox.Button className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-black px-2 py-1.5 text-sm font-medium transition-all hover:bg-black hover:text-white dark:border-lightGray dark:hover:bg-lightGray dark:hover:text-charcoal">
                  Choose billboard
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute bottom-10 z-10 mt-1 max-w-[288px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none dark:border dark:border-darkAccent dark:bg-charcoal sm:max-w-[384px] sm:text-sm lg:bottom-auto">
                    {billboards.length === 0 && (
                      <div className="p-3">
                        You don't have any billboards yet
                      </div>
                    )}
                    {billboards.length !== 0 && (
                      <div
                        className={clsx(
                          "grid gap-5 p-4",
                          billboards.length === 1 && "grid-cols-1",
                          billboards.length === 2 && "grid-cols-2",
                          billboards.length === 3 && "grid-cols-3",
                          billboards.length >= 4 &&
                            "grid-cols-3 sm:grid-cols-4",
                        )}
                      >
                        {billboards.map((billboard) => (
                          <Listbox.Option
                            value={billboard}
                            key={billboard.id}
                            className={({ selected }) =>
                              `relative h-10 w-20 cursor-pointer overflow-hidden rounded-lg hover:ring-2 hover:ring-blue-400 ${
                                selected ? "ring-4 hover:ring-blue-400" : ""
                              }`
                            }
                          >
                            <Image
                              src={billboard.imageUrl}
                              alt={billboard.label ?? "unnamed billboard"}
                              className="h-full w-full object-cover object-center"
                              height={40}
                              width={80}
                              priority
                            />
                            <div className="absolute inset-0 grid place-items-center p-2 text-center">
                              <DynamicTextColorComponent
                                imageUrl={billboard.imageUrl}
                                className={"text-[5px] leading-[1.2]"}
                              >
                                {billboard.label}
                              </DynamicTextColorComponent>
                            </div>
                          </Listbox.Option>
                        ))}
                      </div>
                    )}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          )}
        />
        {!!selectedBillboard && (
          <div className="relative mt-2 h-12 w-24 overflow-hidden rounded">
            <Image
              src={selectedBillboard.imageUrl}
              alt="Selected"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 grid place-items-center text-center">
              <DynamicTextColorComponent
                imageUrl={selectedBillboard.imageUrl}
                className="text-[8px]"
              >
                {selectedBillboard.label}
              </DynamicTextColorComponent>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="flex items-center gap-1 text-sm font-semibold">
          <span>Colors</span>
          <Popover className="relative">
            <Popover.Button className="grid cursor-pointer place-items-center">
              <MdInfo />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-1 w-max transform rounded bg-charcoal p-1 px-2 text-[10px] text-lightGray shadow-lg ring-1 ring-black/5 dark:bg-white dark:text-charcoal dark:ring-lightGray/5">
                Add colors to your categories for filtering.
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
        <ColorForm
          addedColors={addedColors}
          control={control}
          setValue={setValue}
        />
      </div>
      <div>
        <div className="flex items-center gap-1 text-sm font-semibold">
          <span>Size</span>
          <Popover className="relative">
            <Popover.Button className="grid cursor-pointer place-items-center">
              <MdInfo />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-1 w-max transform rounded bg-charcoal p-1 px-2 text-[10px] text-lightGray shadow-lg ring-1 ring-black/5 dark:bg-white dark:text-charcoal dark:ring-lightGray/5">
                Add sizes to your categories for filtering.
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
        <SizeForm
          addedSizes={addedSizes}
          control={control}
          setValue={setValue}
        />
      </div>
      <button
        className="mt-5 flex items-center gap-2 self-start rounded-lg border border-black bg-black px-3 py-2 font-medium text-white transition-all hover:bg-white hover:text-black disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white dark:border-lightGray dark:bg-lightGray dark:text-charcoal dark:hover:bg-charcoal dark:hover:text-lightGray dark:disabled:hover:bg-lightGray dark:disabled:hover:text-charcoal"
        type="submit"
        disabled={isCreating}
      >
        {isCreating ? "Creating" : "Create"}
        {!isCreating && <MdAdd />}
        {isCreating && (
          <div className="h-5 w-5 animate-spin rounded-full border-l-2 border-white group-hover:border-black dark:border-charcoal" />
        )}
      </button>
      {!!createCategoryError && (
        <div className="text-sm text-red-600 dark:text-red-400">
          {createCategoryError.message}
        </div>
      )}
    </form>
  );
}

export default CategoryForm;
