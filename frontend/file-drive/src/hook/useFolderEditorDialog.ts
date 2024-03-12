import { create } from "zustand";

type FolderEditorDialogStore = {
  isOpen: boolean;
  show: () => void;
  hide: () => void;
  toggle: (value: boolean) => void;
};

export const useFolderEditorDialog = create<FolderEditorDialogStore>((set) => ({
  isOpen: false,
  show: () => set({ isOpen: true }),
  hide: () => set({ isOpen: false }),
  toggle: (value: boolean) => set({ isOpen: value }),
}));
