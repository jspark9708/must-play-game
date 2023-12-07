import React, { useState } from "react";
import "./slider.css";

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
      return "#ff6874";
    } else if (selectedRating >= 4 && selectedRating <= 7) {
      return "#ffbd3f";
    } else if (selectedRating >= 8 && selectedRating <= 10) {
      return "#00ce7a";
    } else {
      return "rgba(128, 128, 128, 0.4)";
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
        opacity:
          (rating !== null && i > rating) ||
          (hoveredRating !== null && i > hoveredRating)
            ? 0.4
            : 1,
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
      <div
        className="rate-circle"
        style={{ backgroundColor: getRatingColor(rating) }}
      >
        <p>{rating !== null ? rating : ""}</p>
      </div>
      <div className="rating-container">
        <p>내 점수</p>
        <div className="slider-container">{renderSliderCells()}</div>
      </div>
    </div>
  );
};

export default RatingSlider;
