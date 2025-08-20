"use client";

import { useEffect, useState } from "react";
import supabase from "@/app/lib/supabaseClient";
import { Button } from "./ui/button";

export default function ConnectButton() {
  const [userId, setUserId] = useState<string | null>(null);

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
    window.open(icsUrl, "_blank");
  };

  return (
    <Button className="bg-secondary font-bold" onClick={handleSubscribe}>
      Ladda ner & Lägg till i Kalender
    </Button>
  );
}
