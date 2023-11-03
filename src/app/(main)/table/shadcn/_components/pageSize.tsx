import { Table } from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ListAmountProps<TData> {
  table: Table<TData>;
}

export function PageSize<TData>({ table }: ListAmountProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-2 ">
        <Select
          onValueChange={(value: string) => table.setPageSize(Number(value))}
          value={`${table.getState().pagination.pageSize}`}
        >
          <SelectTrigger className="h-8 w-[120px] border-none text-center text-slate-500 text-sm font-normal">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
            <p className="text-sm font-medium">개씩 보기</p>
          </SelectTrigger>

          <SelectContent side="top">
            {[10, 20, 30, 50, 100].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
