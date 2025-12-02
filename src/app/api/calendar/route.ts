// src/app/api/calendar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createEvents, EventAttributes } from "ics";
import {supabaseAdmin} from "@/app/lib/supabaseClient";
import getUserOptionAdmin from "@/app/lib/db/getUserOptionAdmin";

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

  const highlightRecurring = await getUserOptionAdmin("highlight_recurring", userId);
  if (highlightRecurring === null || typeof highlightRecurring !== "boolean") {
    return new NextResponse("Ogiltigt värde för highlight_recurring", { status: 500 });
  }

  if (!highlightRecurring) {
    return new NextResponse("Återkommande transaktioner är inte aktiverade för denna användare", { status: 403 });
  }

  const { data: transactions, error } = await supabaseAdmin
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .eq("recurring", highlightRecurring);

  if (error) {
    return new NextResponse("Fel vid hämtning av transaktioner", { status: 500 });
  }

  if (!transactions || transactions.length === 0) {
    return new NextResponse("Inga återkommande transaktioner hittades", { status: 404 });
  }

  const remindersSetting = await getUserOptionAdmin("bill_reminders", userId);
  if (remindersSetting === null || typeof remindersSetting !== "boolean") {
    return new NextResponse("Ogiltigt värde för bill_reminders", { status: 500 });
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
  if (remindersSetting){
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
