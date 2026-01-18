import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { Word } from "../../types";
import { useNavigate } from "react-router";
import { TRANING_PAGE } from "../../routes/routes";

import {
  deleteWord,
  fetchAllWords,
  fetchCategories,
  fetchWordsByCategory,
  fetchWordsBySearch,
} from "../../redux/thunks/wordThunk";
import CircularProgress from "../CircularProgress/CircularProgress";
import DropDownMenu from "../DropDownMenu/DropDownMenu.tsx";
import { debounce } from "lodash";
import DropDownMenuCategory from "../DropDownMenuCategory/DropDownMenuCategory.tsx";
import WordsPagination from "../WordsPagination/WordsPagination.tsx";
import { toast } from "react-toastify";
import { useClickOutside } from "../../hooks/useClickOutside.tsx";
import { useGlobalContext } from "../../hooks/useGlobalContext.tsx";

function Dictionary() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [openDropdownId, setOpenDropdownId] = useState<string | number | null>(
    null
  );
  const { words, status, error } = useSelector(
    (state: RootState) => state.word
  );

  const navigate = useNavigate();

  const {
    isModalOpen,
    openModal,
    selectedCategory,
    setSelectedCategory,
    selected,
    setSelected,
  } = useGlobalContext();

  const dropdownRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => {
    setOpenDropdownId(null);
  });

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllWords());
  }, [dispatch]);

  const debouncedSearch = useMemo(
    () =>
      debounce((search: string) => {
        const trimmedTerm = search.trim();

        switch (true) {
          case trimmedTerm === "":
            dispatch(fetchAllWords());
            break;

          default:
            dispatch(fetchWordsBySearch(trimmedTerm));
            break;
        }
      }, 300),
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const itemsPerPage = 10;
  const pageCount = words ? Math.ceil(words.length / itemsPerPage) : 0;
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = useMemo(() => {
    if (!Array.isArray(words) || words.length === 0) return [];
    return words.slice(indexOfFirstItem, indexOfLastItem);
  }, [words, indexOfFirstItem, indexOfLastItem]);

  const toggleDropdown = (id: string | number) => {
    if (openDropdownId === id) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(id);
    }
  };

  const handleEditButton = (e: React.MouseEvent, item: Word) => {
    e.stopPropagation();
    return !isModalOpen ? openModal(false, item) : null;
  };

  const handleAddWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal(true);
  };

  const handleDelete = async (e: React.MouseEvent, item: Word) => {
    e.stopPropagation();
    try {
      dispatch(deleteWord({ id: item._id })).then(() => {
        dispatch(fetchAllWords());
      });
      setOpenDropdownId(null);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message;
      toast.error(`${errorMessage}`);
    }
  };

  const handleSearchVerb = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selected === "irregular") {
      dispatch(fetchWordsByCategory("Verb"));
    } else {
      dispatch(fetchWordsByCategory("Participle"));
    }
  };

  const isVerbCategory = selectedCategory === "Verb";

  return (
    <>
      <div className="min-h-screen px-2 xs:px-4 sm:px-6 md:px-8 xl:px-16">
        <form className="flex flex-col gap-3 pt-6 mb-[8px]">
          <div className="relative mb-[8px] w-full max-w-[320px] sm:max-w-[375px] md:max-w-[420px] xl:max-w-[500px]">
            <input
              type="text"
              placeholder="Search for anything"
              value={searchTerm}
              onChange={handleSearchChange}
              className="text-primary h-[44px] sm:h-[48px] xl:h-[52px] w-full rounded-[12px] px-4 sm:px-6 py-3 border border-grey-border focus:outline-none placeholder-primary hover:border-secondary focus:border-secondary text-sm sm:text-base xl:text-lg"
            />
            <svg
              width="20"
              height="20"
              className="stroke-primary fill-transparent absolute top-[50%] right-4 transform -translate-y-1/2 cursor-pointer"
            >
              <use href="/src/icons/icons.svg#icon-search"></use>
            </svg>
          </div>
          <DropDownMenuCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <div>
            <span className="text-primary font-medium text-sm sm:text-base xl:text-lg mr-2">
              To study:
            </span>
            <strong>{words.length}</strong>
          </div>
          {isVerbCategory && (
            <div className="pb-7">
              <div className="flex items-center space-x-6">
                <label className="flex items-center cursor-pointer text-sm sm:text-base xl:text-lg">
                  <button
                    type="button"
                    className="hidden"
                    onClick={handleSearchVerb}
                  >
                    <input
                      type="radio"
                      name="studyType"
                      value="regular"
                      className="hidden"
                      checked={selected === "regular"}
                      onChange={() => setSelected("regular")}
                    />
                  </button>
                  <div
                    className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${
                      selected === "regular"
                        ? "border-2 border-secondary"
                        : "border-2 border-gray-300"
                    }`}
                  >
                    {selected === "regular" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    )}
                  </div>
                  Regular
                </label>

                <label className="flex items-center cursor-pointer text-sm sm:text-base xl:text-lg">
                  <input
                    type="radio"
                    name="studyType"
                    value="irregular"
                    className="hidden"
                    checked={selected === "irregular"}
                    onChange={() => setSelected("irregular")}
                  />
                  <div
                    className={`w-5 h-5 mr-2 rounded-full flex items-center justify-center ${
                      selected === "irregular"
                        ? "border-2 border-secondary"
                        : "border-2 border-gray-300"
                    }`}
                  >
                    {selected === "irregular" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    )}
                  </div>
                  Irregular
                </label>
              </div>
            </div>
          )}
        </form>
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <button
              className="flex items-center text-primary text-sm sm:text-base xl:text-lg"
              onClick={handleAddWord}
            >
              Add word
              <svg
                width="16"
                height="16"
                className="ml-1 stroke-primary fill-transparent"
              >
                <use href="/src/icons/icons.svg#icon-plus"></use>
              </svg>
            </button>
            <button
              className="flex items-center text-primary text-sm sm:text-base xl:text-lg"
              onClick={() => navigate(TRANING_PAGE)}
            >
              Train oneself
              <svg
                width="16"
                height="16"
                className="ml-1 stroke-secondary fill-transparent"
              >
                <use href="/src/icons/icons.svg#icon-arrow-right"></use>
              </svg>
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden mb-8 xs:mb-6 md:mb-10 xl:mb-14">
          <table className="w-full text-sm xs:text-xs sm:text-base xl:text-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-3 text-primary font-medium text-center">
                  Word
                </th>
                <th className="py-2 px-3 text-primary font-medium text-center">
                  Translation
                </th>
                <th className="py-2 px-3 text-primary font-medium text-center">
                  Progress
                </th>
                <th className="py-2 px-3"></th>
              </tr>
            </thead>
            <tbody>
              {status === "loading" ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center">
                    Loading...
                  </td>
                </tr>
              ) : status === "failed" ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-4 text-center">
                    No words found
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr
                    key={item._id || index}
                    className="border-t border-gray-200"
                  >
                    <td className="border-r border-gray-200 py-2 px-3 text-primary text-center">
                      {item.original}
                    </td>
                    <td className="border-r border-gray-200 py-2 px-3 text-primary text-center">
                      {item.translation.trim()}
                    </td>
                    <td className="pb-[30px] pt-[16px] px-[14px] border-r border-gray-200 flex justify-center ">
                      {item.progress}%
                      <CircularProgress />
                    </td>
                    <td className="pb-[30px] pt-[16px] px-[14px] ">
                      <div className="dropdown inline-block absolute">                
                          <button
                            className="text-gray-400 hover:text-gray-600 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(item._id);
                            }}
                          >
                            ...
                          </button>
                       <div className="absolute">
                        <DropDownMenu
                          isOpen={openDropdownId === item._id}
                          onClose={() => setOpenDropdownId(null)}
                          menuItems={[
                            {
                              label: "Edit",
                              onClick: (e) => handleEditButton(e, item),
                              icon: "icon-edit",
                              textColor: "text-gray-700",
                            },
                            {
                              label: "Delete",
                              onClick: (e) => handleDelete(e, item),
                              icon: "icon-trash",
                              textColor: "",
                            },
                          ]}
                        />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <WordsPagination
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          handlePageClick={(selectedItem) => {
            setCurrentPage(selectedItem.selected);
          }}
        />
      </div>
    </>
  );
}

export default Dictionary;
