import { Button } from "@/components/ui/button";
import Link from "next/link";

const QueryPage = () => {
  return (
    <>
      <Link href="/query/next-stream">
        <Button variant="link">Next.js app with streaming</Button>
      </Link>
    </>
  );
};

export default QueryPage;
