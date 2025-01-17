import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DualDiaryWrite.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">일기 쓰기</div>
      <nav className="sidebar-nav">
        <Link to="/diary/write" className="sidebar-link">
          일상 일기
        </Link>
        <Link to="/diary/question" className="sidebar-link">
          질문 일기
        </Link>
        <Link to="/diary/dual" className="sidebar-link active">
          질문&일상 일기
        </Link>
      </nav>
    </div>
  );
};

const DualDiaryWrite = () => {
  const navigate = useNavigate();
  // 일상 일기 상태
  const [title, setTitle] = useState("");
  const [dailyContent, setDailyContent] = useState("");
  const [image, setImage] = useState(null);

  // 질문 일기 상태
  const [questionContent, setQuestionContent] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 3분 = 180초
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // API 관련 상태
  const [acornCount, setAcornCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 타이머 설정
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsTimeUp(true);
      setShowModal(true);
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

  const handleImageChange = (e) => {
    if (!isTimeUp) {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      }
    }
  };

  // 일기 제출 처리
  const handleDualDiarySubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", dailyContent);
      formData.append("questionContent", questionContent);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("/api/diary/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
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

  const handleDailySubmit = (e) => {
    e.preventDefault();
    handleDualDiarySubmit();
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    handleDualDiarySubmit();
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
                  onChange={(e) =>
                    !isTimeUp && setQuestionContent(e.target.value)
                  }
                  placeholder="내용을 입력해주세요"
                  className="question-content-input"
                  disabled={isTimeUp}
                />
              </div>
              <div className="question-footer">
                <button
                  onClick={handleQuestionSubmit}
                  className="submit-btn"
                  disabled={(isTimeUp && !questionContent) || loading}
                >
                  {loading ? "제출 중..." : "완료"}
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
                  className="daily-content-input"
                  disabled={isTimeUp}
                />
                <div className="form-footer">
                  <label
                    className={`image-upload ${isTimeUp ? "disabled" : ""}`}
                  >
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
                    disabled={isTimeUp || loading}
                  >
                    {loading ? "제출 중..." : "완료"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

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

export default DualDiaryWrite;
