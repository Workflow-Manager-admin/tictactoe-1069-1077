import React from 'react';
import './App.css';
import TicTacToe from './components/TicTacToe/TicTacToe';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <a href="https://github.com/kavia-ai" className="btn" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </nav>

      <main>
        <div className="container">
          <div className="hero">
            <div className="subtitle">React Game Implementation</div>
            
            <TicTacToe />
            
            <div className="description">
              A classic two-player game where players take turns marking spaces in a 3x3 grid.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;