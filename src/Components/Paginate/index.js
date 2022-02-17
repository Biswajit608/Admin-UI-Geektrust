import React, { useState } from "react";
import { useEffect } from "react";
import "./index.css";

const getPaginateButtons = (startPageNumber, lastPageNumber) => {
  return Array.from(
    { length: (lastPageNumber - startPageNumber) / 1 + 1 },
    (_, i) => startPageNumber + i * 1
  );
};

function Paginate({
  currentPage,
  setCurrentPage,
  employeesPerPage,
  totalPages,
}) {
  const [startPageNumber, setStartPageNumber] = useState(1);
  const [lastPageNumber, setLastPageNumber] = useState(totalPages);
  const [pageNumberRange, setPageNumberRange] = useState(
    getPaginateButtons(startPageNumber, lastPageNumber)
  );

  //function to handle to change of Page Number
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // function to go to the first page
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  //function to go to last page
  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToPreviousPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const checkPageNumberRange = () => {
    setPageNumberRange(getPaginateButtons(startPageNumber, totalPages, 1));
  };

  useEffect(() => {
    checkPageNumberRange();
  }, [totalPages, currentPage]);

  return (
    <div className="paginate-container">
      <button
        className={`btn ${currentPage === 1 ? "inactive-btn" : ""}`}
        disabled={currentPage === 1 ? "disabled" : ""}
        onClick={goToFirstPage}
      >
        &lt;&lt;
      </button>

      <button
        className={`btn ${currentPage === 1 ? "inactive-btn" : ""}`}
        disabled={currentPage === 1 ? "disabled" : ""}
        onClick={goToPreviousPage}
      >
        &lt;
      </button>

      {pageNumberRange.map((pageNumber, index) => {
        return (
          <button
            className={`btn ${currentPage === pageNumber ? "active-btn" : ""}`}
            key={index}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        className={`btn ${currentPage === totalPages ? "inactive-btn" : ""}`}
        disabled={currentPage === totalPages ? "disabled" : ""}
        onClick={goToNextPage}
      >
        &gt;
      </button>

      <button
        className={`btn ${currentPage === totalPages ? "inactive-btn" : ""}`}
        disabled={currentPage === totalPages ? "disabled" : ""}
        onClick={goToLastPage}
      >
        &gt;&gt;
      </button>
    </div>
  );
}

export default Paginate;
