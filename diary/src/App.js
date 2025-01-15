import React, { useState } from 'react';
import CalendarPage from './components/CalendarPage';
import CharacterRoom from './components/CharacterRoom';
import './App.css';

const App = () => {
    const [currentPage, setCurrentPage] = useState('character');

    const renderPage = () => {
        if (currentPage === 'character') {
            return <CharacterRoom />;
        } else if (currentPage === 'calendar') {
            return <CalendarPage />;
        }
    };

    return (
      <div className="App">
        <header className="navbar">
          <div className="logo">FeelsLike</div>
          <nav>
            <ul>
              <li onClick={() => setCurrentPage('character')}>Character Room</li>
              <li onClick={() => setCurrentPage('calendar')}>Calendar Page</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Logout</li>
              <li>My Page</li>
            </ul>
          </nav>
        </header>
        
        <main>
          {renderPage()}
        </main>
      </div>
    );
};

export default App;
