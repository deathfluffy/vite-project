import React, { useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { Category, Word } from "../types";

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    original: "",
    translation: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<Category | string>(
    "All categories"
  );
  const [selected, setSelected] = useState("regular");
  const [editingItem, setEditingItem] = useState<Word | null>(null);

  const openModal = (isAdd: boolean, word: Word | null = null) => {
    setIsAddMode(isAdd);
    setEditingItem(word);
    setEditFormData({
      original: word?.original || "",
      translation: word?.translation || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const value = {
    isModalOpen,
    openModal,
    closeModal,
    setIsModalOpen,
    isAddMode,
    editFormData,
    setEditFormData,
    selectedCategory,
    setSelectedCategory,
    setIsAddMode,
    editingItem,
    selected,
    setSelected,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};