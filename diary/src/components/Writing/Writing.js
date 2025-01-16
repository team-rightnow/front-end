import React from "react";
import "./Writing.css";

function Writing({ children }) {
  return (
    <div>
      <div className="orange-back"></div>
      <div className="wr-box">{children}</div>
    </div>
  );
}

export default Writing;
