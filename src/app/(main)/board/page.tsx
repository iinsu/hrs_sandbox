import { Button } from "@/components/ui/button";
import Link from "next/link";

const BoardMainPage = () => {
  return (
    <div className="bg-slate-200 h-full pt-11 flex flex-col gap-2 items-center">
      <Link href="/board/plain">
        <Button>Lexical Plain Text Editor</Button>
      </Link>
      <Link href="/board/notice">
        <Button>Lexical Rich Text Editor</Button>
      </Link>
    </div>
  );
};

export default BoardMainPage;
