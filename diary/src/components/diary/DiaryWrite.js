import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./DiaryWrite.css";

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

const DiaryWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch("/api/diary/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT 토큰
        },
        body: formData,
      });

      const data = await response.json();

      if (data.code === 1) {
        // 성공
        console.log("일기 작성 성공:", data);
        navigate("/diary/list"); // 일기 목록 페이지로 이동
      } else {
        // 실패
        setError(data.msg || "일기 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("일기 작성 에러:", error);
      setError("일기 작성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
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

      <div className="yellow-banner">
        <h1>일상 일기</h1>
        <p>자유롭게 나의 일상을 기록해요.</p>
        <div className="title-input-container">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
            className="title-input"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="diary-form">
        <div className="content-container">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요."
            className="content-input"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="button-container">
          <label className="image-upload-btn">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            사진 첨부
          </label>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "작성 중..." : "완료"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiaryWrite;
