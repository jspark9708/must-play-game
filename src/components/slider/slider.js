import React, { useState } from 'react';
import './slider.css';

const RatingSlider = ({ onRatingChange }) => {
  const [rating, setRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);

  const getCellColor = (value) => {
    if (hoveredRating !== null && value <= hoveredRating) {
      return getRatingColor(hoveredRating);
    }

    return getRatingColor(rating || hoveredRating);
  };

  const getRatingColor = (selectedRating) => {
    if (selectedRating >= 1 && selectedRating <= 3) {
      return 'red';
    } else if (selectedRating >= 4 && selectedRating <= 7) {
      return 'orange';
    } else if (selectedRating >= 8 && selectedRating <= 10) {
      return 'green';
    } else {
      return 'gray'; // 그 외의 값은 회색으로 처리
    }
  };

  const handleMouseOver = (value) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const handleSelect = (value) => {
    setRating(value);
    onRatingChange(value);
  };

  const renderSliderCells = () => {
    const cells = [];
    for (let i = 1; i <= 10; i++) {
      const cellStyle = {
        backgroundColor: getCellColor(i),
        opacity: (rating !== null && i > rating) || (hoveredRating !== null && i > hoveredRating) ? 0.5 : 1,
      };
      cells.push(
        <div
          key={i}
          className={`slider-cell ${getRatingColor(i)}`}
          style={cellStyle}
          onMouseOver={() => handleMouseOver(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleSelect(i)}
        />
      );
    }
    return cells;
  };

  return (
    <div className="rating-slider">
      <label>
        Rating: {rating !== null ? rating : ''}
        <div className="slider-container">
          {renderSliderCells()}
        </div>
      </label>
    </div>
  );
};

export default RatingSlider;
