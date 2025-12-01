import { useState } from "react";
import supabase from "@/app/lib/supabaseClient";
import { supabaseUserID } from "@/app/lib/supabaseClient";

type Transaction = {
    id: string;
    type: "income" | "expense";
    category: string;
    amount: number;
    date: string;
    description?: string;
  };


export default function EditTransaction({transaction, onClose}: {transaction: Transaction, onClose: () => void}) {
    const [description, setDescription] = useState<string>(transaction.description || "");
    const [amount, setAmount] = useState<number>(transaction.amount);

    const SaveData = async () => {
        const user_id = await supabaseUserID();
        const { error } = await supabase
        .from("transactions")
        .update({ description: description, amount: amount })
        .eq("id", transaction.id)
        .eq("user_id", user_id);
        if (error) {
            console.error("Fel vid uppdatering:", error);
            return;
        }
        document.location.reload();
    }
    return (
        <div className="fixed inset-0 bg-neutral-800 z-50 rounded-lg w-full h-full overflow-hidden flex items-center justify-start flex-col">
            <div className="flex flex-wrap items-center h-full w-full justify-between p-4">
                <h2 className={`w-full text-2xl font-bold text-white text-center sm:w-fit`}>Redigerar Transaktion</h2>
                <form className="flex gap-4">
                    <div>
                        <label className="block text-white mb-1">Beskrivning</label>
                        <input type="text" defaultValue={transaction.description} className="w-full p-2 rounded bg-neutral-700 text-white border border-neutral-600" onChange={(e)=> setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <label className="block text-white mb-1">Belopp</label>
                        <input type="number" defaultValue={transaction.amount} className="w-full p-2 rounded bg-neutral-700 text-white border border-neutral-600" onChange={(e) => setAmount(Number(e.target.value))}/>
                    </div>
                    <div>
                    </div>
                </form>
            </div>
            <div className="flex gap-4 p-4 [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-lg [&>button]:font-semibold [&>button]:border [&>button]:border-white [&>button]:text-white [&>button]:transition-colors [&>button]:duration-300">
                <button className="hover:bg-green-500" onClick={SaveData}>Spara</button>
                <button className="hover:bg-red-500" onClick={onClose}>Avbryt</button>
            </div>
        </div>
    )
}