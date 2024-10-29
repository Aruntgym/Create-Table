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
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCell, setSelectedCell] = useState({ row: null, col: null });
  const [isTextWrap, setIsTextWrap] = useState(false);
  const [hAlign, setHAlign] = useState("left");
  const [showSharePopup, setShowSharePopup] = useState(false);

  // Handle input for rows and columns manually
  const handleManualInputChange = (e) => {
    const { name, value } = e.target;
    setManualInput({ ...manualInput, [name]: parseInt(value) || 0 });
  };

  // Handle manual table creation
  const createTableManually = () => {
    if (manualInput.rows > 0 && manualInput.cols > 0) {
      setRows(manualInput.rows);
      setCols(manualInput.cols);
      adjustTableData(manualInput.rows, manualInput.cols);
      setIsTableCreated(true);
    } else {
      alert("Please enter valid number of rows and columns.");
    }
  };

  const handleMouseEnter = (r, c) => {
    setSelectedRows(r + 1);
    setSelectedCols(c + 1);
  };

  const adjustTableData = (newRows, newCols) => {
    const newTableData = Array.from({ length: newRows }, () =>
      Array.from({ length: newCols }, () => ({
        value: "",
        hAlign: "left", // Default horizontal alignment
        vAlign: "top", // Default vertical alignment
      }))
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
    updatedData[rowIdx][colIdx].value = value;
    setTableData(updatedData);
  };

  const handleHeaderChange = (colIdx, value) => {
    const updatedHeaders = [...tableHeaders];
    updatedHeaders[colIdx] = value;
    setTableHeaders(updatedHeaders);
  };

  const createTableFromGrid = () => {
    if (selectedRows > 0 && selectedCols > 0) {
      setRows(selectedRows);
      setCols(selectedCols);
      adjustTableData(selectedRows, selectedCols);
      setIsTableCreated(true);
    } else {
      alert("Please select a valid number of rows and columns.");
    }
  };

  const addColumn = () => {
    const newHeaders = [...tableHeaders, `Header ${tableHeaders.length + 1}`];
    const newData = tableData.map((row) => [
      ...row,
      { value: "", hAlign: "left", vAlign: "top" },
    ]);
    setTableHeaders(newHeaders);
    setTableData(newData);
  };

  const deleteColumn = (colIdx) => {
    if (tableHeaders.length > 1) {
      const newHeaders = tableHeaders.filter((_, index) => index !== colIdx);
      const newData = tableData.map((row) =>
        row.filter((_, index) => index !== colIdx)
      );
      setTableHeaders(newHeaders);
      setTableData(newData);
    } else {
      alert("Cannot delete the last column.");
    }
  };

  const addRow = () => {
    const newRow = tableHeaders.map(() => ({
      value: "",
      hAlign: "left",
      vAlign: "top",
    }));
    setTableData([...tableData, newRow]);
  };

  const deleteRow = (rowIdx) => {
    if (tableData.length > 1) {
      const newData = tableData.filter((_, index) => index !== rowIdx);
      setTableData(newData);
    } else {
      alert("Cannot delete the last row.");
    }
  };

  const toggleTextWrap = () => {
    setIsTextWrap(!isTextWrap);
  };

  const handleCellDoubleClick = (rowIdx, colIdx) => {
    setSelectedCell({ row: rowIdx, col: colIdx });
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const increaseCellWidth = () => {
    setCellWidth((prevWidth) => prevWidth + 10);
  };

  const increaseCellHeight = () => {
    setCellHeight((prevHeight) => prevHeight + 10);
  };

  const setCellAlignment = (rowIdx, colIdx, alignmentType, alignmentValue) => {
    const updatedData = [...tableData];
    if (alignmentType === "hAlign") {
      updatedData[rowIdx][colIdx].hAlign = alignmentValue;
    } else if (alignmentType === "vAlign") {
      updatedData[rowIdx][colIdx].vAlign = alignmentValue;
    }
    setTableData(updatedData);
  };

  const handleSave = () => {
    // Create a single object that includes all the required data
    const outputData = {
      responses,
      tableData,
      tableHeaders,
    };

    // Convert the combined data to JSON format
    try {
      const jsonOutput = JSON.stringify(outputData, null, 2);
      console.log("Table saved:", jsonOutput); // Logs the JSON formatted output to console
      alert("Table data has been saved and logged to the console.");
    } catch (error) {
      console.error("Error saving the table data:", error);
      alert("An error occurred while saving the table data. Please try again.");
    }
  };

  const handleShare = () => {
    setShowSharePopup(true);
  };

  const handleCloseSharePopup = () => {
    setShowSharePopup(false);
  };

  const shareViaEmail = () => {
    const emailBody = encodeURIComponent(
      "Here is the table data:\n\n" + JSON.stringify({ tableData, tableHeaders }, null, 2)
    );
    window.open(`mailto:?subject=Table Data&body=${emailBody}`, "_blank");
  };

  const shareViaGitHub = () => {
    alert("Sharing via GitHub is not directly supported. Please copy the data and share manually.");
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(
      "Here is the table data:\n\n" + JSON.stringify({ tableData, tableHeaders }, null, 2)
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const shareViaMessage = () => {
    alert("Sharing via SMS or messages may not be supported directly from a web browser.");
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
              <td
                key={colIdx}
                style={{
                  textAlign: cell.hAlign,
                  verticalAlign: cell.vAlign,
                }}
              >
                <input
                  type="text"
                  value={cell.value}
                  onChange={(e) =>
                    handleCellChange(rowIdx, colIdx, e.target.value)
                  }
                  onDoubleClick={() => handleCellDoubleClick(rowIdx, colIdx)}
                  style={{
                    width: `${cellWidth}px`,
                    height: isTextWrap ? "auto" : `${cellHeight}px`,
                    whiteSpace: isTextWrap ? "normal" : "nowrap",
                    overflowWrap: isTextWrap ? "break-word" : "normal",
                    textAlign: hAlign,
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
      <div className="table-ms">
        <h4>Create Table</h4>

        {!isTableCreated && (
          <div className="manual-input">
            <h4>Enter No. of Rows and Columns Manually:</h4>
            <label className="fields">
              <div>Rows:</div>
              <input
                type="number"
                name="rows"
                value={manualInput.rows}
                onChange={handleManualInputChange}
                min="1"
              />
            </label>
            <br />
            <label className="fields">
              <div>Columns: </div>
              <input
                type="number"
                name="cols"
                value={manualInput.cols}
                onChange={handleManualInputChange}
                min="1"
              />
            </label>
            <div className="table-WH">
              <label className="fields">
                <div>Cell Width:</div>
                <input
                  type="number"
                  value={cellWidth}
                  onChange={(e) => setCellWidth(parseInt(e.target.value) || 10)}
                  min="10"
                />
              </label>
              <label className="fields">
                <div>Cell Height:</div>
                <input
                  type="number"
                  value={cellHeight}
                  onChange={(e) =>
                    setCellHeight(parseInt(e.target.value) || 10)
                  }
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
              Selected: Rows {selectedRows} x Columns {selectedCols}
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
                        row < selectedRows && col < selectedCols
                          ? "selected"
                          : ""
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
          <div className="generated-table">
            {renderTable()}
            <div className="action-buttons">
              <div className="action-buttons-2">
              <button onClick={handleSave}>Save</button>
              <button onClick={handleShare}>Share</button>
              </div>
            </div>
          </div>
        )}

         {/* Share Popup Modal */}
      {showSharePopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Share Table Data</h3>
            <button onClick={shareViaEmail}>Share via Email</button>
            <button onClick={shareViaGitHub}>Share via GitHub</button>
            <button onClick={shareViaWhatsApp}>Share via WhatsApp</button>
            <button onClick={shareViaMessage}>Share via Message</button>
            <button onClick={handleCloseSharePopup}>Close</button>
          </div>
        </div>
      )}

      {/* Popup CSS */}
      <style jsx>{`
        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
        .popup-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        button {
          margin: 5px 0;
        }
      `}</style>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>Cell Options</h3>
              <button onClick={toggleTextWrap}>
                {isTextWrap ? "Disable Text Wrap" : "Enable Text Wrap"}
              </button>
              <button onClick={addRow}>Add Row</button>
              <button onClick={addColumn}>Add Column</button>
              <button onClick={() => deleteRow(selectedCell.row)}>
                Delete Row
              </button>
              <button onClick={() => deleteColumn(selectedCell.col)}>
                Delete Column
              </button>
              <button onClick={increaseCellWidth}>Increase Cell Width</button>
              <button onClick={increaseCellHeight}>Increase Cell Height</button>

              {/* Horizontal Alignment Options */}
              <div>
                <h4>Horizontal Alignment</h4>
                <button onClick={() => setHAlign("left")}>Left</button>
                <button onClick={() => setHAlign("center")}>Center</button>
                <button onClick={() => setHAlign("right")}>Right</button>
              </div>

              {/* Vertical Alignment Options */}
              <div>
                <h4>Vertical Alignment</h4>
                <button
                  onClick={() =>
                    setCellAlignment(
                      selectedCell.row,
                      selectedCell.col,
                      "vAlign",
                      "top"
                    )
                  }
                >
                  Top
                </button>
                <button
                  onClick={() =>
                    setCellAlignment(
                      selectedCell.row,
                      selectedCell.col,
                      "vAlign",
                      "middle"
                    )
                  }
                >
                  Middle
                </button>
                <button
                  onClick={() =>
                    setCellAlignment(
                      selectedCell.row,
                      selectedCell.col,
                      "vAlign",
                      "bottom"
                    )
                  }
                >
                  Bottom
                </button>
              </div>

              <button onClick={handlePopupClose}>Close</button>
            </div>
          </div>
        )}

        <style jsx>{`
          .popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            z-index: 1000;
            border-radius: 8px;
          }
          .popup-content {
            display: flex;
            flex-direction: column;
          }
          .popup-content button {
            margin: 5px 0;
          }
          .table-creator {
            padding: 20px;
            font-family: Arial, sans-serif;
          }
          .manual-input,
          .grid-selection,
          .generated-table {
            margin-bottom: 20px;
          }
          .grid {
            display: grid;
            grid-template-rows: repeat(10, 20px);
            grid-template-columns: repeat(10, 20px);
            gap: 2px;
            margin-bottom: 10px;
          }
          .grid-row {
            display: contents;
          }
          .grid-cell {
            width: 20px;
            height: 20px;
            background: #f0f0f0;
            border: 1px solid #ccc;
            cursor: pointer;
          }
          .grid-cell.selected {
            background: #add8e6;
          }
          .action-buttons {
            margin-top: 10px;
          }
          .action-buttons button {
            margin-right: 10px;
          }
          table {
            border-collapse: collapse;
            width: auto;
          }
          th,
          td {
            border: 1px solid #ccc;
            padding: 5px;
          }
          th input,
          td input {
            border: none;
            outline: none;
            font-size: 14px;
          }
          th input {
            font-weight: bold;
          }
        `}</style>
      </div>
    </div>
  );
};

export default TableCreator;
