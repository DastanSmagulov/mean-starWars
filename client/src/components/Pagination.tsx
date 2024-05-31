import React from "react";

interface PaginationProps {
  fetchData: any;
  api: any;
  name: String;
}

const Pagination: React.FC<PaginationProps> = ({ fetchData, api, name }) => {
  const { next, previous, totalPages, currentPage } = api;

  const handleNext = () => {
    if (next) {
      fetchData("", next);
    }
  };

  const handlePrevious = () => {
    if (previous) {
      fetchData("", previous);
    }
  };

  const handlePageClick = (page: number) => {
    fetchData("", page);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex max-xl:text-xs items-center justify-center mt-8 mb-10">
      <button
        className="px-4 py-2 mr-2 max-lg:hidden bg-slate-500 text-white rounded-md shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handlePrevious}
        disabled={!previous}
      >
        Previous
      </button>
      <div className="flex">
        {pages.map((page) => (
          <button
            key={page}
            className={`px-4 py-2 mr-2 rounded-md shadow-md hover:bg-slate-600 ${
              page === currentPage
                ? "bg-slate-600 text-white"
                : "bg-slate-500 text-white hover:bg-blue-600"
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        className="px-4 py-2 max-lg:hidden bg-slate-500 text-white rounded-md shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={!next}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
