import BillboardForm from "@/components/dashboard/BillboardForm";
import React from "react";

function NewBillboard() {
  return (
    <>
      <div className="mb-6 border-b pb-3 dark:border-b-darkAccent">
        <div className="text-3xl font-bold">Create billboard</div>
        <div className="text-gray-600 dark:text-darkMutedText">
          Add a new billboard
        </div>
      </div>
      <BillboardForm buttonTxt="Create" />
    </>
  );
}

export default NewBillboard;
