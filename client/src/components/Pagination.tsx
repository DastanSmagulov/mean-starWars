import React from "react";

interface PaginationProps {
  fetchData: any;
  api: any;
  name: String;
}

const Pagination: React.FC<PaginationProps> = ({ fetchData, api, name }) => {
  const { next, previous } = api;

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

  const handlePageClick = (url: any) => {
    fetchData("", url);
  };

  // Generate an array of page numbers based on the count of planets
  const maxPagesToShow = 6;
  const pageCount = api.count ? Math.ceil(api.count / 10) : 0;
  const pages = Array.from(
    { length: Math.min(pageCount, maxPagesToShow) },
    (_, index) => index + 1
  );
  const nextPage = next ? Number(next[next.length - 1]) - 1 : -100;
  const prevPage = previous ? Number(previous[previous.length - 1]) + 1 : -100;

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
              page === nextPage || page === prevPage
                ? "bg-slate-600 text-white"
                : "bg-slate-500 text-white hover:bg-blue-600"
            }`}
            onClick={() =>
              handlePageClick(
                `${process.env.NEXT_PUBLIC_API_LIVE_URL}/${name}/?page=${page}`
              )
            }
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
