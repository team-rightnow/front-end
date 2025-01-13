import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header_nav from './components/Header/Header_nav';
import Header_intro from './components/Header/Header_intro';
import Service_intro from './components/Contents/Service_intro';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Contents/Dashboard';
import Statistics from './components/Contents/Statistics';
//import WritingSolo from '';
//import Writing2 from '';
//import Character from '';
//import diaryrecord from '';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div className="App">
                <Header_nav isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
                <Routes>
                    {!isLoggedIn ? (
                        <>
                            <Route 
                                path="/" 
                                element={<>
                                    <Header_intro onLogin={handleLogin}/> 
                                    <Service_intro />
                                </>} 
                            />
                        </>
                    ) : (
                      <>
                        <Route path="/" element={<Dashboard />}/>
                        <Route path="/Statistics" element={<Statistics />} />
                        <Route path='/WritingSolo'/>
                        <Route path='/Writing2'/>
                        <Route path='/Character'/>
                        <Route path='/diaryrecord'/>
                      </>
                    )}
                </Routes>
                <Footer isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            </div>
        </Router>
    );
}

export default App;