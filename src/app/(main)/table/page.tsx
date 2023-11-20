import { Button } from "@/components/ui/button";
import Link from "next/link";

const TablePage = () => {
  return (
    <>
      <div className="p-2 bg-slate-100 h-full flex flex-col gap-2 items-center pt-10">
        <Link href="/table/shadcn">
          <Button type="button" variant="link">
            HRS Table
          </Button>
        </Link>

        <Link href="/table/faker">
          <Button type="button" variant="link">
            Faker Table
          </Button>
        </Link>

        <Link href="/table/infinite">
          <Button type="button" variant="link">
            Virturalized Infinite Scrolling
          </Button>
        </Link>
      </div>
    </>
  );
};

export default TablePage;
