import React, { useState, useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./index.css";

function DataTableRow({
  rowData,
  handleCheckedRow,
  handleDeleteRow,
  handleEditRow,
  abc,
  flag,
}) {
  const [wantToEdit, setWantToEdit] = useState(false);
  const [employeeData, setEmployeeData] = useState(rowData);

  // function to handle the cancel icon of each row
  const handleCancelClickOnIcon = () => {
    setEmployeeData(rowData);
    setWantToEdit(false);
    abc(null);
  };

  // function to handle the save icon of each row
  const handleSaveClickOnIcon = () => {
    handleEditRow(employeeData);
    setWantToEdit(false);
    abc(null);
  };

  // function to handle the edit icon of each row
  const handleEditClickOnIcon = () => {
    abc(rowData.id);
  };

  // function to handle when we want to edit the employee data row
  const handleEmployeeDataChange = (event) => {
    if (wantToEdit) {
      const { name, value } = event.target;

      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  useEffect(() => {
    flag === rowData.id ? setWantToEdit(true) : setWantToEdit(false);
  }, [flag, rowData.id]);

  return (
    <>
      <tr className={rowData.isChecked ? "row-highlight" : ""}>
        <td>
          <input
            type="checkbox"
            onChange={() => handleCheckedRow(rowData.id)}
            checked={employeeData.isChecked ? "checked" : ""}
          />
        </td>
        <td>
          <div>
            <input
              className={`row-data-field ${
                rowData.isChecked ? "row-highlight" : ""
              } ${wantToEdit ? "editable" : "non-editable"}`}
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleEmployeeDataChange}
            />
          </div>
        </td>
        <td>
          <div>
            <input
              className={`row-data-field ${
                rowData.isChecked ? "row-highlight" : ""
              } ${wantToEdit ? "editable" : "non-editable"}`}
              type="text"
              name="email"
              value={employeeData.email}
              onChange={handleEmployeeDataChange}
            />
          </div>
        </td>
        <td>
          <div>
            <input
              className={`row-data-field ${
                rowData.isChecked ? "row-highlight" : ""
              } ${wantToEdit ? "editable" : "non-editable"}`}
              type="text"
              name="role"
              value={employeeData.role}
              onChange={handleEmployeeDataChange}
            />
          </div>
        </td>
        <td>
          <div className="icon-container">
            {wantToEdit ? (
              <>
                <span className="icon" onClick={handleSaveClickOnIcon}>
                  <SaveOutlinedIcon />
                </span>
                <span className="icon" onClick={handleCancelClickOnIcon}>
                  <CloseOutlinedIcon />
                </span>
              </>
            ) : (
              <>
                <span className="icon" onClick={handleEditClickOnIcon}>
                  <EditOutlinedIcon />
                </span>
                <span
                  className="icon"
                  onClick={() => handleDeleteRow(rowData.id)}
                >
                  <DeleteOutlineOutlinedIcon />
                </span>
              </>
            )}
          </div>
        </td>
      </tr>
    </>
  );
}

export default DataTableRow;
