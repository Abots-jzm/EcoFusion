import { useColor } from "color-thief-react";
import clsx from "clsx";

type Props = {
  className?: string;
  imageUrl: string;
  children: string;
};

const DynamicTextColorComponent = ({
  imageUrl,
  children,
  className,
}: Props) => {
  const stuff = useColor(imageUrl, "hex", {
    crossOrigin: "anonymous",
  });
  const { data } = stuff;

  function getTextColor(backgroundColor?: string): "text-white" | "text-black" {
    if (!backgroundColor) return "text-white";

    const rgb = parseInt(backgroundColor.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminance > 128 ? "text-black" : "text-white";
  }

  return <div className={clsx(className, getTextColor(data))}>{children}</div>;
};

export default DynamicTextColorComponent;
