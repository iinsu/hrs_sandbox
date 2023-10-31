import { ClipboardList, Home } from "lucide-react";

export const mainRoutes = [
  {
    icon: Home,
    label: "홈",
    href: "/",
  },
  {
    icon: ClipboardList,
    label: "게시판",
    href: "/board",
  },
];

export const boardRoutes = [
  {
    label: "통합 게시판",
    href: "/board",
  },
  {
    label: "공지사항",
    href: "/board/notice",
  },
];
