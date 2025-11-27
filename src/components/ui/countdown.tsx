import { useState, useEffect } from "react";

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
