import React, { useState, useRef, useEffect } from "react";
import "../CSSFolders/viewTask.css";
const FilterByIcon = ({filteredTasks,setFilteredTasks}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  console.log("filtered tasks: " , filteredTasks)
  const today = new Date();
 
  const singleMonths= ["Jan", "Feb","Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep",]
  const convertToProperDate = (date)=> {
    let properDateForm;
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const Day = day<10? `0${day}`:day;
    if( month in singleMonths){
      properDateForm = `${year}-0${month+1}-${Day}`
    }else{
      properDateForm = `${year}-${month+1}-${Day}`
    }
    return properDateForm;
  }

  const  handleTodayTask = () => {
      let properDateForm = convertToProperDate(today);
      console.log("today: " , properDateForm)
      const todaysTasks = filteredTasks.filter(task => {
        return task.dueDate === properDateForm
      })
    setFilteredTasks(todaysTasks);
  };

 
  const handleNextWeekTask = () => {
    let today = new Date();
    let nextWeekStartDate = new Date(today);
    nextWeekStartDate.setDate(today.getDate() + 7);
    let nextWeekEndDate= new Date(nextWeekStartDate);
    nextWeekEndDate.setDate(nextWeekStartDate.getDate() + 6);

    const properStartWeekForm = convertToProperDate(nextWeekStartDate);
    const properEndWeekForm = convertToProperDate(nextWeekEndDate);
    const nextWeekTasks = filteredTasks.filter(task => {
      return task.dueDate >= properStartWeekForm &&  task.dueDate <= properEndWeekForm;
    })
    setFilteredTasks(nextWeekTasks);
  };
  const handleNextMonthTask = () => {
    
    let today = new Date();
    let nextMonthStartDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    console.log("nextMonthStartDate", nextMonthStartDate);
    let nextMonthEndDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    console.log("nextMonthEndDate", nextMonthEndDate);
    const properStartMonthForm = convertToProperDate(nextMonthStartDate);
    const properEndMonthForm = convertToProperDate(nextMonthEndDate);
    console.log(" properStartMonthForm",  properStartMonthForm);
    console.log(" properEndMonthForm", properEndMonthForm);

    const nextMonthTasks = filteredTasks.filter(task => 
      task.dueDate >= properStartMonthForm && task.dueDate <= properEndMonthForm
    );
  
    setFilteredTasks(nextMonthTasks);
  };
  
  const toggleFilterIcon = () => setIsOpen(!isOpen);
  const closeFilterIcon = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeFilterIcon();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <nav ref={navbarRef} className="navbar">
      <div className="navbar-brand">
        <button
          className={`navbar-burger ${isOpen ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={toggleFilterIcon}
        >
        <i className="fa-solid fa-filter"></i>
          Filter Tasks
        </button>
      </div>
      
      <div className={`navbar-menu ${isOpen ? "is-active" : ""}`}>
        <div className="navbar-end">
        <div className="navbar-item" onClick={handleTodayTask}>
            Today's Task
          </div>

          <div className="navbar-item" onClick={handleNextWeekTask}>
            Next Week's Task
          </div>

          <div className="navbar-item" onClick={handleNextMonthTask}>
            Next Month's Task
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FilterByIcon;
