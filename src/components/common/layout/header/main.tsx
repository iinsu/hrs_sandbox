"use client";

import { Button } from "@/components/ui/button";

import { LogOut, Menu } from "lucide-react";
import { useMenu } from "@/hooks/sidebar/useSidebar";
//import { signOut } from "next-auth/react";

const MainHeader = () => {
  const { onToggle } = useMenu();

  const handleLogout = () => {
    //signOut({ callbackUrl: "/login" });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <>
      <div className="px-[2.25rem] border-b h-full flex items-center bg-white shadow-sm ">
        <div className="flex">
          <div
            onClick={onToggle}
            className="hidden xl:flex cursor-pointer hover:text-orange-500"
          >
            <Menu />
          </div>
          <div className="ml-[1.38rem] font-bold">HRS</div>
        </div>
        <div className="flex gap-x-2 ml-auto">
          <Button size="sm" variant="ghost" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
