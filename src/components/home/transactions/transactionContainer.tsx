import { formatCurrency } from "@/app/lib/formatcurrency";

type TransactionContainerProps = {
    amount: number;
    type: "income" | "expense";
    date: string;
    description?: string;
    height: number;
};

/**
 * Render a list item showing a transaction's description, date, and formatted amount.
 *
 * @param amount - Numeric transaction amount (displayed with currency formatting)
 * @param type - "income" or "expense"; controls the sign prefix and text color
 * @param date - Date string parsable by `Date` that will be shown as a locale date
 * @param description - Optional transaction description; falls back to "Ingen beskrivning" when absent
 * @param height - Height in pixels applied to the list item container
 * @returns A React element representing the transaction row
 */
export default function TransactionContainer({amount, type, date, description, height}: TransactionContainerProps) {
  return (
    <li className="w-full flex justify-between items-center py-2 border-b border-gray-700" style={{ height: `${height}px` }}>
        <div>
            <p className="font-medium">{description || "Ingen beskrivning"}</p>
            <p className="text-sm text-gray-400">{new Date(date).toLocaleDateString()}</p>
        </div>
        <div className={type === "income" ? "text-green-400 font-semibold" : "text-secondary font-semibold"}>
            {type === "income" ? "+ " : "- "}{formatCurrency(amount)} kr
        </div>
        
    </li>
  );
}