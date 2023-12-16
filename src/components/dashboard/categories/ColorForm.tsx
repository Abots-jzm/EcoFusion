import { Popover, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  type Control,
  Controller,
  type UseFormSetValue,
} from "react-hook-form";
import { MdAdd, MdClose } from "react-icons/md";
import { type CategoryFormData, type ColorField } from "./CategoryForm";
import { CiPickerHalf } from "react-icons/ci";

type Props = {
  addedColors: ColorField[];
  control: Control<CategoryFormData>;
  setValue: UseFormSetValue<CategoryFormData>;
};

function ColorForm({ addedColors, control, setValue }: Props) {
  const [currentColor, setCurrentColor] = useState<string | undefined>();
  const [currentColorName, setCurrentColorName] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <div className="flex w-96 items-center gap-2 pt-2">
        <Controller
          name="colors"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <input
                type="text"
                className="flex-1 rounded-lg border border-gray-300 p-2 text-sm placeholder:text-gray-400 focus:outline-none dark:border-darkAccent dark:bg-charcoal placeholder:dark:text-darkMutedText"
                placeholder="name"
                form="color-form"
                value={currentColorName}
                onChange={(e) => setCurrentColorName(e.target.value)}
              />
              <Popover className="relative">
                <Popover.Button
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-black px-2 py-1.5 text-sm font-medium transition-all hover:bg-black hover:text-white dark:border-lightGray dark:hover:bg-lightGray dark:hover:text-charcoal"
                  style={{ backgroundColor: currentColor }}
                >
                  <CiPickerHalf />
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
                  <Popover.Panel className="absolute bottom-10 z-20 overflow-auto rounded-md bg-white p-3 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-charcoal dark:ring-darkAccent sm:bottom-auto sm:mt-1 sm:text-base">
                    <div className="small custom-pointers">
                      <HexColorPicker
                        color={currentColor}
                        onChange={setCurrentColor}
                      />
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
              <button
                type="submit"
                form="color-form"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-black px-2 py-1.5 text-sm font-medium transition-all hover:bg-black hover:text-white dark:border-lightGray dark:hover:bg-lightGray dark:hover:text-charcoal"
                onClick={() => {
                  if (!currentColorName) {
                    setError("please enter a color name");
                    return;
                  }

                  if (value?.some((color) => color.name === currentColorName)) {
                    setError("color name already exists");
                    return;
                  }

                  if (!currentColor) {
                    setError("please select a color");
                    return;
                  }

                  onChange([
                    ...(value ?? []),
                    {
                      name: currentColorName,
                      hex: currentColor,
                    },
                  ]);

                  setError("");
                  setCurrentColor(undefined);
                  setCurrentColorName("");
                }}
              >
                <MdAdd />
              </button>
            </>
          )}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 dark:text-red-300">{error}</p>
      )}
      {addedColors?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {addedColors.map((color) => (
            <div className="flex items-center gap-2 rounded-lg border border-gray-300 p-2 dark:border-darkAccent">
              <div
                className="h-4 w-4 rounded-full border border-gray-300 dark:border-darkAccent"
                style={{ backgroundColor: color.hex }}
              />
              <span>{color.name}</span>
              <span className="text-gray-300 dark:text-darkMutedText">|</span>
              <button
                className="text-red-500 dark:text-red-300"
                onClick={() => {
                  setValue(
                    "colors",
                    addedColors.filter((c) => c.name !== color.name),
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

export default ColorForm;
