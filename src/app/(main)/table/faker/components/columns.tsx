"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Person } from "../makeData";
import { IndeterminateCheckbox } from "./checkbox";

export const columns: ColumnDef<Person>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "firstName",
  },
  {
    accessorKey: "lastName",
  },
  {
    accessorKey: "age",
  },
  {
    accessorKey: "visits",
  },
  {
    accessorKey: "status",
  },
  {
    accessorKey: "progress",
  },
];
