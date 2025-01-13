import React, { useState, useEffect } from "react";
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
import './Dashboard.css';
import { useNavigate } from "react-router-dom";
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
    const [averageTemp, setAverageTemp] = useState(null);
    const [period, setPeriod] = useState("2024.11.18~2024.11.24");
    const [weeklyTemps] = useState([20, 25, 28, 24, 22, 23, 50]);

    const fetchTemperature = async () => {
        try {
            const mockData = {
                averageTemp: (Math.random() * 10 + 15).toFixed(1) + "°C",
            };
            setAverageTemp(mockData.averageTemp);
        } catch (error) {
            console.error("온도 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    useEffect(() => {
        fetchTemperature();
        const interval = setInterval(fetchTemperature, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleSoloWrite = () => {
        navigate('/Writing1');
    };

    const handleStatsPage = () => {
        navigate('/Statistics');
    };

    const handleCharacterPage = () => {
        navigate('/Character');
    }

    const handeldiaryrecord = () => {
        navigate('/diaryrecord');
    }

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
            tension: 0,
            pointRadius: 4,
            pointBackgroundColor: '#FF9B9B',
            borderWidth: 2
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                titleColor: '#666',
                bodyColor: '#666',
                borderColor: '#ddd',
                borderWidth: 1,
                padding: 10,
                displayColors: false,
                callbacks: {
                    label: (context) => `${context.parsed.y}°C`
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: true,
                    drawBorder: false
                },
                ticks: {
                    font: {
                        size: 12
                    },
                    color: '#666'
                }
            },
            y: {
                min: 0,
                max: 60,
                grid: {
                    display: false,
                    color: '#f0f0f0',
                    drawBorder: false
                },
                ticks: {
                    font: {
                        size: 12
                    },
                    color: '#666',
                    stepSize: 5,
                    display: false
                }
            }
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
                        {/* 캐릭터 컴포넌트 */}
                    </div>
                    <div className="diary-section">
                        <div className="section-header">
                            <h3>나의 일기 기록</h3>
                            <span className="view-more" onClick={handeldiaryrecord}>자세히 보기 ›</span>
                        </div>
                        {/* 캘린더 컴포넌트 */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
