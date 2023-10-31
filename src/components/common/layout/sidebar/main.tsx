"use client";

import {
  MobileSidebarItem,
  SidebarItem,
  SubSidebarItem,
} from "@/components/common/layout/sidebar/item";
import { mainRoutes, boardRoutes } from "@/utils/route";
import { useMenu, useSidebar } from "@/hooks/sidebar/useSidebar";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export const Sidebar = () => {
  const routes = mainRoutes;
  const { mobile } = useMenu();

  return (
    <>
      {mobile ? (
        <div
          className={cn(
            "w-[5.625rem] origin-left h-full overflow-y-auto bg-white shadow-sm border-r"
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
      ) : (
        <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
          <div className="h-[213px] flex flex-col items-center">
            <Image
              src="/images/placeholder.jpg"
              alt=""
              width={60}
              height={60}
              className="rounded-full mt-[2.37rem]"
            />
            <div className="text-base font-bold mt-[1.38rem] mb-[0.81rem]">
              헬렌
            </div>
            <div className="text-sm font-medium mb-[0.38rem] text-slate-400">
              Manager
            </div>
            <div className="text-xs font-normal text-slate-400">프론트엔드</div>
          </div>
          <div className="h-[2px] mb-[1.38rem] bg-gradient-to-r from-slate-50 via-slate-300 to-slate-50  w-[70%] mx-auto " />

          <div className="flex flex-col w-full">
            {routes.map((route) => (
              <SidebarItem
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const SubRouteTypeCheck = (type: string | null) => {
  if (type === "/board") {
    return "게시판";
  } else {
    return "";
  }
};

export const SubSidebar = () => {
  const { isOpen, onClose, type } = useSidebar();
  const sidebarOpen = isOpen && type === "/board";
  const routes = boardRoutes;

  return (
    <>
      <div
        className={cn(
          "hidden w-[11.5rem] origin-left h-full overflow-y-auto bg-white shadow-sm border-r",
          sidebarOpen && "flex fixed"
        )}
      >
        <div className="flex flex-col w-full">
          <button
            onClick={() => onClose()}
            className="p-2 flex justify-between group shadow-sm"
          >
            <span className="flex items-center h-full text-sm text-slate-400 ">
              {SubRouteTypeCheck(type)}
            </span>
            <ArrowLeft className="h-6 w-6 group-hover:text-orange-600 text-slate-400" />
          </button>
          {routes.map((route) => (
            <SubSidebarItem
              key={route.href}
              label={route.label}
              href={route.href}
            />
          ))}
        </div>
      </div>
    </>
  );
};
