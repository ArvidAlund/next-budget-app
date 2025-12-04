"use client"

import { useState, useEffect } from "react"
import { ComboBox } from "../ui/combobox"
import { X } from "lucide-react"
import { addTransaction } from "@/app/lib/transactions"
import { ScanReceipt } from "./ScanReceipt"
import { useRouter } from "next/navigation";
import { getCategories } from "@/app/lib/db/getCategories"

interface CategoryInterface {
  category_key: string;
  icon: string;
  name_en: string;
  name_sv: string;
  transaction_type: 'income' | 'expense';
}

export function AddTransactionModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (type: "good" | "bad") => void;
}) {
  const router = useRouter();

  // Formulär state
  const [type, setType] = useState<"income" | "expense">("income")
  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [recurring, setRecurring] = useState(false);
  const [incomeOptions, setIncomeOptions] = useState<CategoryInterface[]>([])
  const [expenseOptions, setExpenseOptions] = useState<CategoryInterface[]>([])
  const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([])


  // Sätt default datum till idag
  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);

    const getOptions = async () => {
      const categorys: CategoryInterface[] = await getCategories();

      const incomeOpts: CategoryInterface[] = [];
      const expenseOpts: CategoryInterface[] = [];

      for (const cat of categorys) {
        if (cat.transaction_type.includes("income")) {
          incomeOpts.push(cat);
        }
        if (cat.transaction_type.includes("expense")) {
          expenseOpts.push(cat);
        }
      }

      incomeOpts.sort((a, b) => a.name_sv.localeCompare(b.name_sv));
      expenseOpts.sort((a, b) => a.name_sv.localeCompare(b.name_sv));

      setIncomeOptions(incomeOpts);
      setExpenseOptions(expenseOpts);
    };

    getOptions();
  }, []);
  

  useEffect(() => {
    const chosenCategoryOptions = (type === "income" ? incomeOptions : expenseOptions).map(cat => ({
      value: cat.category_key,
      label: cat.name_sv
    }));
    setCategoryOptions(chosenCategoryOptions);
  }, [incomeOptions, expenseOptions, type]);


  // Skicka formulär
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!category || !amount || !date) {
      alert("Vänligen fyll i alla obligatoriska fält")
      return
    }

    setLoading(true)
    try {
      const error = await addTransaction({
        type,
        category,
        description,
        amount: Number(amount),
        date,
        recurring
      })

      if (error === false){
        alert("En transaktion med samma beskrivning är redan sparad.")
      } else {
        onSuccess("good");
        router.refresh();
        onClose();
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed min-w-full min-h-screen inset-0 bg-black/60 flex justify-center items-center px-4 text-black z-10">
        <div className="bg-primary text-secondary rounded-2xl w-full max-w-md max-h-[90vh] p-6 overflow-y-auto relative shadow-lg">
          
          {/* Stäng-knapp */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X />
          </button>

          <h2 className="text-xl font-semibold mb-6 text-center">
            Lägg till Transaktion
          </h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Typ av transaktion */}
            <ComboBox
              label="Typ*"
              value={type}
              onChange={(val) => setType(val === "income" ? "income" : "expense")}
              options={[
                { value: "income", label: "Inkomst" },
                { value: "expense", label: "Utgift" },
              ]}
            />

            {/* Kategori */}
            <ComboBox
              label="Kategori*"
              value={category}
              onChange={setCategory}
              options={categoryOptions}
              placeholder="Välj kategori"
            />

            {/* Återkommande checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="recurring"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
                className="peer hidden"
              />
              <div className="w-5 h-5 rounded-md border border-gray-400 peer-checked:bg-amber-500 flex items-center justify-center transition">
                <svg
                  className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <label htmlFor="recurring" className="text-sm font-medium select-none">
                Återkommande
              </label>
            </div>

            {/* Beskrivning */}
            <div>
              <label className="block mb-1 font-medium">{recurring ? "Beskrivning*" : "Beskrivning"}</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="..."
              />
            </div>

            {/* Belopp */}
            <div>
              <label className="block mb-1 font-medium">Belopp*</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="kr"
              />
            </div>

            {/* Datum */}
            <div>
              <label className="block mb-1 font-medium">Datum*</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* Spara knapp */}
            <button
              type="submit"
              className="!bg-amber-500 text-white py-2 rounded hover:bg-amber-600 mt-2"
              disabled={loading}
            >
              {loading ? "Sparar..." : "Spara"}
            </button>
          </form>

          {/* Skanna kvitto */}
          {/* <button
            className="!bg-gray-700 text-white py-2 rounded hover:bg-amber-600 mt-2 w-full"
            onClick={() => setShowScanner(true)}
          >
            Skanna kvitto
          </button> */}
        </div>
      </div>

      {/* OCR Scanner */}
      {showScanner && <ScanReceipt onClose={() => setShowScanner(false)} />}
    </>
  )
}
