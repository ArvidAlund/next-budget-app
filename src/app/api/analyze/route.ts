import { NextResponse } from "next/server"
import { OpenAI } from "openai"
import { addTransaction } from "@/app/lib/transactions"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    const prompt = `
Du är en assistent som analyserar text från kvitton och utgifter. Utifrån följande text, extrahera:
- Pris (numret som är totalbelopp)
- Kategori (en av: boende, mat, transport, arbete, abonnemang, hälsa, shopping, nöjen, sparande, övrigt)
- Datum (datumet i texten, om finns)
- Kort beskrivning (kort sammanfattning av vad utgiften gäller)

Returnera resultatet i JSON-format med dessa fält: 
{
  "price": number | null,
  "category": string | null,
  "date": string | null,
  "description": string | null
}

Om något saknas, sätt värdet till null.

Text att analysera:
"""${text}"""
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Du är en hjälpsam assistent som analyserar OCR-text från kvitton." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300,
    })

    const result = completion.choices[0].message?.content || ""

    try {
      const parsed = JSON.parse(result)

      if (
        parsed.price !== null &&
        typeof parsed.price === "number" &&
        parsed.category !== null &&
        typeof parsed.category === "string" &&
        parsed.date !== null &&
        typeof parsed.date === "string"
      ) {
        try {
          await addTransaction({
            type: "utgift",
            category: parsed.category,
            amount: parsed.price,
            date: parsed.date,
            description: parsed.description || "",
            recurring: false,
          })
        } catch (dbError: unknown) {
          let message = "Kunde inte spara transaktionen i databasen."
          if (dbError instanceof Error) {
            message += ` ${dbError.message}`
          }
          return NextResponse.json({ result: parsed, warning: message })
        }
      }

      return NextResponse.json({ result: parsed }, { status: 200 })
    } catch {
      return NextResponse.json({ result, error: "Kunde inte tolka GPT-svaret som JSON" })
    }
  } catch (error: unknown) {
    let message = "OpenAI API fel"
    if (error instanceof Error) {
      message += `: ${error.message}`
    }
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
