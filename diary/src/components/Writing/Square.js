import React from 'react';
import './Square.css';

function Square({color}) {
    return(
        <div className="square" style={{backgroundColor: color}}></div>
    );
}

export default Square;