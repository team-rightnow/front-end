import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { id, password, saveId });
  };

  return (
    <div className="wrapper">
      <header className="header">
        <div className="logo">FeelsLike</div>
        <nav className="nav">
          <a href="#" className="nav-link">
            About Us
          </a>
          <a href="#" className="nav-link">
            Contact Us
          </a>
        </nav>
      </header>

      <div className="box-container">
        <div className="container">
          <h1 className="title">로그인</h1>
          <p className="sub-title">필즈라이크와 기록의 가치를 같이 느껴요.</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="label">아이디 (이메일)</label>
              <input
                className="input"
                type="text"
                placeholder="아이디를 입력해주세요."
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="label">비밀번호</label>
              <input
                className="input"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="checkbox-container">
              <input
                className="checkbox"
                type="checkbox"
                checked={saveId}
                onChange={(e) => setSaveId(e.target.checked)}
                id="saveId"
              />
              <label className="checkbox-label" htmlFor="saveId">
                아이디 저장
              </label>
              <div className="find-links">
                <a href="#" className="find-link">
                  아이디 찾기
                </a>
                <a href="#" className="find-link">
                  비밀번호 찾기
                </a>
              </div>
            </div>

            <button className="login-button" type="submit">
              로그인
            </button>
            <Link className="signup-button" to="/signup">
              회원가입
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
