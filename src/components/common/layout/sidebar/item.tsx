"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebar } from "@/hooks/sidebar/useSidebar";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { onOpen, isOpen } = useSidebar();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    onOpen(href);
    if (pathname !== href) {
      router.push(href);
    }
  };

  const onHover = () => {
    onOpen(href);
  };

  return (
    <button
      onClick={onClick}
      onMouseOver={onHover}
      className={cn(
        "flex items-center gap-x-2 text-slate-400 text-sm",
        "font-[500] pl-6 transition-all hover:text-slate-500 hover:bg-orange-50",
        isActive &&
          "text-orange-500 bg-orange-50 hover:bg-orange-50 hover:text-orange-500 "
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          className={cn(
            "text-slate-400 h-4 w-4 mr-2",
            isActive && "text-orange-500"
          )}
        />
        {label}
      </div>
    </button>
  );
};

interface SubSidebarItemProps {
  label: string;
  href: string;
}

export const SubSidebarItem = ({ label, href }: SubSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (pathname === "/" && href === "/") || pathname === href;

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-x-2 text-slate-400 text-sm",
        "font-[500] pl-6 transition-all hover:text-slate-500 hover:bg-orange-50",
        isActive &&
          "text-orange-500 bg-orange-50 hover:bg-orange-50 hover:text-orange-500"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">{label}</div>
    </button>
  );
};

interface MobileSidebarItemProps {
  icon: LucideIcon;
  href: string;
  label: string;
}

export const MobileSidebarItem = ({
  icon: Icon,
  href,
  label,
}: MobileSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { onOpen } = useSidebar();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    onOpen(href);
    if (pathname !== href) {
      router.push(href);
    }
  };

  const onHover = () => {
    onOpen(href);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={onClick}
            onMouseOver={onHover}
            className={cn(
              "flex items-center gap-x-2 text-slate-400 text-sm justify-center",
              "font-[500] transition-all hover:text-slate-500 hover:bg-orange-50",
              isActive &&
                "text-orange-500 bg-orange-50 hover:bg-orange-50 hover:text-orange-500"
            )}
          >
            <div className="flex items-center gap-x-2 py-4">
              <Icon
                size={22}
                className={cn("text-slate-400", isActive && "text-orange-500")}
              />
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          className="rounded-md text-sm text-slate-500"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
