import React from "react";
import './Circle.css';

function Circle({ number, isActive }) {
  return (
    <p className={`circle ${isActive ? 'active' : ''}`}>
      {number}
    </p>
  );
}

export default Circle;