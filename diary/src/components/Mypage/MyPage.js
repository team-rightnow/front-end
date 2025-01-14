import "./MyPage.css";
import { useState } from "react";
import Profile from "./assets/defaultProfile.png";
import List from "./List";

function MyPage() {
  
  let name="";
  let profile=Profile;
  const [birth, setBirth] = useState("");
  const [pswd, setPswd] = useState("");
  const [newPswd, setNewPswd] = useState("");
  const [email, setEmail] = useState("");
  const [isOn, setIsOn] = useState(true);

  fetch("/api/users/myPage", {
    method: "GET",
})
    .then((response) => response.json()) 
    .then((data) => {
        name = data.nickname;
        setBirth(data.birth);
        setEmail(data.email);
        if(data.profileImageUrl !== null) profile=data.profileImageUrl;
    })
    .catch((error) => {
        console.error("오류 발생", error);
    });

    const changePswd = () => {
      fetch("/api/users/password", {
        method: "PATCH",
        body: JSON.stringify({nowpassword: pswd, newPassword: newPswd}),
    })
        .then((response) => response.json()) 
        .then((data) => {
            if(data.code===1) alert("비밀번호 변경이 완료되었습니다.");
            else alert("현재 비밀번호가 일치하지 않습니다.");
        })
        .catch((error) => {
            console.error("오류 발생", error);
        });
    }

    const changeBirth = () => {
      fetch("/api/users/birth", {
        method: "PATCH",
        body: JSON.stringify({birth:birth}),
    })
        .then((response) => response.json()) 
        .then((data) => {
            if(data.code===1) alert(data.msg);
        })
        .catch((error) => {
            console.error("오류 발생", error);
        });
    }

  return (
    <>
        <h1 className="myPage">My Page</h1>
        <div className="mp-row" style={{justifyContent: "center"}}>
          {isOn ? (
            <>
              <p className="mp-menu">회원정보</p>
              <p className="mp-menu0" onClick={() => setIsOn(false)}>
                휴지통
              </p>
            </>
          ) : (
            <>
              <p className="mp-menu0" onClick={() => setIsOn(true)}>
                회원정보
              </p>
              <p className="mp-menu">휴지통</p>
            </>
          )}

        </div>
        {isOn ? (
          <div className="mp-box">
            <div className="mp-row2">
              <img className="mp-img"src={profile} />
              <div>
                <div className="mp-row">
                  <p className="mp-text">이름</p>
                  <p className="mp-text">{name}</p>
                </div>
                <div className="mp-row">
                  <p className="mp-text">생년월일</p>
                  <input className="mp-birthinput" type="date" value={birth} onChange={setBirth}></input>
                  <button className="mp-modify" onClick={changeBirth}>수정</button>
                </div>
              </div>
            </div>
            <div>
              <p className="mp-p2">로그인계정</p>
              <div className="mp-row">
                <input className="mp-input" value={email}></input>
                <button className="mp-modify">수정</button>
              </div>
            </div>
            <div>
              <p className="mp-p2">비밀번호 변경</p>
              <input className="mp-input" placeholder="현재 비밀번호" onChange={setPswd}></input>
              <div className="mp-row">
                <input className="mp-input" placeholder="새 비밀번호" onChange={setNewPswd}></input>
                <button className="mp-modify" onClick={changePswd}>수정</button>
              </div>
            </div>
              <button className="mp-complete">완료</button>

          </div>
        ) : (
          <div className="mp-box2">
            <div className="mp-row">
              <p className="mp-table" style={{width: "150px"}}>날짜</p>
              <p className="mp-table" style={{width: "516px"}}>제목</p>
              <button className="mp-delete">삭제</button>
              <button className="mp-delete">복구</button>
            </div>
            <List />
          </div>
        )}
    </>
  );
}

export default MyPage;
