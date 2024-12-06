import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  // onLimitChange,
}) => {
  return (
    <div className="flex items-center justify-center mt-10 space-x-4">
      <button
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        {currentPage} of {totalPages}
      </span>
      <button
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      {/* <select
        value={currentPage}
        onChange={(e) => onLimitChange(e.target.value)}
        className="border rounded p-2"
      >
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="20">20 per page</option>
        <option value="50">50 per page</option>
      </select> */}
    </div>
  );
};

export default Pagination;
