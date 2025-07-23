import { InfoAlert } from "./informationalAlert";
import { useEffect, useState } from "react";

type AlertboxContainerProps = {
  type: "good" | "bad";
};

export function AlertboxContainer({ type }: AlertboxContainerProps) {
  const [visible, setVisible] = useState(true);

  // Stäng alerten efter 3 sekunder (för säkerhets skull)
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 w-fit z-50">
      <InfoAlert type={type} onClose={() => setVisible(false)} />
    </div>
  );
}
