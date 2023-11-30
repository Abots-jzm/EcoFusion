import { type ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

function Loading({ children }: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 dark:bg-charcoal">
      <div className="relative inline-flex">
        <div className="h-8 w-8 rounded-full bg-black dark:bg-lightGray"></div>
        <div className="absolute left-0 top-0 h-8 w-8 animate-ping rounded-full bg-black dark:bg-lightGray"></div>
        <div className="absolute left-0 top-0 h-8 w-8 animate-pulse rounded-full bg-black dark:bg-lightGray"></div>
      </div>
      <div className="text-black dark:text-lightGray">{children}</div>
    </div>
  );
}

export default Loading;
