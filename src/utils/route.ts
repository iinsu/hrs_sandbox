import { ArrowRightLeft, ClipboardList, Home, Sheet } from "lucide-react";

export const mainRoutes = [
  {
    icon: Home,
    label: "홈",
    href: "/",
  },
  {
    icon: Sheet,
    label: "테이블",
    href: "/table",
  },
  {
    icon: ClipboardList,
    label: "게시판",
    href: "/board",
  },
  {
    icon: ArrowRightLeft,
    label: "Query",
    href: "/query",
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
