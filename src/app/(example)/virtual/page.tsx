import { Button } from "@/components/ui/button";
import Link from "next/link";

const VirtualMainPage = () => {
  return (
    <>
      <div className="h-full bg-slate-50 w-full flex justify-center pt-16">
        <Link href="/virtual/dynamic">
          <Button>Dynamic Example</Button>
        </Link>
      </div>
    </>
  );
};

export default VirtualMainPage;
