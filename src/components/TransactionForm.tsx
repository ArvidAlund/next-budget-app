import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// Typdefinition för en transaktion – bestämmer vilka fält som ska finnas
type Transaction = {
  title: string
  amount: number
  category: string
  date: string
}

// Props för TransactionForm – vi kräver en funktion `onAdd` från föräldern
type Props = {
  onAdd: (t: Transaction) => void
}

/**
 * TransactionForm
 * ----------------
 * Ett formulär för att skapa nya transaktioner.
 * Tar emot en callback `onAdd` som körs när formuläret skickas.
 */
export function TransactionForm({ onAdd }: Props) {
  // Lokalt state som håller reda på vad användaren fyllt i
  const [form, setForm] = useState<Transaction>({
    title: "",
    amount: 0,
    category: "",
    date: "",
  })

  /**
   * Hanterar förändringar i inputfält.
   * Uppdaterar rätt property i `form` baserat på fältnamnet.
   * Konverterar amount till Number för att undvika strängvärde.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }))
  }

  /**
   * Hanterar inskick av formuläret.
   * Stoppar sidladdning, gör enkel validering och skickar vidare datan.
   * Nollställer formuläret efteråt.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Enkel validering: titel, belopp och datum måste vara ifyllda
    if (!form.title || !form.amount || !form.date) return

    onAdd(form) // Skickar transaktionen till föräldern

    // Nollställ formuläret för ny inmatning
    setForm({ title: "", amount: 0, category: "", date: "" })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md w-full max-w-md"
    >
      {/* Titel-fält */}
      <div>
        <Label htmlFor="title">Titel</Label>
        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Belopp-fält */}
      <div>
        <Label htmlFor="amount">Belopp</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          required
        />
      </div>

      {/* Kategori-fält */}
      <div>
        <Label htmlFor="category">Kategori</Label>
        <Input
          id="category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />
      </div>

      {/* Datum-fält */}
      <div>
        <Label htmlFor="date">Datum</Label>
        <Input
          id="date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Skicka-knapp */}
      <Button type="submit">Lägg till</Button>
    </form>
  )
}
