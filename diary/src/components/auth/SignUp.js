import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    name: "",
    birthday: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SignUp attempt:", formData);
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
          <h1 className="title">회원가입</h1>
          <p className="sub-title">회원정보를 입력해 주세요.</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="label">아이디 (이메일)</label>
              <input
                className="input"
                name="id"
                placeholder="아이디를 입력해주세요."
                value={formData.id}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label className="label">비밀번호</label>
              <input
                className="input"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label className="label">이름</label>
              <input
                className="input"
                name="name"
                placeholder="이름을 입력해주세요."
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label className="label">생년월일</label>
              <input
                className="input"
                name="birthday"
                placeholder="YY/MM/DD"
                value={formData.birthday}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label className="label">전화번호</label>
              <input
                className="input"
                name="phone"
                placeholder="'-' 없이 숫자만 입력해주세요."
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <button className="signup-submit-button" type="submit">
              회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
