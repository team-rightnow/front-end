import React, { useState, useEffect } from "react";
import "./DualDiaryWrite.css";

const DualDiaryWrite = () => {
  // 일상 일기 상태
  const [title, setTitle] = useState("");
  const [dailyContent, setDailyContent] = useState("");
  const [image, setImage] = useState(null);

  // 질문 일기 상태
  const [questionContent, setQuestionContent] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 타이머 설정
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsTimeUp(true);
      setShowModal(true); // 시간 종료 시 모달 표시
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleImageChange = (e) => {
    if (!isTimeUp) {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      }
    }
  };

  const handleDailySubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    // 일상 일기 제출 로직
    console.log({ title, dailyContent, image });
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    // 질문 일기 제출 로직
    console.log({ questionContent });
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

      {/* 질문 일기 섹션 */}
      <div className="yellow-background">
        <div className="diary-write-content">
          <h1>질문&일상 일기</h1>
          <p className="sub-text">지금까지 나의 일상을 기록해요.</p>

          <div className={`diary-card ${isTimeUp ? "disabled" : ""}`}>
            <div className="card-header">
              <div className="question-text">
                Q. 요즘 빠져있는 책 이름과 그 이유는?
              </div>
              <div className="timer">{formatTime(timeLeft)}</div>
            </div>
            <textarea
              value={questionContent}
              onChange={(e) => !isTimeUp && setQuestionContent(e.target.value)}
              placeholder="내용을 입력해주세요"
              className="content-input"
              disabled={isTimeUp}
            />
          </div>
          <div className="question-footer">
            <button
              onClick={handleQuestionSubmit}
              className="submit-btn"
              disabled={isTimeUp && !questionContent}
            >
              완료
            </button>
          </div>
        </div>
      </div>

      {/* 일상 일기 섹션 */}
      <div className="white-background">
        <div className="diary-write-content">
          <div className="regular-diary-form">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해주세요"
              className="title-input"
              disabled={isTimeUp}
            />
            <textarea
              value={dailyContent}
              onChange={(e) => setDailyContent(e.target.value)}
              placeholder="내용을 입력해주세요"
              className="content-input regular"
              disabled={isTimeUp}
            />
            <div className="form-footer">
              <label className={`image-upload ${isTimeUp ? "disabled" : ""}`}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  disabled={isTimeUp}
                />
                <span className="upload-btn">사진 첨부</span>
              </label>
              <button
                onClick={handleDailySubmit}
                className="submit-btn"
                disabled={isTimeUp}
              >
                완료
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 작성 완료 모달 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-title">작성 완료</div>
            <div className="modal-text">도토리 5개가 적립되었습니다.</div>
            <div className="modal-text">현재 도토리 개수: 10개</div>
            <button onClick={handleCloseModal} className="modal-button">
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DualDiaryWrite;
