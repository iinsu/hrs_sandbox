import { cn } from "@/lib/utils";
import * as React from "react";
import { ReactNode } from "react";

export default function Button({
  "data-test-id": dataTestId,
  children,
  className,
  onClick,
  disabled,
  small,
  title,
}: {
  "data-test-id"?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  small?: boolean;
  title?: string;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      title={title}
      aria-label={title}
      {...(dataTestId && { "data-test-id": dataTestId })}
      className={cn(
        "py-2 px-4 border-0 bg-[#eee] rounded-sm cursor-pointer text-sm hover:bg-[#ddd]",
        disabled && "cursor-not-allowed",
        small && "py-1 px-2 text-sm",
        className
      )}
    >
      {children}
    </button>
  );
}
