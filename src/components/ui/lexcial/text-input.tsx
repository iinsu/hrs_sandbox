import * as React from "react";
import { HTMLInputTypeAttribute } from "react";

type Props = Readonly<{
  "data-test-id"?: string;
  label: string;
  onChange: (val: string) => void;
  placeholder?: string;
  value: string;
  type?: HTMLInputTypeAttribute;
}>;

export default function TextInput({
  label,
  value,
  onChange,
  placeholder = "",
  "data-test-id": dataTestId,
  type = "text",
}: Props): JSX.Element {
  return (
    <>
      <div className="flex flex-row items-center my-2">
        <label className="flex flex-1 text-[#666]">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
          data-test-id={dataTestId}
          className="flex border-[#999] py-2 px-3 text-base rounded-sm min-w-0 border-solid border-[1px] mx-2"
        />
      </div>
    </>
  );
}
