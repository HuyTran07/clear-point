import React, { useState, useEffect, useCallback } from 'react';
import Controls from './components/Controls';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  const [circleCount, setCircleCount] = useState('');
  const [circles, setCircles] = useState([]);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [nextExpected, setNextExpected] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [clickedCircle, setClickedCircle] = useState(null);
  const [buttonColor, setButtonColor] = useState('white');
  const [statusMessage, setStatusMessage] = useState("LET'S PLAY");
  const [statusColor, setStatusColor] = useState('black');
  const animationDuration = 0.3;

  useEffect(() => {
    let timer;
    if (timerActive && !gameOver) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [timerActive, gameOver]);

  const handleCircleClick = useCallback((id) => {
    if (gameOver) {
      setStatusMessage('Game Over. Please restart.');
      setStatusColor('red');
      return;
    }

    if (id === nextExpected && !clickedCircle) {
      setClickedCircle(id);
      setTimeout(() => {
        setCircles(prevCircles => prevCircles.filter(circle => circle.id !== id));
        setNextExpected(prevNext => prevNext + 1);
        setClickedCircle(null);
      }, animationDuration * 1000);
    } else if (id !== nextExpected) {
      setGameOver(true);
      setTimerActive(false);
      setStatusMessage('Game Over');
      setStatusColor('red');
    }
  }, [gameOver, nextExpected, clickedCircle, animationDuration]);

  const handleRestart = useCallback(() => {
    if (circleCount === '' || Number(circleCount) <= 0) {
      setStatusMessage('ERROR: Enter a value greater than 0');
      setStatusColor('red');
      return;
    }

    const count = Number(circleCount);
    const newCircles = Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      position: {
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`,
      },
    })).sort((a, b) => b.id - a.id);

    setCircles(newCircles);
    setTime(0);
    setNextExpected(1);
    setGameOver(false);
    setClickedCircle(null);
    setTimerActive(true);
    setButtonColor('white');
    setStatusMessage("LET'S PLAY");
    setStatusColor('black');
  }, [circleCount]);

  useEffect(() => {
    if (circles.length === 0 && !gameOver && timerActive) {
      setTimerActive(false);
      setStatusMessage('ALL CLEARED');
      setStatusColor('green');
    }
  }, [circles, gameOver, timerActive]);

  return (
    <div>
      <Controls
        circleCount={circleCount}
        setCircleCount={setCircleCount}
        time={time}
        handleRestart={handleRestart}
        buttonColor={buttonColor}
        statusMessage={statusMessage}
        statusColor={statusColor}
      />
      <GameBoard
        circles={circles}
        handleCircleClick={handleCircleClick}
        clickedCircle={clickedCircle}
        animationDuration={animationDuration}
        gameOver={gameOver} // Truyền trạng thái gameOver
      />
    </div>
  );
}

export default App;
