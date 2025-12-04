import { formatCurrency } from "@/app/lib/formatcurrency";

type TransactionContainerProps = {
    amount: number;
    type: "income" | "expense";
    date: string;
    description?: string;
    key: string;
    height: number;
};

export default function TransactionContainer({amount, type, date, description, key, height}: TransactionContainerProps) {
  return (
    <li key={key} className="w-full flex justify-between items-center py-2 border-b border-gray-700" style={{ height: `${height}px` }}>
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