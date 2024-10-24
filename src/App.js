import React, { useEffect, useState } from "react";
import Card from "../src/componets/card";
import "./App.css";

function App() {
  const cardData = [
    { id: 1, value: "🐶" },
    { id: 2, value: "🐱" },
    { id: 3, value: "🐭" },
    { id: 4, value: "🐹" },
    { id: 5, value: "🐰" },
    { id: 6, value: "🦊" },
    { id: 7, value: "🐻" },
    { id: 8, value: "🐼" },
  ];
  const [cards, setCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [one, setOne] = useState(null);
  const [two, setTwo] = useState(null);
  const [disabled, setdisabeld] = useState(false);
  
  const cardsmerge = () => {
    const cardmerge = [...cardData, ...cardData]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        id: index,
        isFlipped: false,
      }));
    setCards(cardmerge);
    setMoves(0);
    setMatches(0);
    setOne(null);
    setTwo(null);
  };
  const flip = (card) => {
    if (one) {
      setTwo(card);
    } else {
      setOne(card);
    }
  };

  useEffect(() => {
    if (one && two) {
      setdisabeld(true);
      if (one.value === two.value) {
        setCards((prevcards) =>
          prevcards.map((card) =>
            card.value === one.value ? { ...card, isFlipped: true } : card
          )
        );
      
      setMatches(matches + 1);
      reset()
    } else {
      setTimeout(() => {
        reset()
      }, 1000);
    }
  }
},[one,two]);

  const reset = () =>{
    setMatches(moves + 1)
    setdisabeld(false)
    setOne(null);
    setTwo(null)
  }

  useEffect(() => {
    cardsmerge();
  }, []);
  // {console.log("moves",moves)}
  return (
    <div className="App">
      <h1>Memory Card Game</h1>
      <div>
        <p>Moves:{moves}</p>
        <p>Matches:{matches}</p>
        <button onClick={cardsmerge}>game</button>
      </div>
      <div className="">
        {cards.map((card) => (
          <Card
            key={card.id}
            value={card.value}
            isFlipped={card.isFlipped || card === one || card === two}
            onClick={() => !disabled && !card.isFlipped && flip(card)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
