import {
  ChevronRight,
  ChevronLeft,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface PaginationProps<TData> {
  table: Table<TData>;
  totalCount?: number;
}

export function Pagination<TData>({ table }: PaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalCount = table.getPageCount();
  const maxPage = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex space-x-2">
      <div className="space-x-1">
        <Button
          variant="iconBtn"
          size="iconSm"
          onClick={() => {
            table.resetRowSelection();
            table.setPageIndex(0);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="iconBtn"
          size="iconSm"
          onClick={() => {
            table.resetRowSelection();
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-x-1">
        <Button
          variant="iconBtn"
          size="iconSm"
          onClick={() => {
            table.resetRowSelection();
            table.nextPage();
          }}
          disabled={pageIndex === maxPage - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="iconBtn"
          size="iconSm"
          onClick={() => {
            table.resetRowSelection();
            table.setPageIndex(maxPage - 1);
          }}
          disabled={pageIndex === maxPage - 1}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
