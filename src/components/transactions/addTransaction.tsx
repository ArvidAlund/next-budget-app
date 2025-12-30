import { getCategories } from "@/app/lib/db/getCategories";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

interface CategoryInterface {
  category_key: string;
  icon: string;
  name_en: string;
  name_sv: string;
  transaction_type: 'income' | 'expense';
}

const AddTransaction = ({ onClose } : { onClose: (transactionData?: { type: "income" | "expense"; category: string; amount: string; date: string; title: string; description?: string | null }) => void }) => {
    const [incomeOptions, setIncomeOptions] = useState<CategoryInterface[]>([])
      const [expenseOptions, setExpenseOptions] = useState<CategoryInterface[]>([])
      const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([])
      const [type, setType] = useState<"income" | "expense">("income")

    useEffect(() => {
    
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


      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const transactionData = { 
            type, 
            category: formData.get("category") as string, 
            amount: formData.get("amount") as string, 
            date: formData.get("date") as string, 
            title: formData.get("title") as string, 
            description: formData.get("description") as string | null, };

        onClose(transactionData);
      }
    return (
        <section className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-between items-center w-full mt-4 bg-primary h-12">
                <button className="p-2 bg-black/10 rounded-full" onClick={() => onClose()}>
                    <ArrowLeft size={24} />
                </button>
                <h5>Skapa en transaktion</h5>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex flex-col w-full p-4 space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="type">Typ</label>
                        <select id="type" name="type" className="p-2 rounded border border-gray-300 *:bg-black" value={type} onChange={(e) => setType(e.target.value as "income" | "expense")}>
                            <option value="income">Inkomst</option>
                            <option value="expense">Utgift</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category">Kategori</label>
                        <select id="category" name="category" className="p-2 rounded border border-gray-300 *:bg-black">
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="title">Titel </label>
                        <input type="text" id="title" name="title" required className="p-2 rounded border border-gray-300 *:bg-black w-full"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description">Beskrivning (valfritt)</label>
                        <input type="text" id="description" name="description" className="p-2 rounded border border-gray-300 *:bg-black w-full"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="amount">Belopp</label>
                        <input type="number" id="amount" name="amount" required className="p-2 rounded border border-gray-300 *:bg-black"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="date">Datum</label>
                        <input type="date" id="date" name="date" className="p-2 rounded border border-gray-300" defaultValue={new Date().toISOString().split("T")[0]} />
                    </div>
                    <button type="submit" className="bg-green-700 hover:bg-green-900 text-white p-2 rounded mt-4">Lägg till transaktion</button>
                </div>
            </form>
        </section>
    );
}

export default AddTransaction;