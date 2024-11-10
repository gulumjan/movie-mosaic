// stores/useYoutubeVideoStore.ts
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  videoKey: string | null;
  openModal: (videoKey: string) => void;
  closeModal: () => void;
}

const useYoutubeVideoStore = create<ModalState>((set) => ({
  isOpen: false,
  videoKey: null,
  openModal: (videoKey) => set({ isOpen: true, videoKey }),
  closeModal: () => set({ isOpen: false, videoKey: null }),
}));

export default useYoutubeVideoStore;
