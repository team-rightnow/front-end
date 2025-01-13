import React from "react";
import './Footer.css';

function Footer(){
    return(
        <footer className="footer">
            <div className="team-info">
                <h2>Team</h2>
                <p>롸잇나우</p>
            </div>
            <div className="participants">
                <h2>Participants</h2>
                <div className="role-group">
                    <div className="role-row">
                        <div className="role-item">
                            <span>PM</span>
                            <span>김다빈 박서연</span>
                        </div>
                        <div className="role-item">
                            <span>Front-end</span>
                            <span>김가온 박수진 주민재 차예원</span>
                        </div>
                    </div>
                    <div className="role-row">
                        <div className="role-item">
                            <span>Designer</span>
                            <span>김다빈</span>
                        </div>
                        <div className="role-item">
                            <span>Back-end</span>
                            <span>손현수 심수민 이현진</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer;