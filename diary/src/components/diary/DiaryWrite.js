import React, { useState } from "react";
import "./DiaryWrite.css";

const DiaryWrite = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, content, image });
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
          <h1>일상 일기</h1>
          <p className="sub-text">자유롭게 나의 일상을 기록해요.</p>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
            className="title-input"
          />
        </div>
      </div>

      <div className="white-background">
        <div className="diary-write-content">
          <form onSubmit={handleSubmit} className="diary-form">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해주세요."
              className="content-input"
            />

            <div className="form-footer">
              <label className="image-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <span className="upload-btn">사진첨부</span>
              </label>

              <button type="submit" className="submit-btn">
                완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiaryWrite;
