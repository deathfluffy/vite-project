import React from "react";

import DropDownMenuCategory from "../DropDownMenuCategory/DropDownMenuCategory";
import {
  addWord,
  fetchAllWords,
  updateWord,
} from "../../redux/thunks/wordThunk";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    isModalOpen,
    isAddMode,
    editFormData,
    setEditFormData,
    selectedCategory,
    setSelectedCategory,
    selected,
    setIsAddMode,
    setIsModalOpen,
    editingItem,
  } = useGlobalContext();
  if (!isModalOpen) return null;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const wordPayload = {
        original: editFormData.original,
        translation: editFormData.translation,
      };

      const resultAction = isAddMode
        ? await dispatch(
            addWord({
              ...wordPayload,
              progress: 0,
              categories: [selectedCategory],
              isIrregular: selected === "irregular",
            })
          )
        : editingItem &&
          (await dispatch(
            updateWord({
              id: editingItem._id,
              owner: editingItem.owner,
              ...wordPayload,
            })
          ));

      setIsModalOpen(false);
      setIsAddMode(false);
      dispatch(fetchAllWords());
      return resultAction;
    } catch (error: unknown) {
      toast.error((error as Error).message);
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30 px-4 sm:px-6"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="relative bg-[#85AA9F] rounded-[15px] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-[700px] py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 text-[#FCFCFC]">
          {isAddMode ? "Add Word" : "Edit Word"}
        </h2>

        {isAddMode && (
          <p className="text-[#FCFCFC] mb-4 text-sm sm:text-base">
            Adding a new word to the dictionary is an important step in
            enriching the language base and expanding the vocabulary.
          </p>
        )}

        {selectedCategory === "" ? null : (
          <>
            <DropDownMenuCategory
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              className="text-sm sm:text-base cursor-pointer border border-gray-300 
             rounded-[15px] py-3 px-4 text-[#FCFCFC] bg-transparent outline-none mb-5 relative fill-white"
            />

            <div className="mb-4">
              <div className="mb-2 flex items-center gap-2">
                <svg width="28px" height="28px">
                  <use href="/src/icons/icons.svg#icon-ukraine"></use>
                </svg>
                <label className="text-[#FCFCFC] text-sm sm:text-base">
                  Ukrainian
                </label>
              </div>
              <input
                pattern="^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$"
                required
                type="text"
                placeholder="Працювати"
                value={editFormData.original}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    original: e.target.value,
                  })
                }
                className="transition-colors
      placeholder:mb-10 placeholder:leading-6
      placeholder:tracking-tight placeholder:text-sm md:placeholder:text-base w-full mb-2 py-3 px-4 border border-gray-300 rounded-[15px] placeholder:text-[#FCFCFC] text-[#FCFCFC] bg-transparent outline-none"
              />
            </div>
            <div className="mb-4">
              <div className="mb-2 flex items-center gap-2">
                <svg width="28px" height="28px">
                  <use href="/src/icons/icons.svg#icon-united-kingdom"></use>
                </svg>
                <label className="text-[#FCFCFC] text-sm sm:text-base">
                  English
                </label>
              </div>
              <input
                pattern="\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b"
                required
                type="text"
                placeholder="Work"
                value={editFormData.translation}
                onChange={(e) =>
                  setEditFormData({
                    ...editFormData,
                    translation: e.target.value,
                  })
                }
                className="transition-colors
      placeholder:mb-10 placeholder:leading-6
      placeholder:tracking-tight placeholder:text-sm md:placeholder:text-base w-full mb-2 py-3 px-4 border border-gray-300 rounded-[15px] placeholder:text-[#FCFCFC] text-[#FCFCFC] bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                type="submit"
                className="w-full sm:w-auto py-3 px-6 text-sm font-semibold bg-[#FCFCFC] text-primary rounded-[30px]"
                onClick={(e) => handleSubmit(e)}
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:w-auto py-3 px-6 text-sm text-[#FCFCFC] border border-white/40 rounded-[30px]"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
