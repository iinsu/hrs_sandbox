import { Button } from "@/components/ui/button";
import Link from "next/link";

const TablePage = () => {
  return (
    <>
      <div className="p-2">
        <Button>
          <Link href="/table/shadcn">HRS Table</Link>
        </Button>
        <Button>
          <Link href="/table/faker">Faker Table</Link>
        </Button>
      </div>
    </>
  );
};

export default TablePage;
