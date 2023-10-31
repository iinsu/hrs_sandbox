import { create } from "zustand";

export type SidebarType = string;

interface SidebarData {
  title?: string;
}

interface SidebarStore {
  type: SidebarType | null;
  data: SidebarData;
  isOpen: boolean;
  onOpen: (type: SidebarType, data?: SidebarData) => void;
  onClose: () => void;
}

export const useSidebar = create<SidebarStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));

interface MenuStore {
  mobile: boolean;
  onToggle: () => void;
}

export const useMenu = create<MenuStore>((set) => ({
  mobile: false,
  onToggle: () => set((state) => ({ mobile: !state.mobile })),
}));
