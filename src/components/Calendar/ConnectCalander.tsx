"use client";

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabaseClient";
import { Button } from "../ui/button";

/**
 * Renders a button that copies the current user's ICS calendar URL to the clipboard and shows temporary feedback.
 *
 * On mount the component fetches the authenticated user's ID from Supabase. When clicked (and a user is present)
 * it copies `https://budget.arvidalund.com/api/calendar?userId={userId}` to the clipboard and displays "Länk kopierad!" for 3 seconds.
 *
 * @returns A button element that triggers the copy-to-clipboard action and displays success feedback.
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

    const icsUrl = `https://budget.arvidalund.com/api/calendar?userId=${userId}`;

    navigator.clipboard.writeText(icsUrl).then(() => {
      setCopyURL(true);

      // Återställ feedback efter 3 sekunder
      setTimeout(() => {
        setCopyURL(false);
      }, 3000);
    });
  };

  return (
    <button
      className="p-2 border rounded w-full bg-primary text-secondary hover:bg-primary-300 transition-all duration-300 relative overflow-hidden h-10 flex items-center justify-center"
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
        Länk kopierad!
      </span>
    </button>
  );
}