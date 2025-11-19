// src/app/api/calendar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createEvents, EventAttributes } from "ics";
import supabase from "@/app/lib/supabaseClient";

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

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .eq("recurring", true);

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  const transactions: Transaction[] = (data ?? []) as Transaction[];

  const events: EventAttributes[] = transactions.map((tx) => {
    const startDate = new Date(tx.date);
    const untilDate = new Date(startDate);
    untilDate.setMonth(untilDate.getMonth() + 4);

    return {
      start: [
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        startDate.getDate(),
        7,
        0,
      ] as [number, number, number, number, number],
      duration: { hours: 1 },
      title: tx.description || "Transaktion",
      description: `Belopp: ${tx.amount}` || `${tx.category}`,
      recurrenceRule: `FREQ=MONTHLY;UNTIL=${untilDate
        .toISOString()
        .replace(/[-:]/g, "")
        .split(".")[0]}Z`,
    };
  });

  const { error: icsError, value } = createEvents(events);

  if (icsError) {
    return new NextResponse(icsError.message, { status: 500 });
  }

  return new NextResponse(value, {
    status: 200,
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename=Budget-${userId}.ics`,
    },
  });
}
