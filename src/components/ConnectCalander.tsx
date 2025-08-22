"use client";

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabaseClient";
import { Button } from "./ui/button";

export default function ConnectButton() {
  const [userId, setUserId] = useState<string | null>(null);
  const [copiedURL, setCopyURL] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("Ingen användare inloggad");
        return;
      }

      setUserId(user.id);
    };

    fetchUser();
  }, []);

  const handleSubscribe = () => {
    if (!userId) return;

    // Ladda ner ICS direkt
    const icsUrl = `https://next-budget-app-theta.vercel.app/api/calendar?userId=${userId}`;
    navigator.clipboard.writeText(icsUrl).then(() => {
      setCopyURL(true);
      setTimeout(()=>{
        setCopyURL(false)
      },3000)
    })
    
  };

  return (
    <Button className="bg-secondary font-bold w-60 relative" onClick={handleSubscribe}>
      <span className={`block transition-opacity duration-500 absolute ${
          copiedURL ? "opacity-0" : "opacity-100"
        }`}>
          Kopiera kalenderlänk
        </span>
        <span className={`block transition-opacity duration-500 absolute ${
          copiedURL ? "opacity-100" : "opacity-0"
        }`}>
          Länk kopierad ✅
        </span>
    </Button>
  );
}
