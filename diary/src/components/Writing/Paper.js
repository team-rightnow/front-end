import React from "react";
import "./Paper.css";

const Paper = ({ isSelected, onClick, img, name, line1, line2, line3 }) => {
  return (
    <button
      className="paper-button"
      style={{
        border: isSelected ? "7px solid #F4A261" : "none",
      }}
      onClick={onClick}
    >
      {img}
      <div className="paper-name">{name}</div>
      <div className="paper-line">{line1}</div>
      <div className="paper-line">{line2}</div>
      <div className="paper-line">{line3}</div>
    </button>
  );
};

export default Paper;
