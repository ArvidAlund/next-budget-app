// src/app/api/calendar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createEvents, EventAttributes } from "ics";
import supabase from "@/app/lib/supabaseClient";
import getUserOption from "@/app/lib/db/getUserOption";

type Transaction = {
  date: string;
  amount: number;
  description: string | null;
  category: string | null;
  type: string | null;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new NextResponse("Ingen userId angiven", { status: 400 });
  }

  const highlightRecurring = await getUserOption("highlight_recurring");
  if (typeof highlightRecurring !== "boolean") {
    return new NextResponse("Kunde inte hämta användarinställningar", { status: 500 });
  }

  if (!highlightRecurring) {
    return new NextResponse("Användaren har inte aktiverat återkommande markering", { status: 400 });
  }

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .eq("recurring", true);

  if (error) {
    return new NextResponse("Fel vid hämtning av transaktioner", { status: 500 });
  }
  const reminders = await getUserOption("bill_reminders");
  if (typeof reminders !== "boolean" || !reminders) {
    return new NextResponse("Användaren har inte aktiverat räkningpåminnelser", { status: 400 });
  }

  if (!transactions || transactions.length === 0) {
    return new NextResponse("Inga återkommande transaktioner hittades", { status: 404 });
  }
  
  const events: EventAttributes[] = transactions.map((transaction: Transaction) => {
  const dateParts = transaction.date.split("-").map(Number);
  const eventDate: [number, number, number] = [dateParts[0], dateParts[1], dateParts[2]];

  const event: EventAttributes = {
    start: eventDate,
    duration: { days: 1 },
    title: `Återkommande transaktion: ${transaction.description || "Ingen beskrivning"}`,
    description: `Belopp: ${transaction.amount} kr\nKategori: ${transaction.category || "Ingen kategori"}`,
    recurrenceRule: "FREQ=MONTHLY",
    categories: [transaction.category || "övrigt"],
  };

  if (reminders) {
    event.alarms = [
      {
        action: "display",
        description: `Påminnelse: ${transaction.description || "Transaktion"} på ${transaction.amount} kr kommer snart.`,
        trigger: { days: 1, before: true },
      },
    ];
  }

  return event;
});

  const { error: icsError, value } = createEvents(events);

  if (icsError) {
    return new NextResponse("Fel vid skapande av kalenderhändelser", { status: 500 });
  } 

  return new NextResponse(value, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="calendar.ics"',
    },
  });
}
