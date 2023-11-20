import { Button } from "@/components/ui/button";
import Link from "next/link";

const QueryPage = () => {
  return (
    <>
      <div className="flex flex-col h-full bg-slate-100 items-center">
        <Link href="/query/next-stream">
          <Button variant="link">Next.js app with streaming</Button>
        </Link>
        <Link href="/query/basic">
          <Button variant="link">Basic</Button>
        </Link>
        <Link href="/query/auto">
          <Button variant="link">
            Auto Refetching / Poling / Realtime Example
          </Button>
        </Link>
      </div>
    </>
  );
};

export default QueryPage;
