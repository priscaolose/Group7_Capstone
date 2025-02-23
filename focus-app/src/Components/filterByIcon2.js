import React, { useState, useRef, useEffect} from "react";
import "../CSSFolders/viewTask.css";

const FilterByIcon = ({filteredTasks,setFilteredTasks}) => {
  const [selectedFilter,setSelectedFilter] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const today = new Date();

  const unSelectFilter = () =>
  {
     setFilteredTasks(filteredTasks);
     setSelectedFilter("");
   }
 
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
    console.log("selectedFilter",selectedFilter);
    if(selectedFilter === "today"){
      unSelectFilter();
    }
    else{
      let properDateForm = convertToProperDate(today);
      const todaysTasks = filteredTasks.filter(task =>  task.dueDate === properDateForm)
    setFilteredTasks(todaysTasks);
    setSelectedFilter("today");
    }
  };

 
  const handleNextWeekTask = () => {
    if(selectedFilter === "next week"){
      unSelectFilter();
    }
    else
    {
        let today = new Date();
        let nextWeekStartDate = new Date(today);
        nextWeekStartDate.setDate(today.getDate() + 7);
        let nextWeekEndDate= new Date(nextWeekStartDate);
        nextWeekEndDate.setDate(nextWeekStartDate.getDate() + 6);
        if(selectedFilter === "today"){

        }
        const properStartWeekForm = convertToProperDate(nextWeekStartDate);
        const properEndWeekForm = convertToProperDate(nextWeekEndDate);
        const nextWeekTasks = filteredTasks.filter(task => {
          return task.dueDate >= properStartWeekForm &&  task.dueDate <= properEndWeekForm;
        })
        setFilteredTasks(nextWeekTasks);
        setSelectedFilter("next week");
    }
  };
  const handleNextMonthTask = () => {
    if(selectedFilter === "next month"){
      unSelectFilter();
    }
    else
    {
      let today = new Date();
      let nextMonthStartDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      let nextMonthEndDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
      const properStartMonthForm = convertToProperDate(nextMonthStartDate);
      const properEndMonthForm = convertToProperDate(nextMonthEndDate);
      const nextMonthTasks = filteredTasks.filter(task => 
        task.dueDate >= properStartMonthForm && task.dueDate <= properEndMonthForm
      );
      setFilteredTasks(nextMonthTasks);
      setSelectedFilter("next month");
    }
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
    <nav ref={navbarRef} className="filterbar">
    <div className="filterbar filter-brand">
      <button
        className={`filterbar filterbar-icon ${isOpen ? "is-active" : ""}`}
        aria-label="menu"
        aria-expanded={isOpen ? "true" : "false"}
        onClick={toggleFilterIcon}
      >
        <i className="fa-solid fa-filter"></i>
        <span> Filter </span> 
      </button>
    </div>
  
    <div className={`filterbar filterbar-menu ${isOpen ? "is-active" : ""}`}>
      <div className="filterbar-end">

        <div className={`filterbar-item ${selectedFilter ==="today" ?"selected": ""}`}
        //have a way to check if it is selected and if it is and you click on it again, it takes off the selection and keep it to all tasks
        onClick={handleTodayTask

        }>
          Today's Task {selectedFilter === "today" && "✔️"}
        </div>
        <div className={`filterbar-item ${selectedFilter ==="next week" ?"selected": ""}`}
         onClick={handleNextWeekTask}>
          Next Week's Task  {selectedFilter === "next week" && "✔️"}
        </div>
        <div className={`filterbar-item ${selectedFilter ==="next month" ?"selected": ""}`}
         onClick={handleNextMonthTask}>
            Next Month's Task {selectedFilter === "next month" && "✔️"}
        </div>
      </div>
    </div>
  </nav>  
  );
};

export default FilterByIcon;
