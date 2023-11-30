"use client";

import useDeleteStore from "@/hooks/store/useDeleteStore";
import { Dialog, Transition } from "@headlessui/react";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  storeName: string;
};

function DeleteConsentForm({ isOpen, closeModal, storeName }: Props) {
  const { register, handleSubmit, watch } = useForm<{ name: string }>();
  const { deleteStore, isDeleting } = useDeleteStore();
  const storeId = useParams().storeId as string;

  function onFormSubmit() {
    deleteStore({ storeId });
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <Dialog.Panel className="relative  w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:border dark:border-darkAccent dark:bg-charcoal">
                <button className="absolute right-4 top-2" onClick={closeModal}>
                  <MdClose />
                </button>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold text-gray-900 dark:text-lightGray"
                >
                  Delete store confirmation
                </Dialog.Title>
                <div className="text-sm text-gray-600 dark:text-darkMutedText">
                  All sales and store data will be lost. This action can not be
                  reverted.
                  <br />
                  To confirm this action, type{" "}
                  <span className="font-semibold">"{storeName}"</span> in the
                  text box.
                </div>
                <div className="flex flex-col gap-1 pt-5">
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-200 p-2 focus:outline-none dark:border-darkAccent dark:bg-charcoal"
                    {...register("name")}
                    required
                    autoComplete="off"
                    autoCorrect="off"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button
                    onClick={closeModal}
                    className="rounded-lg border border-black bg-black px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black dark:border-lightGray dark:bg-lightGray dark:text-charcoal dark:hover:bg-charcoal dark:hover:text-lightGray"
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    disabled={watch("name") !== storeName}
                    className="group flex items-center justify-center gap-4 rounded-lg border-2 border-red-600 px-3 py-2 text-sm font-semibold text-red-600 disabled:opacity-40 dark:border-red-400 dark:text-red-400"
                    onClick={handleSubmit(onFormSubmit)}
                  >
                    <span>Yes, Delete</span>
                    {isDeleting && (
                      <div className="h-5 w-5 animate-spin rounded-full border-l-2 border-red-600 dark:border-red-400" />
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

export default DeleteConsentForm;
