import React from "react";
import './Headerintro.css'
import {useNavigate} from 'react-router-dom';

function Header_intro( {onLogin} ){
    const navigate = useNavigate();
    const handleStartClick = () => {
        onLogin(); // App.js에서 전달된 로그인 상태 변경 함수 호출
        navigate("/login");
    }

    return(
        <>
        <section className="Intro-section">
            <div className="Intro-content-left">
                <h3>오랫동안 일기 작성하게 만드는</h3>
                <h1><b>FeelsLike</b></h1>
                <h4>기록이 쉬워지는 순간, 당신의 하루가 특별해집니다.</h4>
                <br/>
                <p>
                    필즈라이크는 사용자가 자신의 감정을 진솔하게 표현하고,<br/>
                    기록의 가치를 지속적으로 경험할 수 있도록 돕는 것을 목표로 하고 있습니다.                   
                </p>
            </div>
            <div className="Intro-content-right">
                <div className="button-wrapper">
                    <button className="start-btn" onClick={handleStartClick}>시작하기</button>
                </div>
            </div>
        </section>
        <div className="wave-bottom">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 250">
                <path fill="#FDFCDC" d="M0,128C480,0 780,250 1440,128V320H0V128Z" transform="rotate(180 720 128)"/>
            </svg>
        </div>
    </>
    );
}

export default Header_intro;