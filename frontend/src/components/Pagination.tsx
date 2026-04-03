interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div className="d-flex flex-column align-items-center gap-2 mt-4">
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-4">
        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {/* 
                    [...Array(totalPages)] creates an array the size of totalPages.
                    map() then creates a numbered button for each page.
                  */}
        {[...Array(totalPages)].map((_, i) => (
          <button
            className={`btn ${
              currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'
            }`}
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <div className="d-flex align-items-center gap-2">
        <label htmlFor="pageSize" className="form-label mb-0 fw-semibold">
          Results per page:
        </label>
        <select
          id="pageSize"
          className="form-select w-auto"
          value={pageSize}
          onChange={(p) => {
            // Convert dropdown value to a number
            onPageSizeChange(Number(p.target.value));
            // Reset to page 1 when page size changes
            onPageChange(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
