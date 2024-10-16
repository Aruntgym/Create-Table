import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import TableCreation from "./components/TableCreation";
import DynamicTable from "./components/DynamicTable";
import "./App.css"; // Add some global styles

const App = () => {
  const [selectedOption, setSelectedOption] = useState("table");
  const [tableData, setTableData] = useState({
    rows: 0,
    columns: 0,
    includeHeader: false,
  });

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleCreateTable = (rows, columns, includeHeader) => {
    setTableData({ rows, columns, includeHeader });
  };

  return (
    <div className="app">
      <Sidebar onOptionSelect={handleOptionSelect} />
      <div className="content">
        {selectedOption === "table" && (
          <TableCreation onCreateTable={handleCreateTable} />
        )}
        {tableData.rows > 0 && tableData.columns > 0 && (
          <DynamicTable {...tableData} />
        )}
      </div>
    </div>
  );
};

export default App;

