import React, { useState } from 'react';
import './CalendarPage.css';

function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(0); // 0 = January 2025

    // 각 날짜에 대한 일기 내용
    const diaryEntries = {
    };

    const months = ["1월", "2월", "3월", "4월", "5월", "6월"];

    const handleDateClick = (day) => {
        setSelectedDate(day);
    };

    const handlePrevMonth = () => {
        setCurrentMonth((prev) => (prev === 0 ? 0 : prev - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth((prev) => (prev === 5 ? 5 : prev + 1));
    };

    const renderDays = () => {
        const daysInMonth = new Date(2025, currentMonth + 1, 0).getDate();
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(
                <div 
                    key={i} 
                    className={`day ${selectedDate === i ? 'selected' : ''}`}
                    onClick={() => handleDateClick(i)}
                >
                    {i}
                </div>
            );
        }
        return days;
    };

    // 선택된 날짜를 '년.월.일' 형식으로 반환하는 함수
    const formatSelectedDate = () => {
        if (selectedDate !== null) {
            const year = 2025;
            const month = currentMonth + 1; // currentMonth는 0부터 시작하므로 +1
            return `${year}.${month < 10 ? '0' : ''}${month}.${selectedDate < 10 ? '0' : ''}${selectedDate}`;
        }
        return '';
    };

    return (
        <>
        <div className="yellow-banner" style={{ textAlign: 'center' }}>
            <div style={{ height: '50px' }}></div>
            <h1 className="banner-title">나의 일기 기록</h1>
            <div className="search-container" style={{ marginTop: '30px' }}>
                <input type="text" placeholder="내용을 검색해주세요."  className="search-input" style={{ width: '400px' }} />
                <button className="search-button"></button>
            </div>
        </div>
        <div className="calendar-page" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '20px' }}>
            <div className="calendar-container" style={{ borderRadius: '15px', padding: '20px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', flex: 1 }}>
                <div className="calendar-header">
                    <span className="prev-arrow" onClick={handlePrevMonth}>&lt;</span>
                    <span className="current-month">{months[currentMonth]}</span>
                    <span className="next-arrow" onClick={handleNextMonth}>&gt;</span>
                </div>
                <div className="calendar-weekdays">
                    <span style={{ color: '#ff0000' }}>일</span>
                    <span>월</span>
                    <span>화</span>
                    <span>수</span>
                    <span>목</span>
                    <span>금</span>
                    <span style={{ color: '#0000ff' }}>토</span>
                </div>
                <div className="calendar-days">
                    {renderDays()}
                </div>
            </div>
            <div className="diary-content" style={{ borderRadius: '15px', padding: '20px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', flex: 1 }}>
                <h2>{selectedDate ? `일기 (${selectedDate}일)` : '럭키비키데이'}</h2>
                <p>{selectedDate ? diaryEntries[selectedDate] || '오늘의 일기가 없습니다.' : '일기를 선택해 주세요.'}</p>
                <div className="diary-footer">
                    <p className="diary-date">오늘의 온도 25도</p>
                    <p className="selected-date">{selectedDate ? `${formatSelectedDate()}` : ''}</p>
                </div>
            </div>
        </div>
        </>
    );
}

export default CalendarPage;
