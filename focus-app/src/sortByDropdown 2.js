import React, { useState,useEffect,useRef } from "react";

const SortByDropDown = ({filteredTasks,setFilteredTasks}) => {
  const [selectedFilter,setSelectedFilter] = useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([]);
  const navbarRef = useRef(null);
  const today = new Date();

  const unSelectFilter = () =>
  {
     setFilteredTasks(filteredTasks);
     setSelectedFilter("");
   }


  const sortByDueDate = () => {
    console.log("selectedFilter",selectedFilter);
    if(selectedFilter === "dueDate"){
      unSelectFilter();
    }
    else{
      const sortedTasks = [...filteredTasks].sort((a, b)   => {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime(): Infinity
        const dateB = b.dueDate? new Date(b.dueDate).getTime(): Infinity
        return dateA - dateB;
      });
      setFilteredTasks(sortedTasks);
      setSelectedFilter("dueDate");
    }
  };

 
  const sortAlphabetically = () => {
    if(selectedFilter === "alphabetically"){
      unSelectFilter();
    }
    else
    {
      const nextWeekTasks = [...filteredTasks].sort((a, b)   => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return titleA.localeCompare(titleB)
      });
        setFilteredTasks(nextWeekTasks);
        setSelectedFilter("alphabetically");
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
      <i className="fa-solid fa-sort"></i>
        <span> Sort </span> 
      </button>
    </div>
  
    <div className={`filterbar filterbar-menu ${isOpen ? "is-active" : ""}`}>
      <div className="filterbar-end">
        <div className={`filterbar-item ${selectedFilter ==="dueDate" ?"selected": ""}`}
        //have a way to check if it is selected and if it is and you click on it again, it takes off the selection and keep it to all tasks
        onClick={sortByDueDate
        }>
         Due Date {selectedFilter === "dueDate" && "✔️"}
        </div>
        <div className={`filterbar-item ${selectedFilter ==="alphabetically" ?"selected": ""}`}
         onClick={sortAlphabetically}>
          Alphabetical  {selectedFilter === "alphabetically" && "✔️"}
        </div>
      </div>
    </div>
  </nav>  
  );
};

export default SortByDropDown;