import { Table } from "@tanstack/react-table";

interface PageIndexProps<TData> {
  table: Table<TData>;
}

export function SelectedCount<TData>({ table }: PageIndexProps<TData>) {
  return (
    <>
      <div className="text-sm text-muted-foreground text-orange-500  font-medium">
        {table.getFilteredSelectedRowModel().rows.length}개 선택
      </div>
    </>
  );
}
