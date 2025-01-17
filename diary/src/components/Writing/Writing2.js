import React, { useState } from "react";
import "./Writing2.css";
import Paper from "./Paper";
import Writing from "./Writing";
import Square from "./Square";
import Circle from "./Circle";

function Writing2() {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedPaperData, setSelectedPaperData] = useState({});

  const data = [
    {
      img: <img src={require("../../assets/book.png")} className="paper-img" />,
      name: "일상일기",
      line1: "오늘 하루 있었던 일들을",
      line2: "자유롭게 기록하고",
      line3: "마음껏 기록해 보세요!",
    },
    {
      img: <img src={require("../../assets/book2.png")} className="paper-img" />,
      name: "질문일기",
      line1: "오늘 하루, 궁금한 질문에 답해보세요.",
      line2: "그 속에서 나만의 이야기를",
      line3: "발견할 수 있을 거예요.",
    },
    {
      img: (
        <img
          src={require("../../assets/books.png")}
          className="paper-img"
          style={{ width: "115px", height: "80px" }}
        />
      ),
      name: "일상일기 & 질문일기",
      line1: "오늘의 생각을 일기로 자유롭게 적고,",
      line2: "그와 함께 궁금한 질문에 답하며",
      line3: "하루를 더욱 특별하게 만들어보세요.",
    },
  ];
  return (
    <div>
      <Writing>
        <div className="wr-row">
          <Circle number="1" isActive={true} />
          <Circle number="2" isActive={true} />
        </div>
        <h1 className="wr-h1">Q. 오늘은 어떤 일기를 작성하고 싶나요?</h1>
        <div className="wr-row">
          {data.map((item, index) => (
            <Paper
              key={index}
              img={item.img}
              name={item.name}
              line1={item.line1}
              line2={item.line2}
              line3={item.line3}
              isSelected={selectedPaper === index}
              onClick={() => {
                setSelectedPaper(index);
                setSelectedPaperData(item);
              }}
            />
          ))}
        </div>
        <button className="wr-orange-button">완료</button>
      </Writing>
      <Square />
    </div>
  );
}

export default Writing2;
