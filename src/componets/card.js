import React from "react";
import "../componets/card.css";

const Card = ({ value, isFlipped, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className={isFlipped ? "fliped" : ""}>
        <div className="front">
          {isFlipped && <span>{value}</span>}
        </div>
        <div className="back">?</div>
      </div>
    </div>
  );
};

export default Card;
