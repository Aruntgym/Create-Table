import React from "react";
import "./DynamicTable.css"; // Create a CSS file for table styling

const DynamicTable = ({ rows, columns, includeHeader }) => {
  return (
    <div className="dynamic-table">
      <table>
        {includeHeader && (
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index}>Header {index + 1}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex}>
                  Cell {rowIndex + 1},{colIndex + 1}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
