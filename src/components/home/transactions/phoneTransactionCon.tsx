import { formatCurrency } from "@/app/lib/formatcurrency";

const PhoneTransactionCon = ({transaction} : {transaction: {id: number, title: string, date: string, amount: number, type: string}}) => {
    return (
        <li key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-300 w-full ">
            <div className="flex flex-col">
                <p className="font-semibold text-[#0B0748] text-[clamp(0.5rem,1.2vw,1.1rem)]">{transaction.title}</p>
                <p className="text-xs text-gray-600">{new Date(transaction.date).toLocaleDateString("sv-SE", { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            </div>
                <p className={`font-semibold text-[clamp(0.5rem,1vw,1.1rem)] ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
                    {transaction.type === "income" ? "+ " : "- "}{formatCurrency(transaction.amount)} kr
                </p>
        </li>
    );
}

export default PhoneTransactionCon;