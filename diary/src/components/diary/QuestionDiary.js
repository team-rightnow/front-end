import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./QuestionDiary.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">일기 쓰기</div>
      <nav className="sidebar-nav">
        <Link to="/diary/write" className="sidebar-link">
          일상 일기
        </Link>
        <Link to="/diary/question" className="sidebar-link active">
          질문 일기
        </Link>
        <Link to="/diary/dual" className="sidebar-link">
          질문&일상 일기
        </Link>
      </nav>
    </div>
  );
};

const QuestionDiary = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [questionContent, setQuestionContent] = useState(
    "요즘 빠져있는 책 이름과 그 이유는?"
  );
  const [timeLeft, setTimeLeft] = useState(180);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [acornCount, setAcornCount] = useState(0);
  const [showModal, setShowModal] = useState(false);

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

  // 도토리 개수 조회
  const fetchAcornCount = async () => {
    try {
      const response = await fetch("/api/acorns/acornCount", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.code === 1) {
        setAcornCount(data.data.acornCount);
      }
    } catch (error) {
      console.error("도토리 개수 조회 에러:", error);
    }
  };

  useEffect(() => {
    fetchAcornCount();
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/diary/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          content: content,
          question: questionContent,
          type: "QUESTION",
        }),
      });

      const data = await response.json();

      if (data.code === 1) {
        await fetchAcornCount();
        setShowModal(true);
      } else {
        setError(data.msg || "일기 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("일기 작성 에러:", error);
      setError("일기 작성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (e) => {
    if (!isTimeUp) {
      setContent(e.target.value);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/diary/list");
  };

  return (
    <div className="diary-write-container">
      <nav className="nav-bar">
        <Link to="/" className="logo">
          FeelsLike
        </Link>
        <div className="nav-items">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/logout">Logout</Link>
          <Link to="/mypage">My Page</Link>
        </div>
      </nav>

      <div className="content-with-sidebar">
        <Sidebar />

        <div className="main-content">
          <div className="yellow-background">
            <div className="diary-write-content">
              <h1>질문 일기</h1>
              <p className="sub-text">
                오늘의 질문, 나만의 답변으로 하루를 기록해요.
              </p>

              {error && <p className="error-message">{error}</p>}

              <div className={`diary-card ${isTimeUp ? "disabled" : ""}`}>
                <div className="card-header">
                  <div className="question-text">Q. {questionContent}</div>
                  <div className="timer">{formatTime(timeLeft)}</div>
                </div>
                <textarea
                  value={content}
                  onChange={handleContentChange}
                  placeholder="내용을 입력해주세요"
                  className="question-content-input"
                  disabled={isTimeUp}
                />
              </div>

              <div className="form-footer">
                <button
                  onClick={handleSubmit}
                  className="submit-btn"
                  disabled={(isTimeUp && !content) || loading}
                >
                  {loading ? "저장 중..." : "완료"}
                </button>
              </div>
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
            <div className="modal-text">현재 도토리 개수: {acornCount}개</div>
            <button
              onClick={handleCloseModal}
              className="modal-button"
              disabled={loading}
            >
              {loading ? "처리 중..." : "확인"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDiary;
