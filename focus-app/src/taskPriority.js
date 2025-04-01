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
    { value: "high", label: "High", color: "#d166ff", icon: faExclamationCircle },
    { value: "medium", label: "Medium", color: "#d166ff", icon: faExclamationTriangle },
    { value: "low", label: "Low", color: "#d166ff", icon: faInfoCircle },
    { value: "none", label: "None", color:"#d166ff", icon: faCircle },
  ];
  const formatOptionLabel = ({ label, icon, color }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FontAwesomeIcon icon={icon} style={{ marginRight: "8px", color:"#d166ff" }} />
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
      color: "#d166ff",
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
      maxHeight: "200px", 
      overflowY: "auto",
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
            <FontAwesomeIcon  icon={faFlag}   size="sm" style={{ marginRight: "8px",color: selectedValue ? selectedValue.color :  "#d166ff" }} />
            <span style={{ fontSize: "20px",fontWeight: "bold",}}>Task Priority</span> {/* Reduced font size */}
        </div>
        }
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
};

export default PriorityDropdown;