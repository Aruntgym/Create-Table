import React from "react";
import "./Sidebar.css"; // Create a CSS file for sidebar styling

const Sidebar = ({ onOptionSelect }) => {
  return (
    <div className="sidebar">
      <h1>Create</h1>
      <div className="sidebar-item" onClick={() => onOptionSelect("table")}>
        <div className="icon">📝</div>
        <span>Table</span>
      </div>
      <div className="sidebar-item" onClick={() => onOptionSelect("form")}>
        <div className="icon">📋</div>
        <span>Form</span>
      </div>
    </div>
  );
};

export default Sidebar; 
