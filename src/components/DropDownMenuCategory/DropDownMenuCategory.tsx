import { useCallback, useState } from "react";
import { Category } from "../../types";
import { useAppSelector } from "../../hooks/useAppDispatch";
import { selectUserCategories } from "../../redux/selectors";

type DropDownMenuCategoryProps = {
  selectedCategory: string | Category;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | Category>>;
  className?: string;
};

function DropDownMenuCategory({
  selectedCategory,
  setSelectedCategory,
  className = "",
}: DropDownMenuCategoryProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const categories = useAppSelector(selectUserCategories);

  const handleCategorySelect = useCallback(
    (category: Category) => {
      setSelectedCategory(category);
      setIsDropDownOpen(false);
    },
    [setSelectedCategory]
  );

  return (
   <div className="relative mb-[40px]">
  <div
    onClick={() => setIsDropDownOpen(!isDropDownOpen)}
    className={
      className ||
      ` text-primary h-[48px] w-full max-w-[395px] 
      rounded-[15px] px-6 py-3 border-grey-border border-solid border 
      focus:outline-none placeholder-primary hover:border-secondary 
      focus:border-secondary cursor-pointer flex justify-between items-center`
    }
  >
    <span className="text-sm sm:text-base xl:text-lg">
      {selectedCategory || "All Categories"}
    </span>

    <svg
      width="20"
      height="20"
      className={`absolute top-1/2 right-4 transform -translate-y-1/2 origin-center transition-transform duration-200 ${
        isDropDownOpen ? "rotate-180" : ""
      }`}
    >
      <use href="/src/icons/icons.svg#icon-toggle-down"></use>
    </svg>
  </div>


      {isDropDownOpen && (
        <div className="absolute mb-1 w-full max-w-[395px] mt-10">
          <ul
            className="bg-white border border-gray-200 
              rounded-[15px] py-2 z-10"
          >
            <li
              className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleCategorySelect("All categories" as Category)}
            >
              All categories
            </li>
            {categories.map((category) => (
              <li
                key={category}
                className="px-6 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCategorySelect(category as Category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDownMenuCategory;
