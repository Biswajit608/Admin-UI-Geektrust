import React, { useState, useEffect } from "react";
import "./index.css";

function DataTableRow() {
  return (
    <tr>
      <td>
        <input type="checkbox" name="" id="" readOnly />
      </td>
      <td>
        <div>
          <input type="text" name="name" value="" readOnly />
        </div>
      </td>
      <td>
        <div>
          <input type="text" name="email" value="" readOnly />
        </div>
      </td>
      <td>
        <div>
          <input type="text" name="role" value="" readOnly />
        </div>
      </td>
      <td>
        <div>
          <></>
        </div>
      </td>
    </tr>
  );
}

export default DataTableRow;
