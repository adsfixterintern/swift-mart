
"use client";

import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";
import "./spinwheel.css";

const rewards = [
  "10% OFF",
  "20% OFF",
  "Free Shipping",
  "30% OFF",
  "Try Again",
  "50% OFF",
];

export default function SpinWheelModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [reward, setReward] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const alreadySpun = localStorage.getItem("hasSpun");
    if (!alreadySpun) {
      setTimeout(() => setIsOpen(true), 1500);
    }
  }, []);

  // Spin the wheel and determine the reward

const spinWheel = () => {
  if (isSpinning) return;

  setIsSpinning(true);

  const randomDegree = Math.floor(Math.random() * 360);
  const totalRotation = 360 * 6 + randomDegree;

  setRotation(totalRotation);

  setTimeout(() => {
    const slice = 360 / rewards.length;
    const finalDeg = totalRotation % 360;
    let normalized = (360 - finalDeg) % 360;
    normalized = (normalized + 90) % 360;
    normalized = (normalized + slice / 2) % 360;

    const winningIndex = Math.floor(normalized / slice);

    setReward(rewards[winningIndex]);
    localStorage.setItem("hasSpun", "true");
  }, 4000);

  setTimeout(() => {
    setIsOpen(false);
  }, 7000);
};

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <button className="close" onClick={() => setIsOpen(false)}>
          <X size={20} />
        </button>

        <h2 className="title">
          <Gift size={20} /> Spin & Win
        </h2>

        <div className="wheel-wrapper">
          {/* Indicator Top */}
         

          <div
            className="wheel"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {rewards.map((item, index) => (
              <div
                key={index}
                className="segment"
                style={{
                  transform: `rotate(${index * (360 / rewards.length)}deg)`,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
         

        <button className="spin-btn" onClick={spinWheel} disabled={isSpinning}>
             <div className="indicator"></div>
          {isSpinning ? "Spinning..." : "SPIN NOW"}
        </button>

        {reward && (
          <div className="reward-box">
            🎉 Congratulations! <br />
            You Won: <strong>{reward}</strong>
          </div>
        )}
      </div>
    </div>
  );
}