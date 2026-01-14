import { formatCurrency } from "@/app/lib/formatcurrency";
import gsap from "gsap";
import { useEffect, useRef } from "react";

type TransactionConProps = {
    transaction: {
        id: number | string;
        description?: string;
        date: string;
        amount: number;
        type: "income" | "expense";
    };
};

const PhoneTransactionCon = ({transaction, index = 0} : TransactionConProps & {index?: number}) => {
    const transactionRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (transactionRef.current) {
            gsap.fromTo(
                transactionRef.current,
                { opacity: 0, x: '100%' },
                { opacity: 1, x: '0%', duration: 0.5, ease: "power2.out", delay: index * 0.1, }
            );
        }
    }, []);

    return (
        <li ref={transactionRef} key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-300 w-full ">
            <div className="flex flex-col">
                <p className="font-semibold text-[#0B0748] text-[clamp(0.5rem,10vw,1.1rem)]">{transaction.description ? transaction.description : "Okänd"}</p>
                <p className="text-xs text-gray-600">{new Date(transaction.date).toLocaleDateString("sv-SE", { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            </div>
                <p className={`font-semibold text-[clamp(0.5rem,10vw,1.1rem)] ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
                    {transaction.type === "income" ? "+ " : "- "}{formatCurrency(transaction.amount)} kr
                </p>
        </li>
    );
}

export default PhoneTransactionCon;