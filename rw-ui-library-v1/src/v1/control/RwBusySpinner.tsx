import { type PropsWithChildren, useEffect, useState } from "react";
import { IoSyncSharp } from "react-icons/io5";

type RwBusySpinnerProps = {
  isLoading?: any;
  isError?: any;
  className?: string;
  iconClassName?: string;
};

const initialState = { first: true, style: "text-gray-600" };

export default function RwBusySpinner({
  isLoading = false,
  isError = false,
  className = "float-right",
  iconClassName = "busy-spinner-icon",
}: PropsWithChildren<RwBusySpinnerProps>) {
  const [type, setType] = useState<{ first: boolean; style: string }>(
    initialState
  );

  useEffect(() => {
    if (!isError && !isLoading) {
      if (!type.first) {
        setType((pre) => {
          return { ...pre, style: " text-green-600" };
        });
      }
    } else if (isLoading) {
      setType({
        first: false,
        style: " text-blue-600 animate-spin",
      });
    } else if (isError && !isLoading) {
      setType((pre) => {
        return { ...pre, style: " text-red-600" };
      });
    }
  }, [isLoading, isError]);

  return (
    <div className={className}>
      <IoSyncSharp className={type.style + " " + iconClassName} />
    </div>
  );
}
