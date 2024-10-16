import React, { useState } from "react";
import "./TableCreation.css";

const TableCreator = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [tableData, setTableData] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(""))
  );
  const [tableHeaders, setTableHeaders] = useState([
    "Header 1",
    "Header 2",
    "Header 3",
  ]);
  const [cellWidth, setCellWidth] = useState(100);
  const [cellHeight, setCellHeight] = useState(30);
  const [showHeaders, setShowHeaders] = useState(true);
  const [isTableCreated, setIsTableCreated] = useState(false);

  const handleMouseOver = (row, col) => {
    setRows(row + 1);
    setCols(col + 1);
  };

  const handleRowsChange = (e) => {
    const newRows = parseInt(e.target.value, 10);
    if (isNaN(newRows) || newRows <= 0) return;
    setRows(newRows);
    adjustTableData(newRows, cols);
  };

  const handleColsChange = (e) => {
    const newCols = parseInt(e.target.value, 10);
    if (isNaN(newCols) || newCols <= 0) return;
    setCols(newCols);
    adjustTableData(rows, newCols);
  };

  const adjustTableData = (newRows, newCols) => {
    const newTableData = [...tableData];
    while (newTableData.length < newRows) {
      newTableData.push(Array(newCols).fill(""));
    }
    newTableData.length = newRows;
    newTableData.forEach((row) => {
      while (row.length < newCols) {
        row.push("");
      }
      row.length = newCols;
    });
    setTableData(newTableData);
    const newHeaders = [...tableHeaders];
    while (newHeaders.length < newCols) {
      newHeaders.push(`Header ${newHeaders.length + 1}`);
    }
    newHeaders.length = newCols;
    setTableHeaders(newHeaders);
  };

  const handleCellChange = (rowIdx, colIdx, value) => {
    const updatedData = [...tableData];
    updatedData[rowIdx][colIdx] = value;
    setTableData(updatedData);
  };

  const handleHeaderChange = (colIdx, value) => {
    const updatedHeaders = [...tableHeaders];
    updatedHeaders[colIdx] = value;
    setTableHeaders(updatedHeaders);
  };

  const createTable = () => {
    setIsTableCreated(true);
  };

  const handleSave = () => {
    // Logic for saving table data, such as exporting to a file or saving to a database
    console.log("Table saved", { tableData, tableHeaders });
  };

  const handleShare = () => {
    // Logic for sharing the table, such as generating a link or sharing on social media
    console.log("Table shared", { tableData, tableHeaders });
  };

  const renderTable = () => (
    <table>
      {showHeaders && (
        <thead>
          <tr>
            {tableHeaders.map((header, colIdx) => (
              <th key={colIdx}>
                <input
                  type="text"
                  value={header}
                  onChange={(e) => handleHeaderChange(colIdx, e.target.value)}
                  style={{ width: `${cellWidth}px` }}
                />
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {tableData.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map((cell, colIdx) => (
              <td key={colIdx}>
                <input
                  type="text"
                  value={cell}
                  onChange={(e) =>
                    handleCellChange(rowIdx, colIdx, e.target.value)
                  }
                  style={{
                    width: `${cellWidth}px`,
                    height: `${cellHeight}px`,
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="table-creator">
      <h2>Create Dynamic Table</h2>
      <div className="table-creation">
        <h3>Table Settings</h3>
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            onChange={handleRowsChange}
            min="1"
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            value={cols}
            onChange={handleColsChange}
            min="1"
          />
        </label>
        <label>
          Cell Width:
          <input
            type="number"
            value={cellWidth}
            onChange={(e) => setCellWidth(parseInt(e.target.value))}
            min="10"
          />
        </label>
        <label>
          Cell Height:
          <input
            type="number"
            value={cellHeight}
            onChange={(e) => setCellHeight(parseInt(e.target.value))}
            min="10"
          />
        </label>
        <label>
          <input
            type="checkbox"
            checked={showHeaders}
            onChange={() => setShowHeaders(!showHeaders)}
          />
          Show Headers
        </label>
        <button onClick={createTable}>Create Table</button>
      </div>

      <div className="grid">
        {[...Array(10)].map((_, row) => (
          <div key={row} className="grid-row">
            {[...Array(10)].map((_, col) => (
              <div
                key={col}
                className={`grid-cell ${
                  row < rows && col < cols ? "selected" : ""
                }`}
                onMouseOver={() => handleMouseOver(row, col)}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <div className="generated-table">
        {isTableCreated && renderTable()}
        {isTableCreated && (
          <div className="action-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleShare}>Share</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableCreator;
