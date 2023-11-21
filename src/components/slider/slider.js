import React, { useState } from 'react';
import './slider.css';

const RatingSlider = ({onRatingChange}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(null);

  const getBackgroundColor = (value) => {
    if (rating !== null && value <= rating) {
      if (value >= 1 && value <= 3) {
        return 'red';
      } else if (value >= 4 && value <= 6) {
        return 'orange';
      } else if (value >= 7 && value <= 10) {
        return 'green';
      }
    } else if (hoveredRating !== null && value <= hoveredRating) {
      if (value >= 1 && value <= 3) {
        return 'red';
      } else if (value >= 4 && value <= 6) {
        return 'orange';
      } else if (value >= 7 && value <= 10) {
        return 'green';
      }
    }
    return 'grey';
  };

  const handleMouseOver = (value) => {
    setHoveredRating(value);
  };

  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  const handleSelect = (value) => {
    setRating(value);
    setHoveredRating(null); // 클릭 시에 hover된 값 초기화
    onRatingChange(value);
  };

  const renderSliderCells = () => {
    const cells = [];
    for (let i = 1; i <= 10; i++) {
      const cellStyle = {
        backgroundColor: getBackgroundColor(i),
      };

      cells.push(
        <div
          key={i}
          className={`slider-cell ${i === rating ? 'selected' : ''}`}
          style={cellStyle}
          onMouseOver={() => handleMouseOver(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleSelect(i)}
        >
          {i}
        </div>
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
