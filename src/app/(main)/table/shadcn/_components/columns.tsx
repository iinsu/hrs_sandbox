import { ColumnDef } from "@tanstack/react-table";
import { Posts } from "../makeData";
import { IndeterminateCheckbox } from "../../faker/_components/checkbox";

export const columns: ColumnDef<Posts>[] = [
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
      <IndeterminateCheckbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler(),
        }}
      />
    ),
  },
  {
    accessorKey: "title",
  },
  {
    accessorKey: "author",
  },
  {
    accessorKey: "price",
  },
  {
    accessorKey: "status",
  },
  {
    accessorKey: "createdAt",
  },
];
