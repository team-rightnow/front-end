import React, { useState } from 'react';
import './CharacterRoom.css';

function CharacterRoom() {
    const [selectedCharacter, setSelectedCharacter] = useState('tao');
    const [selectedRoom, setSelectedRoom] = useState('red'); // 방 기본값은 빨간색
    const [activeTab, setActiveTab] = useState('room'); // 기본은 'room' 탭

    const handleCharacterChange = (e) => {
        setSelectedCharacter(e.target.value);
    };

    const handleRoomChange = (e) => {
        setSelectedRoom(e.target.value);
    };

    const handleConfirm = () => {
        alert(`${selectedCharacter} 캐릭터와 ${selectedRoom} 방이 선택되었습니다!`);
    };

    return (
        <div className="character-room">
            {/* 상단 노란색 배너 */}
            <div className="yellow-banner">
                <div className="banner-content">
                    <h1 className="banner-title">나만의 캐릭터</h1>
                    <p>도토리를 쓰고 나의 캐릭터를 꾸며보아요.</p>
                </div>
            </div>

            <div className="characterinfo-section">
                {/* 왼쪽: 캐릭터 정보 */}
                <div className="character-info" style={{ backgroundColor: selectedRoom }}>
                    <div className="character-image">
                        <img src={`/${selectedCharacter}.png`} alt={selectedCharacter} />
                    </div>
                    <div className="acorn-count">
                        도토리 개수: 10개
                    </div>
                </div>

                {/* 오른쪽: 방 선택과 캐릭터 선택 탭 */}
                <div className="selection-tab">
                    {/* 탭 네비게이션 */}
                    <div className="tab-navigation">
                        <button 
                            className={`tab ${activeTab === 'room' ? 'active' : ''}`}
                            onClick={() => setActiveTab('room')}
                        >
                            방 선택
                        </button>
                        <button 
                            className={`tab ${activeTab === 'character' ? 'active' : ''}`}
                            onClick={() => setActiveTab('character')}
                        >
                            캐릭터 선택
                        </button>
                    </div>

                    {/* 선택된 탭에 맞는 내용 표시 */}
                    <div className="tab-content">
                        {activeTab === 'room' ? (
                            <div className="room-selection">
                                <h3>방 선택</h3>
                                <div className="room-options">
                                    {['red', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'black'].map(color => (
                                        <div key={color}>
                                            <input
                                                type="radio"
                                                id={color}
                                                name="room"
                                                value={color}
                                                checked={selectedRoom === color}
                                                onChange={handleRoomChange}
                                            />
                                            <label htmlFor={color}>{color === 'red' ? '빨간색' : 
                                                                   color === 'yellow' ? '노란색' :
                                                                   color === 'green' ? '초록색' :
                                                                   color === 'blue' ? '파란색' :
                                                                   color === 'purple' ? '보라색' :
                                                                   color === 'pink' ? '핑크색' :
                                                                   color === 'brown' ? '갈색' : '검정색'}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="character-selection">
                                <h3>캐릭터 선택</h3>
                                <div>
                                    <input
                                        type="radio"
                                        id="lemon"
                                        name="character"
                                        value="lemon"
                                        checked={selectedCharacter === 'lemon'}
                                        onChange={handleCharacterChange}
                                    />
                                    <label htmlFor="lemon">레몬</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="tao"
                                        name="character"
                                        value="tao"
                                        checked={selectedCharacter === 'tao'}
                                        onChange={handleCharacterChange}
                                    />
                                    <label htmlFor="tao">타오</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="sawan"
                                        name="character"
                                        value="sawan"
                                        checked={selectedCharacter === 'sawan'}
                                        onChange={handleCharacterChange}
                                    />
                                    <label htmlFor="sawan">사완</label>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 완료 버튼 */}
                    <button className="confirm-button" onClick={handleConfirm}>완료</button>
                </div>
            </div>
        </div>
    );
}

export default CharacterRoom;
