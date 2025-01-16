import React, { useState } from "react";
import "./List.css";

function List() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="list-container">
      <div className="row">
        <p className="list-text" style={{width:"150px"}}>2024.11.24</p>
        <p className="list-text" style={{width:"500px"}}>연필</p>
        <input 
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}

export default List;
