import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

// PUBLIC_INTERFACE
/**
 * TicTacToe component - A simple two-player game where players take turns marking spaces in a 3x3 grid
 * Includes game state management, rendering the 3x3 grid, player turn logic, and win/draw detection
 */
function TicTacToe() {
  // Game board state - 3x3 grid initialized with null values
  const [board, setBoard] = useState(Array(9).fill(null));
  
  // Current player state - X starts the game
  const [isXNext, setIsXNext] = useState(true);
  
  // Game status - can be 'playing', 'win', or 'draw'
  const [gameStatus, setGameStatus] = useState('playing');
  
  // Winner state - can be 'X', 'O', or null
  const [winner, setWinner] = useState(null);
  
  // Handle cell click
  const handleClick = (index) => {
    // If cell is already filled or game is over, ignore the click
    if (board[index] || gameStatus !== 'playing') {
      return;
    }
    
    // Create a copy of the board
    const newBoard = board.slice();
    
    // Update the board with the current player's mark
    newBoard[index] = isXNext ? 'X' : 'O';
    
    // Update the board state
    setBoard(newBoard);
    
    // Toggle player turn
    setIsXNext(!isXNext);
  };
  
  // Check for winner or draw after each move
  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setGameStatus('win');
      setWinner(winner);
    } else if (board.every(cell => cell !== null)) {
      setGameStatus('draw');
    }
  }, [board]);
  
  // Function to check if a player has won
  const calculateWinner = (board) => {
    // All possible winning combinations (rows, columns, diagonals)
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal from top-left
      [2, 4, 6], // diagonal from top-right
    ];
    
    // Check each winning combination
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winner (X or O)
      }
    }
    return null; // No winner
  };
  
  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setGameStatus('playing');
    setWinner(null);
  };
  
  // Render status message
  const renderStatus = () => {
    if (gameStatus === 'win') {
      return <div className="status winner">{winner} wins!</div>;
    } else if (gameStatus === 'draw') {
      return <div className="status draw">Game ended in a draw!</div>;
    } else {
      return <div className="status">{isXNext ? 'X' : 'O'}'s turn</div>;
    }
  };

  // Render the game board
  return (
    <div className="tictactoe-container">
      <h1 className="title">Tic Tac Toe</h1>
      
      {renderStatus()}
      
      <div className="board">
        {board.map((cell, index) => (
          <button 
            key={index} 
            className={`cell ${cell ? `cell-${cell.toLowerCase()}` : ''}`}
            onClick={() => handleClick(index)}
            disabled={cell !== null || gameStatus !== 'playing'}
          >
            {cell}
          </button>
        ))}
      </div>
      
      <button className="btn btn-large reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
}

export default TicTacToe;
