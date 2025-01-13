import React from "react";
import './Service_intro.css';
import thermometer from '../../assets/thermometer.png';
import profile from '../../assets/profile_intro.png';
import timer from '../../assets/timer.png';
import graph from '../../assets/graph.png';
import girl from '../../assets/girl.png';
import man1 from '../../assets/man_1.png';
import man2 from '../../assets/man_2.png';

function Service_intro(){
    const Service_introList = [
        {   title: '감정 온도계', 
            description: '오늘 하루의 감정을 숫자로 표현하여\n 그날의 기분 상태를 온도에 빗대어 간단하고 새롭게 기록할 수 있어요.', 
            question: '오늘 당신의 온도는 몇 도인가요?', answer: '음... 23도? 재미있는 하루였어', 
            image1: thermometer, image2: profile
        },
        {   title: '타임어택과 질문일기', 
            description: '제한된 시간안에 사용자의 즉흥적인 감정과 생각을 빠르게 끌어낼 수 있어요.\n 자신에게 질문이 주어지면 바로 타이머 시작!',
            image3: timer
        },
        {   title: '나의 감정을 통계로',
            description: '내가 이번 주/달/연도 동안 어떻게 지냈는지 알고싶지 않나요?\n 그동안 작성한 온도를 통계내어 평균 온도를 알 수 있어요.',
            image4: graph
        },
        {   title: '친구공유 페이지', 
            description: '나만의 기록도 만들어갈 수 있지만 친구들과 함께라면 재미 두배!\n 같이 하고 싶은 친구들과 질문에 답변하며 추억을 쌓아가요.',
            shareFriendChat: true,
            image5: girl, image6: man1, image7: man2
        },
    ];

    return (
        <section className="services">
            <h2 id="ser_title">FeelsLike's Service</h2>
            {Service_introList.map((service, index) => (
                <div key={index} className="service-box">
                    <h3>{service.title}</h3>
                    <p>{service.description.split('\n').map((line, i) =>
                        <React.Fragment key={i}>
                            {line}
                            <br />
                        </React.Fragment>
                    )}</p>
                    <div className="placeholder-image">
                        <div className="description-content">
                            {service.question && service.answer && (
                                <div className="chat-box">
                                    <div className="question">
                                        <span>{service.question}</span>
                                        {service.image1 && <img src={service.image1} className="service-image" alt="image1"/>}
                                    </div>
                                    <div className="answer">
                                        {service.image2 && <img src={service.image2} className="service-image" alt="image2"/>}
                                        <span>{service.answer}</span>
                                    </div>
                                </div>
                            )}
                            {service.image3 && (
                                <div className="single-image">
                                    <div className="timer-card">
                                        <div className="white-container">
                                            <img src={service.image3} className="timer" alt="service-related"/>
                                            <div className="question-line">
                                                <span>Q.</span>
                                                <div className="line"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {service.image4 && (
                                <div className="single-image graph">
                                    <div className="content-wrapper">
                                        <img src={service.image4} className="graph" alt="service-related"/>
                                        <div className="white-boxes">
                                            <div className="white-box-1"></div>
                                            <div className="white-box-2"></div>
                                            <div className="white-box-3"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {service.shareFriendChat && (
                                <div className="friend-chat-section">
                                    <div className="question-container">
                                        <span className="q-text">Q.</span>
                                    </div>
                                    <div className="friends-container">
                                        <div className="friend-item">
                                            <div className="menu-dots">• • •</div>
                                            <img src={service.image5} alt="friend" className="friend-profile"/>
                                        </div>
                                        <div className="friend-item">
                                            <div className="menu-dots">• • •</div>
                                            <img src={service.image6} alt="friend" className="friend-profile"/>
                                        </div>
                                        <div className="friend-item">
                                            <div className="menu-dots">• • •</div>
                                            <img src={service.image7} alt="friend" className="friend-profile"/>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
export default Service_intro;