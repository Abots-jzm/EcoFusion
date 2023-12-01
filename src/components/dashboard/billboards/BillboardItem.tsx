import React from "react";
import Image from "next/image";
import DynamicTextColorComponent from "@/components/util/DynamicTextColor";

type Props = {
  id: string;
  label: string | null;
  imageUrl: string;
  lastUpdated: Date;
};

function BillboardItem({ imageUrl, label }: Props) {
  return (
    <div className="relative h-48 overflow-hidden rounded-md">
      <Image
        src={imageUrl}
        alt={label ?? "Billboard"}
        fill
        className="object-cover object-center"
      />
      {!!label && (
        <DynamicTextColorComponent
          imageUrl={imageUrl}
          className="absolute inset-0 z-10 grid place-items-center px-16 text-center text-2xl font-semibold"
        >
          {label}
        </DynamicTextColorComponent>
      )}
    </div>
  );
}

export default BillboardItem;
