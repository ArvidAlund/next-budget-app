import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "./ui/alert";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type InfoAlertProps = {
  type: "good" | "bad";
  onClose: () => void; // för att stänga alerten efter animationen
};

export function InfoAlert({ type, onClose }: InfoAlertProps) {
  const good_alert = { icon: faCircleCheck, text: "Klart! Din transaktion har sparats." };
  const bad_alert = { icon: faCircleXmark, text: "Något gick fel vid sparandet." };

  const { variant, content }: { variant: "default" | "destructive"; content: typeof good_alert } =
  type === "good"
    ? { variant: "default", content: good_alert }
    : { variant: "destructive", content: bad_alert };

  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Starta fadeout efter 2.8 sekunder
    const fadeTimeout = setTimeout(() => setFadeOut(true), 2800);
    // Stäng alert efter 3 sekunder
    const closeTimeout = setTimeout(() => onClose(), 3000);
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(closeTimeout);
    };
  }, [onClose]);

  return (
    <Alert
      variant={variant}
      className={`flex items-center gap-3 py-2 relative overflow-hidden transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-center h-full">
        <FontAwesomeIcon icon={content.icon} className="h-5 w-5" />
      </div>
      <AlertTitle>{content.text}</AlertTitle>

      {/* Progress bar som minskar i bredd */}
      <div
        className="absolute bottom-0 left-0 h-1 bg-white"
        style={{
          animation: "progressBarDrain 3s linear forwards",
          width: "100%",
        }}
      />
      <style>{`
        @keyframes progressBarDrain {
          to {
            width: 0%;
          }
        }
      `}</style>
    </Alert>
  );
}
