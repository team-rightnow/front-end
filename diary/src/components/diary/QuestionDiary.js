import React, { useState, useEffect } from "react";
import "./QuestionDiary.css";

const QuestionDiary = () => {
  const [content, setContent] = useState("");
  const [questionContent, setQuestionContent] = useState(""); // 추가
  const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsTimeUp(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ content });
  };

  const handleContentChange = (e) => {
    if (!isTimeUp) {
      setContent(e.target.value);
    }
  };

  return (
    <div className="diary-write-container">
      <nav className="nav-bar">
        <div className="logo">FeelsLike</div>
        <div className="nav-items">
          <span>About Us</span>
          <span>Contact Us</span>
          <span>Logout</span>
          <span>My Page</span>
        </div>
      </nav>

      <div className="yellow-background">
        <div className="diary-write-content">
          <h1>질문 일기</h1>
          <p className="sub-text">
            오늘의 질문, 나만의 답변으로 하루를 기록해요.
          </p>

          <div className={`diary-card ${isTimeUp ? "disabled" : ""}`}>
            <div className="card-header">
              <div className="question-text">
                Q. 요즘 빠져있는 책 이름과 그 이유는?
              </div>
              <div className="timer">{formatTime(timeLeft)}</div>
            </div>
            <textarea
              value={content}
              onChange={handleContentChange}
              placeholder="내용을 입력해주세요"
              className="content-input"
              disabled={isTimeUp}
            />
          </div>

          <div className="form-footer">
            <button
              onClick={handleSubmit}
              className="submit-btn"
              disabled={isTimeUp && !content}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDiary;
