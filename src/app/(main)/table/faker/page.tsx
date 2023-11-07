"use client";

import { useEffect, useMemo, useState } from "react";

import { makeData } from "./makeData";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { columns } from "./_components/columns";

const FakerTablePage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState(() => makeData(100));

  const [rowSelection, setRowSelection] = useState({});
  const fakerColumns = useMemo(() => columns, []);

  const table = useReactTable({
    data,
    columns: fakerColumns,
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const refreshData = () => {
    setData(() => makeData(100));
    table.resetRowSelection();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }

  return (
    <>
      <div className="w-full">
        <table className="w-full">
          <thead className="grid bg-slate-200 w-full">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody className="block h-[400px] overflow-auto w-full">
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1 disabled:text-gray-100 disabled:cursor-default cursor-pointer"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className="border rounded p-1 disabled:text-gray-100 disabled:cursor-default cursor-pointer"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            className="border rounded p-1 disabled:text-gray-100 disabled:cursor-default cursor-pointer"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className="border rounded p-1 disabled:text-gray-100 disabled:cursor-default cursor-pointer"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <div className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </div>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() => refreshData()}
        className="border p-2 rounded-md hover:bg-slate-200 mr-2"
      >
        Refresh
      </button>
      <div className="flex items-center gap-1">
        <span>Go to page:</span>
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          max={table.getPageCount()}
          min={1}
          onChange={(event) => {
            const page = event.target.value
              ? Number(event.target.value) - 1
              : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </div>
    </>
  );
};

export default FakerTablePage;
