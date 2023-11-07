import { useState, useMemo, useEffect, cloneElement } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  RowData,
  RowSelectionState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { SelectedCount } from "./selectedCount";
import { PageSize } from "./pageSize";
import { PageIndex } from "./pageIndex";
import { Pagination } from "./pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalCount: number;
  setPagination: OnChangeFn<PaginationState>;
  pageIndex: number;
  pageSize: number;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  setRowSelection: OnChangeFn<RowSelectionState>;
  rowSelection: RowSelectionState;
  setSelectedRows?: React.Dispatch<React.SetStateAction<RowData>[]>;
  selectedRowsReset?: Boolean;
  pageSizeView?: Boolean;
  pageIndexView?: Boolean;
  selectedCountView?: Boolean;
  paginationBtn?: Boolean;
  headRender?: React.ReactElement;
  rowRender?: React.ReactElement;
  className?: string | undefined;
  placeholder?: string | React.ReactElement;
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalCount,
  setPagination,
  pageIndex,
  pageSize,
  sorting,
  setSorting,
  setRowSelection,
  rowSelection,
  setSelectedRows,
  selectedRowsReset,
  selectedCountView = true,
  pageSizeView = true,
  pageIndexView = true,
  paginationBtn = true,
  headRender,
  rowRender,
  className,
  placeholder,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  const defaultData = useMemo(() => [], []);

  useEffect(() => {
    if (!!data) {
      setRowSelection({});
    }
  }, [data, setRowSelection]);

  // 테이블 기능 설정
  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    pageCount: totalCount,
    state: {
      sorting,
      rowSelection,
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: false,
    debugTable: true,

    /* 열 선택 기능*/
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,

    /* 정렬 기능 */
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    /* 검색 창 */
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    /* 페이지 네이션 관련 */
    getPaginationRowModel: getPaginationRowModel(),

    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    if (setSelectedRows) {
      setSelectedRows(table.getSelectedRowModel().flatRows);
    }
  }, [table, rowSelection, setSelectedRows]);

  useEffect(() => {
    if (selectedRowsReset) {
      table.resetRowSelection();
    }
  }, [selectedRowsReset, table]);

  const checkHead =
    !!headRender ||
    pageSizeView ||
    pageIndexView ||
    paginationBtn ||
    selectedCountView;

  return (
    <>
      <div className="">
        {checkHead && (
          <div className="flex items-center justify-between border-y-[1px] h-[49px] p-3">
            <div className="flex items-center">
              {headRender &&
                cloneElement(headRender, {
                  rows: table.getSelectedRowModel().flatRows,
                })}
              <div>{selectedCountView && <SelectedCount table={table} />}</div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-[30px]">
                {pageSizeView && <PageSize table={table} />}
                {pageIndexView && <PageIndex table={table} />}
                {paginationBtn && <Pagination table={table} />}
              </div>
            </div>
          </div>
        )}

        <div className={cn("overflow-auto border-b-[1px]", className)}>
          <Table>
            <TableHeader className="sticky top-0 bg-slate-50 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="relative group hover:bg-orange-50"
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        onClick={
                          !!onRowClick
                            ? () => onRowClick(cell?.row?.original)
                            : () => {}
                        }
                        className={cn(
                          "text-slate-500",
                          !!onRowClick && "cursor-pointer"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                    {/* Hover 시 보여지는 컴포넌트 */}
                    {rowRender && (
                      <TableCell className="h-full absolute bg-orange-50/70 right-0 hidden group-hover:flex justify-center items-center">
                        {cloneElement(rowRender, { row })}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center break-keep"
                  >
                    {!!placeholder ? placeholder : "No results."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
