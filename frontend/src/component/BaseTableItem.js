import React from "react";

export default function BaseTableItem({ row, headers }) {
  return (
    <>
      <tr>
        {Object.values(headers).map((r) => {
          return <td>{row[r]}</td>;
        })}
      </tr>
    </>
  );
}
