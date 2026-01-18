import { createContext } from "react";
import { Category, Word } from "../types";

export interface GlobalContextType {
  isModalOpen: boolean;
  openModal: (isAdd: boolean, word?: Word | null) => void;
  closeModal: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddMode: boolean;
  editFormData: { original: string; translation: string };
  setEditFormData: React.Dispatch<
    React.SetStateAction<{ original: string; translation: string }>
  >;
  selectedCategory: Category | string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | string>>;
  setIsAddMode: React.Dispatch<React.SetStateAction<boolean>>;
  editingItem: Word | null;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextType | null>(null);