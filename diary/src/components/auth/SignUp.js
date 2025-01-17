import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    birth: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 유효성 검사 함수
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "이메일 형식이 올바르지 않습니다.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    if (!formData.nickname) {
      newErrors.nickname = "닉네임을 입력해주세요.";
    }

    if (!formData.birth) {
      newErrors.birth = "생년월일을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 회원가입 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setLoading(true);

      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.code === 1) {
          // 성공
          setSignupSuccess(true);
          console.log("회원가입 성공:", data);

          // 1초 후에 로그인 페이지로 이동
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          // 실패 (이메일 중복, 닉네임 중복 등)
          setSignupSuccess(false);
          setErrors((prev) => ({
            ...prev,
            apiError: data.msg,
          }));
        }
      } catch (error) {
        console.error("회원가입 에러:", error);
        setSignupSuccess(false);
        setErrors((prev) => ({
          ...prev,
          apiError: "회원가입 중 오류가 발생했습니다.",
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="wrapper">
      <div className="box-container">
        <div className="container">
          <h1 className="title">회원가입</h1>
          <p className="sub-title">회원정보를 입력해 주세요.</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="label">이메일</label>
              <input
                className="input"
                name="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
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
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="input-group">
              <label className="label">닉네임</label>
              <input
                className="input"
                name="nickname"
                placeholder="닉네임을 입력해주세요."
                value={formData.nickname}
                onChange={handleChange}
              />
              {errors.nickname && <p className="error">{errors.nickname}</p>}
            </div>
            <div className="input-group">
              <label className="label">생년월일</label>
              <input
                className="input"
                name="birth"
                type="date"
                value={formData.birth}
                onChange={handleChange}
              />
              {errors.birth && <p className="error">{errors.birth}</p>}
            </div>

            {errors.apiError && <p className="error">{errors.apiError}</p>}
            {signupSuccess && (
              <p className="success">
                회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.
              </p>
            )}

            <button
              className="signup-submit-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "회원가입 중..." : "회원가입"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
