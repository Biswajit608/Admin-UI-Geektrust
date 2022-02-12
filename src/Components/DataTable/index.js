import React, { useState, useEffect } from "react";
import DataTableRow from "../DataTableRow/index";
import Paginate from "../Paginate/index";
import "./index.css";

function DataTable({
  filteredEmployees,
  handleCheckedRow,
  handleEditRow,
  handleDeleteRow,
  handleDeleteAllSelected,
}) {
  const employeesPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesDataInCurrentPage, setEmployeesDataInCurrentPage] = useState(
    filteredEmployees.slice(
      (currentPage - 1) * employeesPerPage,
      (currentPage - 1) * employeesPerPage + employeesPerPage
    )
  );
  const [totalPages, setTotalPages] = useState(
    Math.ceil(filteredEmployees.length / employeesPerPage)
  );

  const [isAnyRowCheck, setIsAnyRowCheck] = useState(false);

  const [flag, setFlag] = useState(null);

  // function to handle the employees data when page number is changed
  const handleCurrentPageEmployeesData = () => {
    const start = (currentPage - 1) * employeesPerPage;
    const end = start + employeesPerPage;
    setEmployeesDataInCurrentPage(filteredEmployees.slice(start, end));
  };

  //function to handle the select all row functionality
  const handleTopCheckBox = (event) => {
    if (event.target.checked) {
      employeesDataInCurrentPage.map(
        (employee) => !employee.isChecked && handleCheckedRow(employee.id)
      );
    } else {
      employeesDataInCurrentPage.map(
        (employee) => employee.isChecked && handleCheckedRow(employee.id)
      );
    }
  };

  // function to active/disabled the "Delete Selected" button
  const isAnyRowChecked = (filteredEmployees) => {
    const result = filteredEmployees.reduce(
      (i, member) => i || member.isChecked,
      false
    );

    setIsAnyRowCheck(result);
  };

  const abc = (id) => setFlag(id);

  useEffect(() => {
    isAnyRowChecked(filteredEmployees);
    setTotalPages(Math.ceil(filteredEmployees.length / employeesPerPage));
  }, [filteredEmployees]);

  useEffect(() => {
    handleCurrentPageEmployeesData();
  }, [currentPage, filteredEmployees]);

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={handleTopCheckBox} />
            </th>
            <th>
              <div className="table-heading">Name</div>
            </th>
            <th>
              <div className="table-heading">Email</div>
            </th>
            <th>
              <div className="table-heading">Role</div>
            </th>
            <th>
              <div className="table-heading">Actions</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {employeesDataInCurrentPage.map((employee) => (
            <DataTableRow
              key={employee.id}
              rowData={employee}
              handleCheckedRow={handleCheckedRow}
              handleDeleteRow={handleDeleteRow}
              handleEditRow={handleEditRow}
              abc={abc}
              flag={flag}
            />
          ))}
        </tbody>
      </table>
      <div className="table-bottom">
        {totalPages >= 1 && (
          <button
            className={
              !isAnyRowCheck ? "inactive-delete-all-btn" : "delete-all-btn"
            }
            disabled={!isAnyRowCheck ? "disabled" : ""}
            onClick={handleDeleteAllSelected}
          >
            Delete Selected
          </button>
        )}
        {totalPages >= 1 && (
          <Paginate
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            employeesPerPage={employeesPerPage}
          />
        )}
      </div>
    </div>
  );
}

export default DataTable;
