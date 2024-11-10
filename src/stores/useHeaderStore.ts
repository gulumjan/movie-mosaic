import { create } from "zustand";

interface HeaderStore {
  isOpen: boolean;
  setIsOpen: (isOpenBurgerMenu: boolean) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set(() => ({ isOpen: isOpen })),
}));
