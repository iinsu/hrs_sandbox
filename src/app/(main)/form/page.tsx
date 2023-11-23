import { Button } from "@/components/ui/button";
import Link from "next/link";

const FormPage = () => {
  return (
    <>
      <div className="flex flex-col items-center pt-6 gap-2">
        <Link href="/form/shad">
          <Button variant="link">Shad Form Example</Button>
        </Link>
        <Link href="/form/register">
          <Button variant="link">Register Form Page</Button>
        </Link>
      </div>
    </>
  );
};

export default FormPage;
