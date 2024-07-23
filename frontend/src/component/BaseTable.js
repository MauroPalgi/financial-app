import React from "react";
import Table from "@mui/joy/Table";

import BaseTableItem from "./BaseTableItem";

export default function BaseTable({ list, headers }) {
  console.log(list);
  console.log(headers);
  if (!list || list.lenght === 0) {
    return null;
  }
  return (
    <Table>
      <thead>
        <tr>
          {Object.values(headers).map((h) => (
            <th>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {list.map((row) => (
          <BaseTableItem row={row} headers={headers} />
        ))}
      </tbody>
    </Table>
  );
}
