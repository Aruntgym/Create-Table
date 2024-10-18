import React, { useState } from "react";
import "./TableCreation.css";

const TableCreator = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const [cellWidth, setCellWidth] = useState(100);
  const [cellHeight, setCellHeight] = useState(30);
  const [showHeaders, setShowHeaders] = useState(true);
  const [isTableCreated, setIsTableCreated] = useState(false);
  const [manualInput, setManualInput] = useState({ rows: 0, cols: 0 });
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedCols, setSelectedCols] = useState(0);

  // Handle input for rows and columns manually
  const handleManualInputChange = (e) => {
    const { name, value } = e.target;
    setManualInput({ ...manualInput, [name]: parseInt(value) || 0 });
  };

  // Handle manual table creation
  const createTableManually = () => {
    setRows(manualInput.rows);
    setCols(manualInput.cols);
    adjustTableData(manualInput.rows, manualInput.cols);
    setIsTableCreated(true);
  };

  const handleMouseEnter = (r, c) => {
    setSelectedRows(r + 1);
    setSelectedCols(c + 1);
  };

  const adjustTableData = (newRows, newCols) => {
    const newTableData = Array.from({ length: newRows }, () =>
      Array(newCols).fill("")
    );
    const newHeaders = Array.from(
      { length: newCols },
      (_, index) => `Header ${index + 1}`
    );
    setTableData(newTableData);
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

  const createTableFromGrid = () => {
    setRows(selectedRows);
    setCols(selectedCols);
    adjustTableData(selectedRows, selectedCols);
    setIsTableCreated(true);
  };

  const handleSave = () => {
    console.log("Table saved", { tableData, tableHeaders });
  };

  const handleShare = () => {
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
                  style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
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
      <div className="table-Ms">
      <h2>Create Table</h2>

      {!isTableCreated && (
        <div className="manual-input">
          <h3>Enter No.of Rows and Cols Manually:</h3>
          <label>
            Rows:
            <input
              type="number"
              name="rows"
              value={manualInput.rows}
              onChange={handleManualInputChange}
              min="1"
            />
          </label>
          <label>
            Columns:
            <input
              type="number"
              name="cols"
              value={manualInput.cols}
              onChange={handleManualInputChange}
              min="1"
            />
          </label>
          <div className="table-WH">
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
          <div className="table-checkbox">
          <label>
            <input
              type="checkbox"
              checked={showHeaders}
              onChange={() => setShowHeaders(!showHeaders)}
            />
            Show Headers
          </label>
          </div>
          </div>
          <p>
            Selected: Rows {selectedRows} x cols {selectedCols}
          </p>
        </div>
      )} 

      {!isTableCreated && (
        <div className="grid-selection">
          <div className="grid">
            {[...Array(10)].map((_, row) => (
              <div key={row} className="grid-row">
                {[...Array(10)].map((_, col) => (
                  <div
                    key={col}
                    className={`grid-cell ${
                      row < selectedRows && col < selectedCols ? "selected" : ""
                    }`}
                    onMouseEnter={() => handleMouseEnter(row, col)}
                    onClick={createTableFromGrid}
                  ></div>
                ))}
              </div>
            ))}
              <div className="action-buttons">
          <button onClick={createTableManually}>Create Table</button>
          </div>
          </div>
        
        </div>
      )}

      {isTableCreated && (
        <div className="table-settings">
         
        </div>
      )}

      {isTableCreated && (
        <div className="generated-table">
          {renderTable()}
          <div className="action-buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default TableCreator;
