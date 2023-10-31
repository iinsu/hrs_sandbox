import MainLayout from "@/components/common/layout/main";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="w-full h-full flex justify-center">
        <MainLayout>{children}</MainLayout>
      </div>
    </>
  );
};

export default Layout;
