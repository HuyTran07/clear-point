import React from 'react';
import PropTypes from 'prop-types';
import Circle from './Circle';
import '../style/GameBoard.css';

const GameBoard = React.memo(({ circles, handleCircleClick, clickedCircle, animationDuration, gameOver }) => (
  <div className="game-board">
    {circles.map(circle => (
      <Circle
        key={circle.id}
        {...circle}
        onClick={() => {
          if (!gameOver) {
            handleCircleClick(circle.id);
          } else {
            alert('Game Over. Please restart.');
          }
        }}
        isClicked={clickedCircle === circle.id}
        animationDuration={animationDuration}
      />
    ))}
  </div>
));

GameBoard.propTypes = {
  circles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    position: PropTypes.shape({
      top: PropTypes.string.isRequired,
      left: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  handleCircleClick: PropTypes.func.isRequired,
  clickedCircle: PropTypes.number,
  animationDuration: PropTypes.number.isRequired,
  gameOver: PropTypes.bool.isRequired, // Thêm propType cho gameOver
};

GameBoard.defaultProps = {
  clickedCircle: null,
};

export default GameBoard;