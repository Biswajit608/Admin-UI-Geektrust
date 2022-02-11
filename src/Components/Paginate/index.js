import React, { useState } from "react";
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
  console.log(currentPage, employeesPerPage);
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

  return (
    <div className="paginate-container">
      <button onClick={goToFirstPage}>&lt;&lt;</button>
      <button onClick={goToPreviousPage}>&lt;</button>
      {pageNumberRange.map((pageNumber, index) => {
        return (
          <button key={index} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        );
      })}
      <button onClick={goToNextPage}>&gt;</button>
      <button onClick={goToLastPage}>&gt;&gt;</button>
    </div>
  );
}

export default Paginate;
