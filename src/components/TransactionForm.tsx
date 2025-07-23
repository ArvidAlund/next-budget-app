import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

// Typ för en transaktion – så vi vet vilka fält den ska innehålla
type Transaction = {
  title: string
  amount: number
  category: string
  date: string
}

// Props till komponenten – vi skickar med en funktion som heter `onAdd`
type Props = {
  onAdd: (t: Transaction) => void
}

// Formulärkomponenten
export function TransactionForm({ onAdd }: Props) {
  // State för att hålla koll på vad användaren har skrivit i formuläret
  const [form, setForm] = useState<Transaction>({
    title: "",
    amount: 0,
    category: "",
    date: "",
  })

  // När användaren skriver i ett inputfält
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Uppdaterar rätt fält i form-objektet
    setForm((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }))
  }

  // När formuläret skickas (t.ex. när man trycker på "Lägg till")
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // Hindrar att sidan laddas om

    // Enkel validering – kräver att några fält är ifyllda
    if (!form.title || !form.amount || !form.date) return

    onAdd(form) // Skickar datan till föräldern (App)

    // Töm formuläret efter inskick
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
