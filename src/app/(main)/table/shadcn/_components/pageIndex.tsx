import { Table } from "@tanstack/react-table";

interface PageIndexProps<TData> {
  table: Table<TData>;
}

export function PageIndex<TData>({ table }: PageIndexProps<TData>) {
  return (
    <div>
      <div className="flex items-center justify-center text-sm font-medium mr-2 text-center text-slate-500 ">
        {table.getState().pagination.pageIndex + 1} /{" "}
        {Math.ceil(table.getPageCount() / table.getState().pagination.pageSize)}{" "}
        페이지
      </div>
    </div>
  );
}
