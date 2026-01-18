import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router";
import { TRANING_PAGE } from "../../routes/routes";

import {
  fetchAllWords,
  fetchCategories,
  fetchWordsBySearch,
} from "../../redux/thunks/wordThunk";

import CircularProgress from "../CircularProgress/CircularProgress";
import DropDownMenuCategory from "../DropDownMenuCategory/DropDownMenuCategory.tsx";
import WordsPagination from "../WordsPagination/WordsPagination.tsx";
import { debounce } from "lodash";
import { useGlobalContext } from "../../hooks/useGlobalContext.tsx";

function Recommend() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const { words, status, error } = useSelector(
    (state: RootState) => state.word
  );
  const navigate = useNavigate();

  const { selectedCategory, setSelectedCategory, selected, setSelected } =
    useGlobalContext();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAllWords());
  }, [dispatch]);

  const debouncedSearch = useMemo(
    () =>
      debounce((search: string) => {
        const trimmedTerm = search.trim();

        if (trimmedTerm === "") {
          dispatch(fetchAllWords());
        } else {
          dispatch(fetchWordsBySearch(trimmedTerm));
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

  const isVerbCategory = selectedCategory === "Verb";

  return (
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

        {isVerbCategory && (
          <div className="pb-7">
            <div className="flex items-center space-x-6">
              <label className="flex items-center cursor-pointer text-sm sm:text-base xl:text-lg">
                <input
                  type="radio"
                  name="studyType"
                  value="regular"
                  className="hidden"
                  checked={selected === "regular"}
                  onChange={() => setSelected("regular")}
                />
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
      <div className="mb-8">
        <span className="text-primary font-medium text-sm sm:text-base xl:text-lg mr-2">
          To study:
        </span>
        <strong>{words.length}</strong>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
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
                Category
              </th>
              <th className="py-2 px-3 text-primary font-medium text-center"></th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : status === "failed" ? (
              <tr>
                <td colSpan={5} className="py-4 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-4 text-center">
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
                  <td className="border-r border-gray-200 py-2 px-3 text-primary text-center">
                    {item.categories}
                  </td>
                  <td className="border-r border-gray-200 py-2 px-3 flex justify-center">
                    <CircularProgress />
                  </td>
                  <td className="border-r border-gray-200 py-2 px-3 text-center">
                    <button
                      className="text-secondary underline hover:text-primary"
                      onClick={() => navigate(`/training/${item._id}`)}
                    >
                      Train
                    </button>
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
  );
}

export default Recommend;
