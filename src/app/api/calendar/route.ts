// app/api/calendar/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createEvents, EventAttributes } from "ics";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return new NextResponse("Ingen userId angiven", { status: 400 });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  const { data, error } = await supabase
    .from("transactions")
    .select("date, amount, description, category")
    .eq("user_id", userId)
    .eq("recurring", true);

  if (error) return new NextResponse(error.message, { status: 500 });

  const transactions = (data ?? []) as { date: string; amount: number; description: string | null; category: string | null }[];

  const events: EventAttributes[] = transactions.map((tx) => {
    const startDate = new Date(tx.date);
    const untilDate = new Date(startDate);
    untilDate.setMonth(untilDate.getMonth() + 3);

    return {
      start: [startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate(), 7, 0] as [number, number, number, number, number],
      duration: { hours: 1 },
      title: tx.category || "Transaktion",
      description: tx.description || `Belopp: ${tx.amount}`,
      recurrenceRule: `FREQ=MONTHLY;UNTIL=${untilDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    };
  });

  const { error: icsError, value } = createEvents(events);
  if (icsError || !value) {
    return new NextResponse(JSON.stringify({ error: icsError?.message || "Okänt fel" }), { status: 500 });
  }

  const filePath = path.join(process.cwd(), "public", "calendars", `calendar-${userId}.ics`);
  fs.writeFileSync(filePath, value);

  return new NextResponse(JSON.stringify({ url: `/calendars/calendar-${userId}.ics` }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
