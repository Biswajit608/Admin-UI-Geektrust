import React, { useState, useEffect } from "react";
import axios from "axios";
import { endpoint } from "../../config";
import { useSnackbar } from "notistack";
import DataTable from "../DataTable/index";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "./index.css";

const DashBoard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchString, setSearchString] = useState("");

  //function to fetch the employees data
  const fetchEmployeesData = async () => {
    try {
      const response = await axios.get(endpoint);
      const finalResponse = response.data.map((employee) => {
        return { ...employee, isChecked: false };
      });
      setEmployees(finalResponse);
    } catch (e) {
      // console.log(e.response.statusText);
      handleError(e);
    }
  };

  // Function to handle, when row is selected
  const handleCheckedRow = (id) => {
    const tempEmployees = [...employees];
    tempEmployees.forEach((employee) => {
      if (employee.id === id) {
        employee.isChecked = !employee.isChecked;
      }
    });
    setEmployees(tempEmployees);
  };

  // function to handle the delete button at footer
  const handleDeleteRow = (id) => {
    let tempEmployees = [...employees];
    tempEmployees = tempEmployees.filter((employee) => employee.id !== id);
    setEmployees(tempEmployees);
  };

  //function to handle the delete selected button functionality
  const handleDeleteAllSelected = () => {
    let tempEmployees = [...employees];
    tempEmployees = tempEmployees.filter((employee) => !employee.isChecked);

    setEmployees(tempEmployees);
  };

  //function to handle then edit of the row
  const handleEditRow = (rowToEdit) => {
    let tempEmployees = [...employees];
    tempEmployees = tempEmployees.map((employee) => {
      if (employee.id === rowToEdit.id) {
        return Object.assign(employee, rowToEdit);
      }
      return employee;
    });

    setEmployees(tempEmployees);
  };

  //function to handle the error while doing network call
  const handleError = (e) => {
    if (e.response) {
      enqueueSnackbar(`${e.response.statusText} check your API endpoint`, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(
        "Something went wrong. Check that the backend is running",
        { variant: "error" }
      );
    }
  };

  // useEffect to fetch the employees data
  useEffect(() => {
    fetchEmployeesData();
  }, []);

  // useEffect to manipulate employees list based on searchString
  useEffect(() => {
    if (searchString.length > 0) {
      const searchedEmployees = employees.filter((employee) => {
        const { name, role, email } = employee;
        if (
          name.toLowerCase().includes(searchString.toLowerCase()) ||
          email.toLowerCase().includes(searchString.toLowerCase()) ||
          role.toLowerCase().includes(searchString.toLowerCase())
        ) {
          return employee;
        }
      });

      setFilteredEmployees(searchedEmployees);
    } else {
      setFilteredEmployees(employees);
    }
  }, [searchString, employees]);

  return (
    <div className="dashboard-container">
      <div className="search-bar-box">
        <input
          type="text"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="Search by name, email or role"
        />
        <span className="search-bar-icon">
          <SearchOutlinedIcon />
        </span>
      </div>
      <div className="dashboard">
        <DataTable
          filteredEmployees={filteredEmployees}
          handleCheckedRow={handleCheckedRow}
          handleEditRow={handleEditRow}
          handleDeleteRow={handleDeleteRow}
          handleDeleteAllSelected={handleDeleteAllSelected}
        />
      </div>
    </div>
  );
};

export default DashBoard;
