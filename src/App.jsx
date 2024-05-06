import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Die from "./Die.jsx";
import Confetti from "react-confetti";
import "./App.css";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showNewRecord, setShowNewRecord] = useState(false);
  const [turn, setTurn] = useState(0);
  const lowestTurn = JSON.parse(localStorage.getItem("lowestTurn"));

  useEffect(() => {
    const allHeld = dice.every((dice) => dice.isHeld);
    const diceValue = dice[0].value;
    const allSameValue = dice.every((dice) => dice.value === diceValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      if (!lowestTurn || turn < lowestTurn) {
        localStorage.setItem("lowestTurn", turn);
        setShowConfetti(true);
        setShowNewRecord(true);

        setTimeout(() => {
          document.getElementById("new-record").classList.add("hide");
        }, 3200);
        setTimeout(() => {
          setShowNewRecord(false);
          document.getElementById("new-record").classList.remove("hide");
        }, 4000);
      }
    }
  }, [dice]);

  function generateNewDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 3),
      isHeld: false,
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
      setTurn((oldTurn) => (oldTurn += 1));
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setShowConfetti(false);
      setTurn(0);
    }
  }

  function holdDice(id) {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        })
      );
    }
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {showConfetti && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="turn-container">
        <div className="turn">Turns: {turn}</div>
        {lowestTurn && (
          <div className="best-record">
            Best record: {lowestTurn} turns{" "}
            {lowestTurn > 12 && <p className="mock">(ur really bad</p>}
          </div>
        )}
      </div>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>

      {showNewRecord && <div className="new-record" id="new-record">New Record!</div>}
    </main>
  );
}
