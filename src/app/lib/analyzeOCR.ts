export async function AnalyzeOCR(text: string) {
  const res = await fetch("/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || "Kunde inte analysera OCR-text")
  }

  return res.json()
}
