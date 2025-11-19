import checkOrCreateUser from "../db/checkUser";

/**
 * Export the current user's data and trigger a file download in the chosen format.
 *
 * @param format - Desired export format; either `'json'` to download the full user object as pretty-printed JSON or `'csv'` to download a single-row CSV with object keys as headers
 * @throws Error - If no authenticated user is available (message: "Användare inte autentiserad")
 */
export default async function exportUserData({ format }: { format: 'csv' | 'json' }) {
  const user = await checkOrCreateUser();
  if (!user) throw new Error("Användare inte autentiserad");

  let fileData: string;
  let mimeType: string;
  let fileName: string;

  if (format === "json") {
    // Exportera hela user-objektet som JSON
    fileData = JSON.stringify(user, null, 2);
    mimeType = "application/json";
    fileName = "userdata.json";
  } else {
    // Exportera user-objektet som CSV
    const headers = Object.keys(user).join(",");
    const values = Object.values(user).map(value => `"${value}"`).join(",");
    fileData = [headers, values].join("\n");
    mimeType = "text/csv";
    fileName = "userdata.csv";
  }

  // Skapa nedladdningsfil
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