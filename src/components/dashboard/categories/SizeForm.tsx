import { useState } from "react";
import {
  type Control,
  Controller,
  type UseFormSetValue,
} from "react-hook-form";
import { MdAdd, MdClose } from "react-icons/md";
import { type CategoryFormData } from "./CategoryForm";

type Props = {
  addedSizes: string[];
  control: Control<CategoryFormData>;
  setValue: UseFormSetValue<CategoryFormData>;
};

function SizeForm({ addedSizes, control, setValue }: Props) {
  const [currentSizeName, setCurrentSizeName] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <div className="flex w-full items-center gap-2 pt-2 sm:w-96">
        <Controller
          name="sizes"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <input
                type="text"
                className="flex-1 rounded-lg border border-gray-300 p-2 text-sm placeholder:text-gray-400 focus:outline-none dark:border-darkAccent dark:bg-charcoal placeholder:dark:text-darkMutedText"
                placeholder="name"
                form="color-form"
                value={currentSizeName}
                onChange={(e) => setCurrentSizeName(e.target.value)}
              />
              <button
                type="submit"
                form="color-form"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-black px-2 py-1.5 text-sm font-medium transition-all hover:bg-black hover:text-white dark:border-lightGray dark:hover:bg-lightGray dark:hover:text-charcoal"
                onClick={() => {
                  if (!currentSizeName) {
                    setError("please enter a size name");
                    return;
                  }

                  if (value?.some((size) => size === currentSizeName)) {
                    setError("color name already exists");
                    return;
                  }

                  onChange([...(value ?? []), currentSizeName]);

                  setError("");
                  setCurrentSizeName("");
                }}
              >
                <MdAdd />
              </button>
            </>
          )}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      {addedSizes?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {addedSizes.map((size, index) => (
            <div
              className="flex items-center gap-2 rounded-lg border border-gray-300 p-2 dark:border-darkAccent"
              key={index}
            >
              <span>{size}</span>
              <span className="text-gray-300 dark:text-darkMutedText">|</span>
              <button
                className="text-red-600 dark:text-red-400"
                onClick={() => {
                  setValue(
                    "sizes",
                    addedSizes.filter((s) => s !== size),
                  );
                }}
              >
                <MdClose />
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SizeForm;
