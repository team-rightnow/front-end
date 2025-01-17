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
    Legend,
} from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Statistics.css";
import sadImage from "../../assets/sad.png";
import smileImage from "../../assets/smile.png";
import madImage from "../../assets/mad.png";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Statistics() {
    const [selectedTab, setSelectedTab] = useState("week");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [averageTemp, setAverageTemp] = useState("0");
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [hasData, setHasData] = useState(true);

    const fetchStatistics = async (date) => {
        try {
            const response = await fetch(`/api/statistic/${date}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT 토큰을 헤더에 추가
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP 오류! 상태: ${response.status}`);
            }
    
            const data = await response.json();
            // 응답 구조가 예상과 일치하는지 확인
            if (data.code === 1 && data.data) {
                return data.data; // 온도 데이터 객체 반환
            } else {
                throw new Error('예상하지 못한 응답 구조');
            }
        } catch (error) {
            console.error("통계 데이터 가져오기 오류:", error);
            setHasData(false);
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const formattedDate = startDate.toISOString().split('T')[0]; // 날짜를 'YYYY-MM-DD' 형태로 변환
            const statisticsData = await fetchStatistics(formattedDate); // 데이터를 가져오기
            if (statisticsData) {
                setAverageTemp(statisticsData.temperature.toString()); // 온도 값 설정
                setHasData(true); // 데이터가 있음을 표시
            }
        };
        fetchData(); // 데이터 가져오기
    }, [startDate]); // startDate가 변경될 때마다 실행

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
        setShowCalendar(false);
        if (tab === "week") {
            setHasData(true);
        } else {
            setHasData(false);
        }
    };

    const handleDateChange = async (dates) => {
        const [start] = dates; // 사용자가 선택한 시작 날짜
        if (start) {
            setStartDate(start);
            // 종료 날짜를 시작 날짜 + 6일로 설정 (주간 선택)
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            setEndDate(end);

            const formattedDate = start.toISOString().split('T')[0];
            const statisticsData = await fetchStatistics(formattedDate);
            if (statisticsData) {
                setAverageTemp(statisticsData.temperature.toString());
                setHasData(true);
            }
        } else {
            setHasData(false);
            setAverageTemp("0");
        }
    };

    const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

    const data = {
        labels: weekDays,
        datasets: [{
            data: Array(7).fill(parseFloat(averageTemp)),
            borderColor: '#FF9B9B',
            backgroundColor: 'rgba(255, 155, 155, 0.1)',
            fill: true,
            tension: 0,
            pointRadius: 5,
            pointBackgroundColor: ['#4AB7B6', '#A0D995', '#FF9B9B', '#A0D995', '#4AB7B6', '#4AB7B6', '#FF9B9B']
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
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
                    color: '#666'
                }
            },
            y: {
                display: true,
                min: -10,
                max: 50,
                grid: {
                    display: false
                }
            }
        },
        layout: {
            padding: 10
        }
    };

    const renderDateSelector = () => {
        if (selectedTab === "week") {
            return (
                <button className="date-selector-button" onClick={() => setShowCalendar(!showCalendar)}>
                    날짜 선택 ▼
                </button>
            );
        } else if (selectedTab === "month") {
            return (
                <select 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    className="date-selector-button"
                >
                    {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                        <option key={month} value={month}>{month}월</option>
                    ))}
                </select>
            );
        } else {
            return (
                <select 
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    className="date-selector-button"
                >
                    {[2022, 2023, 2024].map(year => (
                        <option key={year} value={year}>{year}년</option>
                    ))}
                </select>
            );
        }
    };

    const formatDateRange = () => {
        if (selectedTab === "week") {
            if (!startDate || !endDate) {
                return "날짜 미지정";
            }
            return `${startDate.getFullYear()}.${String(startDate.getMonth() + 1).padStart(2, '0')}.${String(startDate.getDate()).padStart(2, '0')} ~ ${endDate.getFullYear()}.${String(endDate.getMonth() + 1).padStart(2, '0')}.${String(endDate.getDate()).padStart(2, '0')}`;
        } else if (selectedTab === "month") {
            return `${selectedMonth}월`;
        } else {
            return `${selectedYear}년도`;
        }
    };

    return (
        <div className="statistics-container">
            <header className="statistics-header">
                <h1>나의 온도 평균</h1>
                <p>내가 그동안 기록해왔던 지난 날을 살펴봐요.</p>
            </header>

            <div className="tabs">
                <button
                    className={`tab-button ${selectedTab === "week" ? "active" : ""}`}
                    onClick={() => handleTabClick("week")}
                >
                    주
                </button>
                <button
                    className={`tab-button ${selectedTab === "month" ? "active" : ""}`}
                    onClick={() => handleTabClick("month")}
                >
                    달
                </button>
                <button
                    className={`tab-button ${selectedTab === "year" ? "active" : ""}`}
                    onClick={() => handleTabClick("year")}
                >
                    연도
                </button>
            </div>

            <div className="mood-indicators">
                <div className="mood-item">
                    <img src={sadImage} alt="sad" className="mood-image" />
                    <span className="mood-count">: -</span>
                </div>
                <div className="mood-item">
                    <img src={smileImage} alt="neutral" className="mood-image" />
                    <span className="mood-count">: -</span>
                </div>
                <div className="mood-item">
                    <img src={madImage} alt="happy" className="mood-image" />
                    <span className="mood-count">: -</span>
                </div>
                {renderDateSelector()}
            </div>

            {showCalendar && selectedTab === "week" && (
                <div className="calendar-wrapper">
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        inline
                        dateFormat="yyyy.MM.dd"
                    />
                </div>
            )}

            <div className="chart-section">
                {hasData ? (
                    <Line data={data} options={options} />
                ) : (
                    <div className="no-data">정보가 없습니다.</div>
                )}
            </div>

            <div className="result-box">
                <p>
                    {hasData ? (
                        <>
                            <div className="date-range">
                                {selectedTab === "week" && `${formatDateRange()}의`}
                                {selectedTab === "month" && `선택하신 ${selectedMonth}월은`}
                                {selectedTab === "year" && `선택하신 ${selectedYear}년은`}
                            </div>
                            <div>평균 온도는 <span className="temperature">{averageTemp}°C</span> 입니다.</div>
                        </>
                    ) : (
                        <>
                            <div className="date-range">-</div>
                            <div>평균 온도는 <span className="temperature">---°C</span> 입니다.</div>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

export default Statistics;
