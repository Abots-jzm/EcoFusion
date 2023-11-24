"use client";

import SignoutBtn from "@/components/auth/SignoutBtn";
import useGetNavRoutes from "@/hooks/data/useGetNavRoutes";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment, useState } from "react";

type Props = {
  storeId: string;
};

function MobileNavigation({ storeId }: Props) {
  const pathname = usePathname();
  const navRoutes = useGetNavRoutes(storeId, pathname);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="relative z-20 h-[15px] w-6 transition-opacity hover:opacity-50 md:hidden"
        onClick={() => setIsOpen((isOpen) => !isOpen)}
      >
        <div
          className={clsx(
            "absolute top-0 h-[2px] w-6 origin-center rounded-full bg-black transition-transform dark:bg-white",
            isOpen && "translate-y-[6px] rotate-[135deg]",
          )}
        />
        <div
          className={clsx(
            "absolute top-[6px] h-[2px] w-6 rounded-full bg-black dark:bg-white",
            isOpen && "opacity-0",
          )}
        />
        <div
          className={clsx(
            "absolute bottom-0 h-[2px] w-6 origin-center rounded-full bg-black transition-transform dark:bg-white",
            isOpen && "-translate-y-[7px] -rotate-[135deg]",
          )}
        />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 md:hidden"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto overflow-x-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="-right-full"
              enterTo="right-0"
              leave="ease-in duration-200"
              leaveFrom="right-0"
              leaveTo="-right-full"
            >
              <Dialog.Panel className="absolute h-full w-full max-w-sm overflow-hidden bg-white shadow-xl transition-all dark:bg-charcoal">
                <button
                  className="absolute right-4 top-6 z-50 h-[15px] w-6 cursor-pointer"
                  onClick={() => setIsOpen((isOpen) => !isOpen)}
                />
                <div className="flex h-full flex-col gap-9 pb-4 pl-14 pt-20 ">
                  {navRoutes.map(({ href, label, isActive }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={clsx(
                        "transition-colors hover:text-black dark:hover:text-lightGray",
                        isActive
                          ? "font-semibold text-black dark:text-lightGray"
                          : "font-medium text-darkMutedText",
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                  <SignoutBtn />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default MobileNavigation;
