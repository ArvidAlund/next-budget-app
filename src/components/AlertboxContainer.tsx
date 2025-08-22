import { InfoAlert } from "./informationalAlert";
import { useEffect, useState } from "react";

type AlertboxContainerProps = {
  type: "good" | "bad"; // Typ av alert (positiv/negativ)
};

export function AlertboxContainer({ type }: AlertboxContainerProps) {
  // State för att visa eller dölja alerten
  const [visible, setVisible] = useState(true);

  // Effekt som automatiskt döljer alerten efter 3 sekunder
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timeout); // Rensa timeout vid unmount
  }, []);

  // Om alerten inte ska visas, rendera ingenting
  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 w-fit z-50">
      {/* Skicka onClose callback till InfoAlert */}
      <InfoAlert type={type} onClose={() => setVisible(false)} />
    </div>
  );
}
