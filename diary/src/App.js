import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Headernav from './components/Header/Headernav';
import Headerintro from './components/Header/Headerintro';
import Serviceintro from './components/Contents/Serviceintro';
import Footer from './components/Footer/Footer';
import Dashboard from './components/Contents/Dashboard';
import Statistics from './components/Contents/Statistics';
//import Login from './components/auth/Login';
//import SignUp from './components/auth/SignUp';
//import WritingSolo from '';
//import Writing2 from '';
import CharacterRoom from './components/Contents/CharacterRoom';
import CalendarPage from './components/Contents/CalendarPage';

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
                <Headernav isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
                <Routes>
                    {!isLoggedIn ? (
                        <>
                            <Route 
                                path="/" 
                                element={<>
                                    <Headerintro onLogin={handleLogin}/> 
                                    <Serviceintro />
                                </>} 
                            />
                            {/*<Route path="/login" element={<Login />}/>
                            <Route path="/Signup" element={<SignUp/>}/>*/}
                        </>
                    ) : (
                      <>
                        <Route path="/" element={<Dashboard />}/>
                        <Route path="/Statistics" element={<Statistics />} />
                        <Route path='/WritingSolo'/>
                        <Route path='/Writing2'/>
                        <Route path='/Character' element={<CharacterRoom/>} />
                        <Route path='/DiaryRecord' element={<CalendarPage/>} />
                      </>
                    )}
                </Routes>
                <Footer isLoggedIn={isLoggedIn} onLogout={handleLogout} />
            </div>
        </Router>
    );
}

export default App;