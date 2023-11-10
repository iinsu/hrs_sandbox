import * as React from "react";

type Props = Readonly<{
  "data-test-id"?: string;
  accept?: string;
  label: string;
  onChange: (files: FileList | null) => void;
}>;

export default function FileInput({
  accept,
  label,
  onChange,
  "data-test-id": dataTestId,
}: Props): JSX.Element {
  return (
    <div className="flex flex-row items-center mb-2">
      <label className="flex flex-1 text-[#666]">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={(event) => onChange(event.target.files)}
        data-test-id={dataTestId}
        className="flex border-[#999] py-2 px-3 text-base rounded-sm min-w-0"
      />
    </div>
  );
}
