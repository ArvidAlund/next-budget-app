import { getCategories } from "@/app/lib/db/getCategories";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { animateBackItemsDuration } from "@/app/lib/globalSettings";
import supabase from "@/app/lib/supabaseClient";
import { addTransaction } from "@/app/lib/transactions";
import SwitchButton from "../ui/switchButton";

interface CategoryInterface {
  category_key: string;
  icon: string;
  name_en: string;
  name_sv: string;
  transaction_type: 'income' | 'expense';
}

type TransactionData = {
    type: "income" | "expense";
    category: string;
    amount: number;
    date: string;
    description: string | undefined;
    recurring: boolean;
};

const AddTransaction = ({ onClose } : { onClose: (transactionData?: TransactionData) => void }) => {
    const [incomeOptions, setIncomeOptions] = useState<CategoryInterface[]>([])
      const [expenseOptions, setExpenseOptions] = useState<CategoryInterface[]>([])
      const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([])
      const [type, setType] = useState<"income" | "expense">("income")
      const [recurring, setRecurring] = useState<boolean>(false);
      const sectionRef = useRef<HTMLElement>(null);
      const [loggedIn, setLoggedIn] = useState<boolean>(false);

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

        if (sectionRef.current) {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: '100%' },
                { opacity: 1, y: '0%', duration: 0.5, ease: "power2.out" }
            );
        }

        const fetchUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }

        const initalize = async () => {
            await fetchUser();
            await getOptions();
        }

        initalize();
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

        const transactionData: TransactionData = {
            type: formData.get("type") as "income" | "expense",
            category: formData.get("category") as string,
            amount: Number(formData.get("amount")),
            date: formData.get("date") as string,
            description: formData.get("description") ? formData.get("description") as string : undefined,
            recurring: recurring,
        };

        if (loggedIn){
            addTransaction(transactionData);
        }

        onClose(transactionData);
      }

      const handleClose = () => {
        if (sectionRef.current) {
            gsap.to(
                sectionRef.current,
                { opacity: 0, y: '100%', duration: animateBackItemsDuration, ease: "power2.in", onComplete: () => onClose() }
            );
        }
    }

    return (
        <section ref={sectionRef} className="flex flex-col justify-start items-center absolute top-0 w-full h-screen bg-primary z-50">
            <div className="flex justify-between items-center w-full mt-4 bg-primary h-12">
                <button className="p-2 bg-black/10 rounded-full" onClick={handleClose}>
                    <ArrowLeft size={24} />
                </button>
                <h5>Skapa en transaktion</h5>
            </div>
            <form onSubmit={handleSubmit} className="mt-8">
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
                    <div className="flex items-center space-x-2">
                        <SwitchButton start={false} onChange={(value) => setRecurring(value)} />
                        <p className="mr-2">Återkommande</p>
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