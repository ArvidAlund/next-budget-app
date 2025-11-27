import { useState, useEffect } from "react";

/**
 * Countdown timer component that displays remaining seconds and invokes a callback when it reaches zero.
 *
 * @param start - Initial number of seconds for the countdown (default: 10).
 * @param onFinish - Optional callback invoked once when the countdown reaches 0.
 * @returns The rendered element showing the current seconds left.
 */
export default function Countdown({ start = 10, onFinish }: { start?: number, onFinish?: () => void }) {
  const [timeLeft, setTimeLeft] = useState(start);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onFinish) onFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // städa upp intervallet
  }, [timeLeft, onFinish]);

  return (
    <div className="text-2xl font-bold">
      {timeLeft} sekunder
    </div>
  );
}