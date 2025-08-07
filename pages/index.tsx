import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [target, setTarget] = useState<number>(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("Guess a number between 1 and 100");
    setAttempts(0);
  };

  const handleGuess = () => {
    if (attempts >= 5 || message.includes("🎉")) return;

    const num = parseInt(guess, 10);
    if (isNaN(num)) {
      setMessage("Please enter a valid number");
      return;
    }

    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (num === target) {
      setMessage(
        `🎉 Correct! You guessed it in ${nextAttempts} tries. But, I think you cheated, I won't give you the flag.`
      );
    } else if (nextAttempts >= 5) {
      setMessage(`❌ Out of attempts! The correct number was ${target}.`);
    } else if (num < target) {
      setMessage("📉 Too low!");
    } else {
      setMessage("📈 Too high!");
    }

    console.log(target);

    setGuess("");
  };

  return (
    <main className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Number Guessing Game</h1>
      <p className="mb-4 text-lg">{message}</p>
      <div className="flex justify-center gap-2 mb-4">
        <input
          type="number"
          className="border p-2 rounded w-40 text-center"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter a number"
          disabled={attempts >= 5 || message.includes("🎉")}
        />
        <button
          className={`px-4 py-2 rounded ${
            attempts >= 5 || message.includes("🎉")
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          onClick={handleGuess}
          disabled={attempts >= 5 || message.includes("🎉")}
        >
          Guess
        </button>
      </div>
      <p className="text-gray-500 mb-4">Attempts: {attempts}/5</p>
      <button className="text-sm text-blue-500 underline" onClick={resetGame}>
        🔄 Restart Game
      </button>
    </main>
  );
}
