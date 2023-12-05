import React from "react";

type Props = {
  heading: string;
  subHeading: string;
};

function CategoriesPage({ heading, subHeading }: Props) {
  return (
    <>
      <div className="text-2xl font-bold sm:text-3xl">{heading}</div>
      <div className="text-sm text-gray-600 dark:text-darkMutedText sm:text-base">
        {subHeading}
      </div>
    </>
  );
}

export default CategoriesPage;
