import React from 'react';
import PropTypes from 'prop-types';
import '../style/Circle.css';

const Circle = ({ id, position, onClick, isClicked, isHidden, animationDuration }) => {
  const circleClassName = `circle ${isClicked ? 'clicked' : ''} ${isHidden ? 'hidden' : ''}`;
  
  const circleStyle = {
    ...position,
    transition: `background-color ${animationDuration}s ease, opacity 0.3s ease, transform 0.3s ease`
  };

  return (
    <div
      onClick={() => onClick(id)}
      className={circleClassName}
      style={circleStyle}
    >
      {id}
    </div>
  );
};

Circle.propTypes = {
  id: PropTypes.number.isRequired,
  position: PropTypes.shape({
    top: PropTypes.string.isRequired,
    left: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
  isHidden: PropTypes.bool,
  animationDuration: PropTypes.number.isRequired,
};

Circle.defaultProps = {
  isHidden: false,
};

export default Circle;
