import { create } from "zustand";

type LoadingSpinnerStore = {
  isOpen: boolean;
  show: () => void;
  hide: () => void;
  toggle: (value: boolean) => void;
};

export const useLoadingSpinner = create<LoadingSpinnerStore>((set) => ({
  isOpen: false,
  show: () => set({ isOpen: true }),
  hide: () => set({ isOpen: false }),
  toggle: (value: boolean) => set({ isOpen: value }),
}));
