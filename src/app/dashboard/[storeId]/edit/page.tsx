"use client";

import DeleteConsentForm from "@/components/dashboard/DeleteConsentForm";
import useUserId from "@/hooks/auth/useUserId";
import useEditStore from "@/hooks/store/useEditStore";
import useGetUserStores from "@/hooks/store/useGetUserStores";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

function Settings() {
  const { userStores } = useGetUserStores();
  const storeId = useParams().storeId as string;
  const userId = useUserId();
  const { editStore, editingStore } = useEditStore();
  const currentStore = useMemo(
    () => userStores?.find((store) => store.id === storeId),
    [userStores, storeId],
  );
  const { register, handleSubmit, watch } = useForm<{ name: string }>({
    defaultValues: {
      name: currentStore?.name,
    },
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function onStoreEdit({ name }: { name: string }) {
    editStore({ name, userId, storeId });
  }

  return (
    <>
      <div className="text-3xl font-bold">Edit</div>
      <div className="dark:text-darkMutedText text-gray-600">
        Edit store detials
      </div>
      <form
        className="mt-5 flex flex-col items-start gap-3"
        onSubmit={handleSubmit(onStoreEdit)}
      >
        <label htmlFor="name" className="text-sm font-semibold">
          Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          className="dark:border-darkAccent w-96 rounded-lg border border-gray-300 p-2 focus:outline-none dark:bg-charcoal"
          required
        />
        <button
          type="submit"
          className="group flex items-center justify-center gap-4 rounded-lg border border-black bg-black px-3 py-2 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white dark:bg-lightGray dark:text-charcoal dark:hover:border-lightGray dark:hover:bg-charcoal dark:hover:text-lightGray dark:disabled:hover:border-charcoal dark:disabled:hover:bg-lightGray dark:disabled:hover:text-charcoal"
          disabled={editingStore || watch("name") === currentStore?.name}
        >
          <span>Save Changes</span>
          {editingStore && (
            <div className="h-5 w-5 animate-spin rounded-full border-l-2 border-white group-hover:border-black" />
          )}
        </button>
        <button
          className="mt-5 rounded-lg border-2 border-red-600 px-3 py-2 font-semibold text-red-600 focus:outline-none dark:border-red-400 dark:text-red-400"
          type="button"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete store
        </button>
      </form>
      <DeleteConsentForm
        isOpen={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
        storeName={currentStore?.name || ""}
      />
    </>
  );
}

export default Settings;