import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
} from "chart.js";
import Calendar from "react-calendar"; // react-calendar 사용
import "react-calendar/dist/Calendar.css";
import './Dashboard.css';
import "./DiaryCalendar.css";
import user from '../../assets/user.png';
import users from '../../assets/users.png';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler
);

function Dashboard() {
    const navigate = useNavigate();
    const [averageTemp, setAverageTemp] = useState("---°C");
    const [weeklyTemps, setWeeklyTemps] = useState([0, 0, 0, 0, 0, 0, 0]);
    const [period, setPeriod] = useState("");
    const [isCharacterSet, setIsCharacterSet] = useState(false); // 캐릭터 설정 여부 상태
    const [diaryDates, setDiaryDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const API_BASE_URL = "http://localhost:8080/api/statistic/{date}";

    const fetchTemperature = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("JWT 토큰이 없습니다. 로그인이 필요합니다.");
            }

            const response = await fetch(`${API_BASE_URL}/weekly`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP 오류 발생! 상태 코드: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.weeklyData) {
                const temps = data.weeklyData.map((day) => day.temperature);
                setWeeklyTemps(temps);

                const avgTemp = (
                    temps.reduce((sum, temp) => sum + temp, 0) / temps.length
                ).toFixed(1);
                setAverageTemp(`${avgTemp}°C`);

                setPeriod(data.period);
            } else {
                setWeeklyTemps([0, 0, 0, 0, 0, 0, 0]);
                setAverageTemp("---°C");
                setPeriod("기간 정보 없음");
            }
        } catch (error) {
            console.error("온도 데이터를 가져오는 중 오류 발생:", error.message);
            setWeeklyTemps([0, 0, 0, 0, 0, 0, 0]);
            setAverageTemp("---°C");
            setPeriod("기간 정보 없음");
        }
    };

    // 사용자 ID를 기반으로 캐릭터 설정 여부 확인
    const fetchCharacterStatus = async () => {
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId"); // 사용자 ID 가져오기
            if (!token || !userId) {
                throw new Error("로그인이 필요하거나 사용자 ID가 없습니다.");
            }

            const response = await fetch(`http://localhost:8080/api/characters/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setIsCharacterSet(data.character ? true : false); // character 여부에 따라 상태 설정
            } else {
                setIsCharacterSet(false); // 에러가 발생하면 캐릭터 미설정으로 간주
            }
        } catch (error) {
            console.error("캐릭터 상태를 가져오는 중 오류 발생:", error.message);
            setIsCharacterSet(false); // 에러가 발생하면 캐릭터 미설정으로 간주
        }
    };

    useEffect(() => {
        fetchTemperature();
        fetchCharacterStatus(); // 캐릭터 상태 확인
    }, []);

    useEffect(() => {
        const fetchDiaryData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("JWT 토큰이 없습니다. 로그인이 필요합니다.");
                }

                const response = await fetch(`${"http://localhost:8080/api/diary/dates/{year}/{month}"}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP 오류 발생! 상태 코드: ${response.status}`);
                }

                const data = await response.json();
                const diaryDays = data.map((entry) => new Date(entry.date)); // API의 일기 날짜 데이터를 Date 객체로 변환
                setDiaryDates(diaryDays);
            } catch (error) {
                console.error("일기 데이터를 가져오는 중 오류 발생:", error.message);
            }
        };
        fetchDiaryData();
    }, []);

    const tileContent = ({ date, view }) => {
        // 특정 날짜에 점을 표시
        if (view === "month" && diaryDates.find((d) => d.toDateString() === date.toDateString())) {
            return <div className="dot"></div>;
        }
    };

    const handleSoloWrite = () => navigate('/Writing1');
    const handleStatsPage = () => navigate('/Statistics');
    const handleCharacterPage = () => navigate('/Character');
    const handleDiaryRecord = () => navigate('/Diaryrecord');

    const createGradient = () => {
        const ctx = document.createElement('canvas').getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#FDFCDC80');
        gradient.addColorStop(1, '#E9F3CB80');
        return gradient;
    };

    const chartData = {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [{
            label: 'Temperature',
            data: weeklyTemps,
            borderColor: '#191919',
            backgroundColor: createGradient(),
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#FF9B9B',
            borderWidth: 2
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.parsed.y}°C`
                }
            }
        },
        scales: {
            x: { ticks: { color: '#666' } },
            y: { grid: { display: false} ,min: -10, max: 50, ticks: { stepSize: 5, color: '#666' } }
        }
    };

    return (
        <div className="dashboard-container">
            <div className="welcome-section">
                <h1>오늘 하루를 기록해보아요</h1>
                <p>기록은 당신의 마음과 시간을 연결하는 다이어리입니다.</p>
                <p>당신의 추억을 기록해줄 FeelsLike</p>

                <div className="diary-buttons">
                    <button className="diary-button" onClick={handleSoloWrite}>
                        <img src={user} alt="solo user" className="user-icon" />
                        <div className="button-content">
                            <h2>나 혼자 일기 쓰러가기</h2>
                            <p>나만의 일상 일기와 질문 일기를 작성해요.</p>
                        </div>
                        <span className="arrow">›</span>
                    </button>

                    <button className="diary-button">
                        <img src={users} alt="multiple users" className="user-icon" />
                        <div className="button-content">
                            <h2>친구와 일기 쓰러가기</h2>
                            <p>친구들과 같이 일기를 쓰며 추억을 기록해요.</p>
                        </div>
                        <span className="arrow">›</span>
                    </button>
                </div>
            </div>

            <div className="main-content">
                <div className="stats-section">
                    <div className="stats-header">
                        <h3>나의 온도 평균</h3>
                        <span className="view-more" onClick={handleStatsPage}>
                            연도, 월, 주별로 분석하고 싶어요 ›
                        </span>
                    </div>
                    <div className="temperature-display">
                        <span className="period">{period}</span>
                        <span className="temp">이번주 평균 온도 <span className="cel">{averageTemp}</span></span>
                    </div>
                    <div className="graph-container" style={{ height: '250px', padding: '20px' }}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                </div>

                <div className="bottom-section">
                    <div className="character-section">
                        <div className="section-header">
                            <h3>나만의 캐릭터</h3>
                            <span className="view-more" onClick={handleCharacterPage}>자세히 보기 ›</span>
                        </div>
                        {/* 캐릭터가 설정되지 않은 경우 메시지 표시 */}
                        {!isCharacterSet && (
                            <div className="character-message">
                                <p>캐릭터를 설정해주세요.</p>
                            </div>
                        )}
                    </div>
                    <div className="diary-section">
                        <div className="section-header">
                            <h3>나의 일기 기록</h3>
                            <span className="view-more" onClick={handleDiaryRecord}>자세히 보기 ›</span>
                        </div>
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            tileContent={tileContent}
                            locale="en-US"
                            formatShortWeekday={(locale, date) =>
                                ['일', '월', '화', '수', '목', '금', '토'][date.getDay()]
                            }
                            formatMonth={(locale, date) =>
                                ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'][date.getMonth()]
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;