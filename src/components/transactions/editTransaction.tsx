import { useState } from "react";
import supabase from "@/app/lib/supabaseClient";
import { supabaseUserID } from "@/app/lib/supabaseClient";
import StopRecurring from "@/app/lib/db/stopRecurring";

type Transaction = {
    id: string;
    type: "income" | "expense";
    category: string;
    amount: number;
    date: string;
    description?: string;
    recurring?: boolean;
  };


/**
 * Render a full-screen modal for editing a transaction and persist description and amount updates.
 *
 * The component displays inputs prefilled from `transaction` for description and amount, provides
 * "Spara" to save changes (updates the current user's transaction record and reloads the page)
 * and "Avbryt" to close the modal without saving.
 *
 * @param transaction - The transaction to edit; `description` and `amount` are shown and can be modified.
 * @param onClose - Callback invoked when the user cancels editing.
 * @returns The modal JSX element for editing the provided transaction.
 */
export default function EditTransaction({transaction, onClose}: {transaction: Transaction, onClose: () => void}) {
    const [description, setDescription] = useState<string>(transaction.description || "");
    const [amount, setAmount] = useState<number>(transaction.amount);

    const SaveData = async () => {
        const user_id = await supabaseUserID();
        if (!user_id) return;
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

    const stopRecurring = async () => {
        const res = await StopRecurring(transaction.id);
        if (res && res.error) {
            console.error("Fel vid avslutning av återkommande transaktion:", res.error);
            return;
        }
        if (res && res.success) {
            document.location.reload();
        }
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
            <div className="w-full grid grid-cols-4 p-4 [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-lg [&>button]:font-semibold [&>button]:border [&>button]:border-white [&>button]:text-white [&>button]:transition-colors [&>button]:duration-300">
                <div className="gap-4 flex justify-center [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-lg [&>button]:font-semibold [&>button]:border [&>button]:border-white [&>button]:text-white [&>button]:transition-colors [&>button]:duration-300 col-start-2 col-span-2">
                    <button type="button" className="hover:bg-green-500" onClick={SaveData}>Spara</button>
                    <button type="button" className="hover:bg-red-500" onClick={onClose}>Avbryt</button>
                </div>
                {transaction.recurring && (<button type="button" className="hover:bg-red-700" onClick={stopRecurring}>Avsluta Återkommande</button>
                )}
            </div>
        </div>
    )
}