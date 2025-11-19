import supabase from "../supabaseClient";
import { supabaseUserID } from "../supabaseClient";

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
