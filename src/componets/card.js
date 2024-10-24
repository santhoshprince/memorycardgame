import React from "react";
import "../componets/card.css";

const card = ({ value, isFlipped, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className={isFlipped ? "fliped" : ""}>
      
      <div className="front">
        {isFlipped && (
            <span>{value}</span>
        )}

      </div>

        <div className="back" onClick={onClick}>
          ?
        </div>
      </div>
    </div>
  );
};
export default card;
