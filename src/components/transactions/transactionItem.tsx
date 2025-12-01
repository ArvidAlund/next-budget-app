import { formatCurrency } from "@/app/lib/formatcurrency";
import gsap from "gsap";
import { useRef, useEffect, useState } from "react";
import EditTransaction from "./editTransaction";


type Transaction = {
    id: string;
    type: "income" | "expense";
    category: string;
    amount: number;
    date: string;
    description?: string;
  };
type Props = {
    transaction: Transaction;
    index: number;
}

export default function TransactionItem({ transaction, index, }: Props) {
    const itemRef = useRef<HTMLDivElement>(null);
    const [extended, setExtended] = useState(false);
    useEffect(() => {
        if (itemRef.current) {
            gsap.fromTo(
                itemRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, delay: index * 0.05, duration: 0.3 }
            );
        }
    }, [index]);    
    return (
        <div
            ref={itemRef}
            key={transaction.id}
            className={`${extended ? "h-52" : ""}`}
            >
            {extended && (
                <EditTransaction transaction={transaction} onClose={() => setExtended(false)}/>
            )}
            <div className={`w-full flex justify-between items-center p-4 rounded-lg mb-2 text-white hover:bg-neutral-600 transition-colors duration-300 cursor-pointer ${index % 2 === 0 ? "bg-neutral-800" : "bg-neutral-700"}`} onClick={() => setExtended(!extended)}>
                <div>
                    <h4 className="font-bold text-lg">{transaction.description ?? "Ingen beskrivning"}</h4>
                    <p className="text-sm">{transaction.date}</p>
                </div>
                <p className={`${transaction.type === "income" ? "text-green-500" : "text-red-500"} font-semibold text-lg`}>
                    {formatCurrency(transaction.amount)} kr
                </p>
            </div>
        </div>
    )
}