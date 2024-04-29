import React from "react";
import { useTable } from "react-table";

function Table({ data, columns }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <div className="h-[500px] overflow-scroll">
        <table {...getTableProps()} className="border-2 border-gray">
          <thead className="border-2 border-gray">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="text-black text-xl px-4 py-3 border-2 border-gray bg-gray-100"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border-2 border-gray even:bg-cyan-100"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="pt-4 px-4 py-2 text-lg border-2 border-gray"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              {/* <td className="text-gray-400 text-sm">Footer section</td> */}
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default Table;
