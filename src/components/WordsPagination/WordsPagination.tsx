import React from "react";
import ReactPaginate from "react-paginate";
import { Icon } from "../Icon/Icon";

interface WordsPaginationProps {
  pageCount: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handlePageClick: (selectedItem: { selected: number }) => void;
}

const WordsPagination: React.FC<WordsPaginationProps> = ({
  pageCount,
  currentPage,
  setCurrentPage,
  handlePageClick,
}) => {
  return (
    <>
      {pageCount > 0 && (
        <div className="flex justify-center items-center gap-[10px]">
          <button
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-[8px] disabled:opacity-50"
            onClick={() => setCurrentPage(0)}
            disabled={currentPage === 0}
          >
            «
          </button>
          <ReactPaginate
            previousLabel={
              <Icon
                id="icon-prev"
                width="20"
                height="20"
                className="cursor-pointer"
              />
            }
            nextLabel={
              <Icon
                id="icon-next"
                width="20"
                height="20"
                className="cursor-pointer"
              />
            }
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"flex items-center gap-2"}
            pageClassName={
              "w-8 h-8 flex items-center justify-center border border-gray-300 rounded-[8px] cursor-pointer"
            }
            pageLinkClassName={
              "w-full h-full flex items-center justify-center "
            }
            activeClassName={"bg-secondary text-white"}
            previousClassName={
              "w-8 h-8 flex items-center justify-center border border-gray-300 rounded-[8px]"
            }
            nextClassName={
              "w-8 h-8 flex items-center justify-center border border-gray-300 rounded-[8px]"
            }
            disabledClassName={"opacity-50 cursor-not-allowed"}
            forcePage={currentPage}
            renderOnZeroPageCount={null}
          />
          <button
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-[8px] disabled:opacity-50 cursor-pointer"
            onClick={() => setCurrentPage(pageCount - 1)}
            disabled={currentPage === pageCount - 1 || pageCount === 0}
          >
            »
          </button>
        </div>
      )}
    </>
  );
};

export default WordsPagination;
