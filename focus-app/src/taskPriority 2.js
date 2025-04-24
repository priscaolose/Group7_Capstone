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
  const isSmallScreen = window.innerWidth <= 900; // You can also use a hook or prop for this

  const options = [
    { value: "high", label: "High", color: "#ff7866", icon: faExclamationCircle },
    { value: "medium", label: "Medium", color: "#ff7866", icon: faExclamationTriangle },
    { value: "low", label: "Low", color: "#ff7866", icon: faInfoCircle },
    { value: "none", label: "None", color: "#ff7866", icon: faCircle },
  ];

  const formatOptionLabel = ({ label, icon, color }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FontAwesomeIcon icon={icon} style={{ marginRight: "8px", color }} />
      {label}
    </div>
  );

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    onChange({
      target: {
        name: name,
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: isSmallScreen ? "100%" : "250px", // Full width on small screens
      borderRadius: "10px",
      textAlign: "center",
      border: "1px solid #ccc",
      fontSize: isSmallScreen ? "16px" : "18px", // Smaller font on small screens
      fontWeight: "bold",
      padding: isSmallScreen ? "10px" : "15px", // Less padding on small screens
      boxShadow: "none",
      borderRadius: "10px",
      color: "#1059a2",
      backgroundImage: !selectedValue
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
      width: isSmallScreen ? "100%" : "250px", // Full width on small screens
      backgroundImage: selectedValue
        ? "none"
        : "linear-gradient(to bottom, #FFF1F1, #E2EAF1)",
      maxHeight: isSmallScreen ? "150px" : "auto", // Limit height on small screens
      overflowY: "auto", // Enable vertical scrolling
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: isSmallScreen ? "120px" : "300px", // Control the height of the menu list
      overflowY: "auto", // Enable vertical scrolling
      "&::-webkit-scrollbar": {
        width: "6px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#c1c1c1",
        borderRadius: "4px",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: isSmallScreen ? "16px" : "20px", // Smaller placeholder on small screens
    }),
  };

  return (
    <div style={{ width: isSmallScreen ? "100%" : "auto" }}>
      <Select
        value={selectedValue}
        onChange={handleChange}
        styles={customStyles}
        options={options}
        placeholder={
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faFlag}
              size="sm"
              style={{ 
                marginRight: "8px", 
                color: selectedValue ? selectedValue.color : "red" 
              }}
            />
            <span style={{ 
              fontSize: isSmallScreen ? "16px" : "20px", 
              fontWeight: "bold",
            }}>
              Task Priority
            </span>
          </div>
        }
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
};

export default PriorityDropdown;