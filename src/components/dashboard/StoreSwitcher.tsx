"use client";

import useUserId from "@/hooks/auth/useUserId";
import useGetUserStores from "@/hooks/store/useGetUserStores";
import useUpdateLastSelected from "@/hooks/store/useUpdateLastSelected";
import { Listbox, Transition } from "@headlessui/react";
import { Store } from "@prisma/client";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { HiOutlineSelector } from "react-icons/hi";
import { IoStorefront } from "react-icons/io5";
import { MdAdd, MdCheck } from "react-icons/md";
import CreateStoreModal from "./CreateStoreModal";

type Props = {
  storeId: string;
};

function StoreSwitcher({ storeId }: Props) {
  const userId = useUserId();
  const { userStores, isGettingStores } = useGetUserStores();
  const { updateLastSelected, isUpdating } = useUpdateLastSelected();
  const pathname = usePathname();
  const router = useRouter();

  const [selectedStore, setSelectedStore] = useState<Store>();
  const [showCreateStoreModal, setShowCreateStoreModal] = useState(false);

  function openCreateStoreModal() {
    setShowCreateStoreModal(true);
  }

  function closeCreateStoreModal() {
    setShowCreateStoreModal(false);
  }

  function handleStoreChange(newStore: Store) {
    if (selectedStore?.id === newStore.id) return;

    updateLastSelected(
      { storeId: newStore.id, userId },
      {
        onSuccess() {
          const newPath = pathname.replace(storeId, newStore.id);
          router.push(newPath);
        },
      },
    );
  }

  useEffect(() => {
    if (userStores && userStores.length !== 0) {
      const lastSelectedStore = userStores.find(
        (store) => store.id === storeId,
      );
      setSelectedStore(lastSelectedStore || userStores[0]);
    }
  }, [userStores]);

  return (
    <>
      <Listbox value={selectedStore || {}} onChange={handleStoreChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative flex w-52 items-center gap-3 rounded-lg border border-gray-200 py-2 pl-3 focus:outline-none sm:text-sm">
            <IoStorefront />
            <span className="block truncate pr-8 font-medium">
              {isGettingStores ? "..." : selectedStore?.name}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              {isUpdating ? (
                <div
                  aria-hidden="true"
                  className="h-2 w-2 animate-spin rounded-full border-l border-t border-black"
                />
              ) : (
                <HiOutlineSelector aria-hidden="true" />
              )}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {userStores?.map((store) => (
                <Listbox.Option
                  key={store.id}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4",
                      active && "bg-gray-100",
                    )
                  }
                  value={store}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {store.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <MdCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
              <button
                className="relative w-full cursor-pointer select-none border-t border-t-gray-200 py-2 pr-4 font-medium hover:bg-gray-100"
                onClick={openCreateStoreModal}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <MdAdd className="h-5 w-5" aria-hidden="true" />
                </span>
                Create new store
              </button>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <CreateStoreModal
        isOpen={showCreateStoreModal}
        closeModal={closeCreateStoreModal}
      />
    </>
  );
}

export default StoreSwitcher;
