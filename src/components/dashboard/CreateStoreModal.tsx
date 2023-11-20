"use client";

import { CreateStorePayload } from "@/app/api/stores/types";
import useUserId from "@/hooks/auth/useUserId";
import useCreateStore from "@/hooks/store/useCreateStore";
import { Dialog, Transition } from "@headlessui/react";
import { AxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { MdClose, MdErrorOutline } from "react-icons/md";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  mustComplete?: boolean;
};

function CreateStoreModal({ isOpen, closeModal, mustComplete }: Props) {
  const userId = useUserId();
  const { createStore, isCreating, createStoreError } = useCreateStore();
  const { register, handleSubmit } = useForm<{ name: string }>();
  const error = createStoreError as AxiosError;

  function onFormSubmit({ name }: { name: string }) {
    const payload: CreateStorePayload = {
      name,
      ownerId: userId,
    };
    createStore(payload);
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={mustComplete ? () => {} : closeModal}
      >
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative  w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                {!mustComplete && (
                  <button
                    className="absolute right-4 top-2"
                    onClick={closeModal}
                  >
                    <MdClose />
                  </button>
                )}
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold text-gray-900"
                >
                  Create store
                </Dialog.Title>
                <div className="text-sm text-gray-600">
                  Add a new store to manage products and categories
                </div>
                  <div className="flex flex-col gap-1 pt-5">
                    <label htmlFor="name" className="text-sm font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-lg border border-gray-200 p-2 focus:outline-none"
                      {...register("name")}
                      required
                    />
                  </div>
                  {error && (
                    <div className="relative flex items-center pt-2 text-sm text-red-600">
                      <div className="absolute top-3 grid place-items-center">
                        <MdErrorOutline />
                      </div>
                      <span className="ml-4">
                        {(error.response?.data as string) ||
                          "An unexpected error occured"}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-end gap-2 pt-4">
                    {!mustComplete && (
                      <button
                        onClick={closeModal}
                        className="rounded-lg border border-black bg-black px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black disabled:opacity-50"
                      >
                        <span>Cancel</span>
                      </button>
                    )}
                    <button
                      type="submit"
                      className="group flex items-center justify-center gap-4 rounded-lg border border-black bg-black px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black disabled:opacity-50"
                      onClick={handleSubmit(onFormSubmit)}
                    >
                      <span>Continue</span>
                      {isCreating && (
                        <div className="h-5 w-5 animate-spin rounded-full border-l-2 border-white group-hover:border-black" />
                      )}
                    </button>
                  </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default CreateStoreModal;
