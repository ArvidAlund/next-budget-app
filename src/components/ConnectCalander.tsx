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
      } = await supabase.auth.getUser();

      if (user) setUserId(user.id);
    };
    fetchUser();
  }, []);

  const handleSubscribe = async () => {
    if (!userId) return;

    const res = await fetch(`/api/calendar?userId=${userId}`);
    const data = await res.json();

    if (!data.url) return;

    const icsUrl = encodeURIComponent(`${window.location.origin}${data.url}`);
    const url = `https://calendar.google.com/calendar/u/0/r?cid=${icsUrl}`;
    window.open(url, "_blank");
  };

  return (
    <Button className="bg-secondary font-bold" onClick={handleSubscribe}>
      Synka med Google Kalender
    </Button>
  );
}
