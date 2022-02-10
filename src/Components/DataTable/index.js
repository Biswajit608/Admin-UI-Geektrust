import React, { useState, useEffect } from "react";
import "./index.css";

function DataTable({
  filteredEmployees,
  handleCheckedRow,
  handleEditRow,
  handleDeleteRow,
}) {
  const employeesPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesDataInCurrentPage, setEmployeesDataInCurrentPage] = useState(
    filteredEmployees.slice()
  );
  const [totalPages, setTotalPages] = useState(
    Math.ceil(filteredEmployees.length / employeesPerPage)
  );

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default DataTable;
