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
      <div className="h-full w-full xl:max-w-[1600px]">
        <div className="h-[4.25rem] w-full xl:max-w-[1600px] fixed inset-y-0 z-50 ">
          <MainHeader />
        </div>
        <div
          className={cn(
            "hidden xl:flex h-full w-[200px] flex-col fixed inset-y-0 z-50 mt-[4.25rem]",
            mobile && "w-[74px]"
          )}
        >
          <Sidebar />
        </div>
        <div className="flex xl:hidden h-full flex-col fixed inset-y-0 z-50 mt-[4.25rem]">
          <MobileSidebar />
        </div>
        <div
          className={cn(
            "h-full flex-col fixed inset-y-0 z-50 mt-[4.25rem] ml-[74px] xl:ml-[200px]",
            mobile && "xl:ml-[74px]"
          )}
        >
          <SubSidebar />
        </div>
        <main
          className={cn(
            "pl-[74px] xl:pl-[200px] h-full pt-[4.25rem] min-w-[1024px] w-full  shadow-xl",
            mobile && "xl:pl-[74px]"
          )}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
