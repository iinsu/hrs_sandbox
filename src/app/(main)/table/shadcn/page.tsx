"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./_components/table";
import { useTableState } from "./_hooks/useTableState";
import { makeData } from "./makeData";
import { columns } from "./_components/columns";

const ShadcnTablePage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const table = useTableState();
  const [data, setData] = useState(() => makeData(100));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return;
  }

  return (
    <>
      <div>
        <DataTable
          columns={columns}
          data={data}
          totalCount={data.length}
          className="h-[500px]"
          {...table}
        />
      </div>
    </>
  );
};

export default ShadcnTablePage;
