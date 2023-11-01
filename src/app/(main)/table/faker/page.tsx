"use client";

import { useEffect, useMemo, useReducer, useState } from "react";

import { makeData } from "./makeData";

import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { columns } from "./components/columns";

const FakerTablePage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState(() => makeData(10));
  const rerender = useReducer(() => ({}), {})[1];

  const [rowSelection, setRowSelection] = useState({});
  const fakerColumns = useMemo(() => columns, []);

  const table = useReactTable({
    data,
    columns: fakerColumns,
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const refreshData = () => {
    setData(() => makeData(10));
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
      <div className="p-2">
        <table>
          <thead>
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
          <tbody>
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
        <button
          type="button"
          onClick={() => rerender()}
          className="border p-2 rounded-md hover:bg-slate-200 mr-2"
        >
          Force Rerender
        </button>
        <button
          type="button"
          onClick={() => refreshData()}
          className="border p-2 rounded-md hover:bg-slate-200 mr-2"
        >
          Refresh
        </button>
      </div>
    </>
  );
};

export default FakerTablePage;
