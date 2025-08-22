"use client";

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabaseClient";
import { Button } from "./ui/button";

/**
 * ConnectButton
 * ----------------
 * Knapp som kopierar ICS-kalenderlänk till clipboard och visar feedback
 */
export default function ConnectButton() {
  const [userId, setUserId] = useState<string | null>(null); // Inloggad användare
  const [copiedURL, setCopyURL] = useState(false); // Feedback-status

  // Hämta inloggad användare vid mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        console.error("Ingen användare inloggad");
        return;
      }
      setUserId(user.id);
    };
    fetchUser();
  }, []);

  // Kopiera ICS-länk
  const handleSubscribe = () => {
    if (!userId) return;

    const icsUrl = `https://next-budget-app-theta.vercel.app/api/calendar?userId=${userId}`;

    navigator.clipboard.writeText(icsUrl).then(() => {
      setCopyURL(true);

      // Återställ feedback efter 3 sekunder
      setTimeout(() => {
        setCopyURL(false);
      }, 3000);
    });
  };

  return (
    <Button
      className="bg-secondary font-bold w-60 relative"
      onClick={handleSubscribe}
    >
      {/* Originaltext */}
      <span
        className={`block transition-opacity duration-500 absolute ${
          copiedURL ? "opacity-0" : "opacity-100"
        }`}
      >
        Kopiera kalenderlänk
      </span>

      {/* Feedbacktext */}
      <span
        className={`block transition-opacity duration-500 absolute ${
          copiedURL ? "opacity-100" : "opacity-0"
        }`}
      >
        Länk kopierad ✅
      </span>
    </Button>
  );
}
