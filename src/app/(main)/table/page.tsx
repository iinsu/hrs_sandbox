import { Button } from "@/components/ui/button";
import Link from "next/link";

const TablePage = () => {
  return (
    <>
      <div className="p-2">
        <Link href="/table/shadcn">
          <Button type="button">HRS Table</Button>
        </Link>

        <Link href="/table/faker">
          <Button type="button">Faker Table</Button>
        </Link>
      </div>
    </>
  );
};

export default TablePage;
