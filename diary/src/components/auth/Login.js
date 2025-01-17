import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // id를 email로 변경
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // API 명세에 맞게 데이터 전송
      });

      const data = await response.json();

      if (data.code === 1) {
        // 로그인 성공
        console.log("로그인 성공:", data);

        // 아이디 저장 처리
        if (saveId) {
          localStorage.setItem("savedEmail", email);
        } else {
          localStorage.removeItem("savedEmail");
        }

        // 사용자 정보 저장
        localStorage.setItem("userId", data.data.userId);
        localStorage.setItem("userEmail", data.data.email);
        localStorage.setItem("userNickname", data.data.nickname);
        localStorage.setItem("userRole", data.data.userRole);

        // 메인 페이지로 이동
        navigate("/");
      } else {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("로그인 에러:", error);
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 저장된 이메일 확인
  React.useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setSaveId(true);
    }
  }, []);

  return (
    <div className="wrapper">
      <div className="box-container">
        <div className="container">
          <h1 className="title">로그인</h1>
          <p className="sub-title">필즈라이크와 기록의 가치를 같이 느껴요.</p>

          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="label">아이디 (이메일)</label>
              <input
                className="input"
                type="email"
                placeholder="아이디를 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {error && <p className="error">{error}</p>}

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
                <Link to="/find-id" className="find-link">
                  아이디 찾기
                </Link>
                <Link to="/find-password" className="find-link">
                  비밀번호 찾기
                </Link>
              </div>
            </div>

            <button className="login-button" type="submit" disabled={loading}>
              {loading ? "로그인 중..." : "로그인"}
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
