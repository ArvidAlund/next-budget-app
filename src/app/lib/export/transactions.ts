import supabase from "../supabaseClient";
import { supabaseUserID } from "../supabaseClient";

/**
 * Export the authenticated user's transactions as a downloadable CSV or JSON file.
 *
 * @param format - 'json' exports pretty-printed JSON (file: transactions.json, MIME: application/json); 'csv' exports a CSV with header row derived from transaction keys (file: transactions.csv, MIME: text/csv)
 * @throws Error If the user is not authenticated ("Användare inte autentiserad")
 * @throws Error If no transactions are found ("Inga transaktioner hittades att exportera")
 * @throws Error If the Supabase query returns an error
 */
export default async function exportTransactions({ format }: { format: 'csv' | 'json' }) {
  const userId = await supabaseUserID();
  if (!userId) throw new Error("Användare inte autentiserad");

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  if (!transactions || transactions.length === 0) {
    throw new Error("Inga transaktioner hittades att exportera");
  }

  let fileData: string;
  let mimeType: string;
  let fileName: string;

  if (format === "json") {
    fileData = JSON.stringify(transactions, null, 2);
    mimeType = "application/json";
    fileName = "transactions.json";
  } else {
    const headers = Object.keys(transactions[0]).join(",");
    const csvRows = transactions.map(tx =>
      Object.values(tx).map(value => `"${value}"`).join(",")
    );
    fileData = [headers, ...csvRows].join("\n");
    mimeType = "text/csv";
    fileName = "transactions.csv";
  }

  const blob = new Blob([fileData], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}