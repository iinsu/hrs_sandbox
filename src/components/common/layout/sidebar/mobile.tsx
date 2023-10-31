"use client";

import { mainRoutes } from "@/utils/route";
import { useSidebar } from "@/hooks/sidebar/useSidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MobileSidebarItem } from "./item";

export const MobileSidebar = () => {
  const { isOpen, type } = useSidebar();
  const sidebarOpen = isOpen && type === "/board";
  const routes = mainRoutes;

  return (
    <>
      <div
        className={cn(
          "w-[5.625rem] origin-left h-full overflow-y-auto bg-white shadow-sm border-r",
          sidebarOpen && "flex flex-col fixed"
        )}
      >
        <div className="h-[104px] flex flex-col items-center">
          <Image
            src="/images/placeholder.jpg"
            alt=""
            width={40}
            height={40}
            className="rounded-full mt-[2.37rem]"
          />
        </div>
        <div className="h-[2px] mb-[1.38rem] bg-gradient-to-r from-slate-50 via-slate-300 to-slate-50  w-[70%] mx-auto " />
        <div className="flex flex-col w-full">
          {routes.map((route) => (
            <MobileSidebarItem
              key={route.href}
              icon={route.icon}
              href={route.href}
              label={route.label}
            />
          ))}
        </div>
      </div>
    </>
  );
};
