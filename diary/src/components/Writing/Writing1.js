import React, { useState } from "react";
import "./Writing1.css";
import { Link } from "react-router-dom";
import Writing from "./Writing";
import Circle from "./Circle";
import Square from "./Square";

function Writing1() {
  const [temp, setTemp] = useState(20);
  const [diffX, setDiffX] = useState(200);

  return (
    <>
      <Writing>
        <div className="wr-row">
          <Circle number="1" isActive={true} />
          <Circle number="2" isActive={false} />
        </div>
        <h1 className="wr-h1">Q. 오늘 당신의 하루는 몇 도 인가요?</h1>
        <h2 className="wr-h2">온도 커서를 움직여서 설정해요.</h2>
        <div>
          <div className="wr-row">
            <Square color="#1343a9"/>
            <Square color="#1A59A6"/>
            <Square color="#226DA3"/>
            <Square color="#267BA1"/>
            <Square color="#479596"/>
            <Square color="#83C282"/>
            <Square color="#A3D977"/>
            <Square color="#B7BF64"/>
            <Square color="#D59A49"/> 
            <Square color="#F3712D"/>
            <Square color="#F65D36"/>
            <Square color="#F94443"/>
          </div>
          <div
            className="wr-cursor"
            onPointerDown={(e) => {
              const initX = e.clientX;
              const dragMove = (e) => {
                const newDiffX = diffX + e.clientX - initX;
                const boundedDiffX = Math.max(-10, Math.min(410, newDiffX));
                setDiffX(boundedDiffX);
                const newTemp = Math.round(-9 + (boundedDiffX / 420) * 60);
                setTemp(newTemp);
              };
              const dragEnd = () => {
                document.removeEventListener("pointermove", dragMove);
              };
              document.addEventListener("pointermove", dragMove);
              document.addEventListener("pointerup", dragEnd, { once: true });
            }}
            style={{ transform: `translateX(${diffX}px)` }}
          ></div>
        </div>
        <h3 className="wr-h3">오늘은 {temp} ℃입니다.</h3>
        <Link to="/writing2"><button className="wr-orange-button">다음</button></Link>
      </Writing>
    </>
  );
}

export default Writing1;
