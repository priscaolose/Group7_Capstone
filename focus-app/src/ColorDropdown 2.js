import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGraduationCap,
  faBriefcase,
  faUsers,
  faHome,
  faEllipsisH,
  faFlag,
  faTags, 
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const ColorDropdown = ({ name, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(null); // Initialize to `null`

  const options = [
    { value: "personal", label: "Personal", color:  "#ff7866", icon: faUser },
    { value: "academic", label: "Academic", color:  "#ff7866", icon: faGraduationCap },
    { value: "career", label: "Career", color:  "#ff7866", icon: faBriefcase },
    { value: "social", label: "Social", color:  "#ff7866", icon: faUsers },
    { value: "household", label: "Household Activities", color: "#ff7866", icon: faHome },
    { value: "miscellaneous", label: "Miscellaneous", color: "#ff7866", icon: faEllipsisH },
  ];

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    onChange({
      target: {
        name: name,
        value: selectedOption ? selectedOption.value : "",
      },
    });
  };

  const formatOptionLabel = ({ label, icon, color }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <FontAwesomeIcon icon={icon} style={{ marginRight: "8px", color }} /> {/* Dynamic color */}
      {label}
    </div>
  );

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
            <FontAwesomeIcon
              icon={faTags}
              size="sm"
              style={{ marginRight: "8px", color: selectedValue ? selectedValue.color : "red" }}
            />
            <span style={{ fontSize: "20px", fontWeight: "bold" }}>Task Category</span>
          </div>
        }
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
};

export default ColorDropdown;