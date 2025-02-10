import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTags, 
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const SortByDropDown = () => {
  const [selectedValue, setSelectedValue] = useState(null); 

  const options = [
    { value: 'title', label: 'Task Name' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'completed', label: 'Completed' },
  ];

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  };

  const formatOptionLabel = ({ label, icon, color }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FontAwesomeIcon icon={icon} style={{ marginRight: "8px", color }} /> 
      {label}
    </div>
  );

  const customStyles = {
    control: (provided) => ({
      ...provided,
      
      width: "150px",
      borderRadius: "10px",
      textAlign: "center",
      border: "1px solid #ccc",
      fontSize: "18px",
      fontWeight: "bold",
      padding: "15px",
      boxShadow: "none",
      color: "#1059a2",
    }),
    option: (provided) => ({
      ...provided,
      color: "blue",
    }),
    menu: (provided) => ({
      ...provided,
      width: "250px",
      marginTop: 0,
    }),
  };

  return (
    <div>
      <Select
        value={selectedValue}
        onChange={handleChange}
        styles={customStyles}
        options={options}
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
};

export default SortByDropDown;