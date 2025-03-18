import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faCircle,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const PriorityDropdown = ({ name, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const options = [
    { value: "high", label: "High", color: "#FF6666", icon: faExclamationCircle },
    { value: "medium", label: "Medium", color: "#FFB266", icon: faExclamationTriangle },
    { value: "low", label: "Low", color: "#FFFF99", icon: faInfoCircle },
    { value: "none", label: "None", color: "#C8FACD", icon: faCircle },
  ];
  const formatOptionLabel = ({ label, icon, color }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FontAwesomeIcon icon={icon} style={{ marginRight: "8px", color }} /> {/* Dynamic color */}
      {label}
    </div>
  );

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    onChange({
      target: {
        name: name,
        value: selectedOption ? selectedOption.value : "", },
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "250px",
      borderRadius: "10px",
      textAlign: "center",
      border: "1px solid #ccc",
      fontSize: "18px",
      fontWeight: "bold",
      padding: "15px",
      boxShadow: "none",
      borderRadius: "10px",
      color: "#1059a2",
      backgroundImage: !selectedValue // Apply gradient if no option is selected
        ? "linear-gradient(to bottom, #FFF1F1, #E2EAF1)"
        : "none",
      backgroundColor: selectedValue ? "white" : "transparent",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "blue",
      backgroundColor: state.isSelected
      ? options.find((opt) => opt.value === state.value)?.color || "#FFFFFF"
      : "transparent",
      }),
  
    menu: (provided) => ({
      ...provided,
      width: "250px",
      backgroundImage: selectedValue
    ? "none"
    : "linear-gradient(to bottom, #FFF1F1, #E2EAF1)",
    }),
  };
  return (
    <div>
      <Select
        value={selectedValue}
        onChange={handleChange}
        styles={customStyles}
        options={options}
        placeholder={
        <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon  icon={faFlag}   size="sm" style={{ marginRight: "8px",color: selectedValue ? selectedValue.color : "red" }} />
            <span style={{ fontSize: "20px",fontWeight: "bold",}}>Task Priority</span> {/* Reduced font size */}
        </div>
        }
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
};

export default PriorityDropdown;