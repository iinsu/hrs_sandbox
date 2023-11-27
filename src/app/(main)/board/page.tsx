import { Button } from "@/components/ui/button";
import Link from "next/link";

const BoardMainPage = () => {
  return (
    <div className="bg-slate-200 h-full pt-11 ">
      <div className="flex flex-col gap-2 items-center">
        <Link href="/board/plain">
          <Button>Lexical Plain Text Editor</Button>
        </Link>
        <Link href="/board/rich">
          <Button>Lexical Rich Text Editor</Button>
        </Link>
        <Link href="/board/notice">
          <Button>Custom Lexical Editor</Button>
        </Link>
      </div>
    </div>
  );
};

export default BoardMainPage;
