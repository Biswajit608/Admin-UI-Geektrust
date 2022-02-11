import React, { useState, useEffect } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import "./index.css";

function DataTableRow({
  rowData,
  handleCheckedRow,
  handleDeleteRow,
  handleEditRow,
}) {
  const [wanToEdit, setWantToEdidt] = useState(false);
  const [employeeData, setEmployeeData] = useState(rowData);

  return (
    <tr>
      <td>
        <input type="checkbox" name="" id="" />
      </td>
      <td>
        <div>
          <input type="text" name="name" value={employeeData.name} readOnly />
        </div>
      </td>
      <td>
        <div>
          <input type="text" name="email" value={employeeData.email} readOnly />
        </div>
      </td>
      <td>
        <div>
          <input type="text" name="role" value={employeeData.role} readOnly />
        </div>
      </td>
      <td>
        <div>
          {wanToEdit ? (
            <>
              <span></span>
              <span>
                <DeleteOutlineOutlinedIcon />
              </span>
            </>
          ) : (
            <>
              <span></span>
              <span></span>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default DataTableRow;
