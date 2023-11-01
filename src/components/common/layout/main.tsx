"use client";

import MainHeader from "@/components/common/layout/header/main";
import { Sidebar, SubSidebar } from "@/components/common/layout/sidebar/main";
import { MobileSidebar } from "./sidebar/mobile";
import { useMenu } from "@/hooks/sidebar/useSidebar";
import { cn } from "@/lib/utils";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { mobile } = useMenu();
  return (
    <>
      <div className="h-full w-full md:max-w-[1600px] flex relative shadow-xl">
        <div className="h-[4.25rem] w-full md:max-w-[1600px] fixed inset-y-0 z-50 ">
          <MainHeader />
        </div>
        <div
          className={cn(
            "hidden md:flex h-full w-[11.5rem] flex-col fixed inset-y-0 z-50 mt-[4.25rem]",
            mobile && "w-[5.625rem]"
          )}
        >
          <Sidebar />
        </div>
        <div className="flex md:hidden h-full flex-col fixed inset-y-0 z-50 mt-[4.25rem]">
          <MobileSidebar />
        </div>
        <div
          className={cn(
            "h-full flex-col fixed inset-y-0 z-50 mt-[4.25rem] ml-[5.625rem] md:ml-[11.5rem]",
            mobile && "md:ml-[5.625rem]"
          )}
        >
          <SubSidebar />
        </div>
        <main
          className={cn(
            "pl-[5.625rem] md:pl-[11.5rem] h-full pt-[4.25rem] w-full",
            mobile && "md:pl-[5.625rem]"
          )}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
