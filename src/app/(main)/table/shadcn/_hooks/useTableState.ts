import {
  PaginationState,
  RowData,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table";

import { useState } from "react";

export function useTableState() {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedRows, setSelectedRows] = useState<RowData[]>([]);
  const [selectedRowsReset, setSelectedRowsReset] = useState<Boolean>(false);

  const resetSorting = () => {
    setSorting([]);
  };

  const reset = () => {
    setSelectedRowsReset(true);
    setRowSelection({});
  };

  return {
    pageIndex,
    pageSize,
    setPagination,
    setSorting,
    sorting,
    resetSorting,
    setRowSelection,
    rowSelection,
    setSelectedRows,
    selectedRows,
    selectedRowsReset,
    reset,
  };
}
