import { Plus } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import PhoneTransactionCon from "../../transactions/phoneTransactionCon";
import { GetTransactionsMonth } from "@/app/lib/getTransactionsMonth";
import gsap from "gsap";

type Transaction = {
    id: string;
    type: "income" | "expense";
    category: string;
    amount: number;
    date: string;
    description?: string;
    user_id: string;
    recurring: boolean;
};

const PhoneTransactions = ({openNewTransaction, openAllTransactions} : {openNewTransaction: () => void, openAllTransactions: () => void}) => {
    const transactionsConRef = useRef<HTMLElement>(null);
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
    const [addTransactionOpen, setAddTransactionOpen] = useState<boolean>(false);
    const [transactionsToShow, setTransactionsToShow] = useState<number>(8);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            const res = await GetTransactionsMonth();
            if (res.error) {
                console.error("Error fetching transactions:", res.error);
                return;
            }
            setTransactionsList(res.data || []);
            setLoaded(true);
        }
        fetchTransactions();

        if (transactionsConRef.current) {
            gsap.fromTo(
                transactionsConRef.current,
                { opacity: 0, y: '100%' },
                { opacity: 1, y: '0%', duration: 0.5, ease: "power2.out" }
            );
        }
    }, []);

    return (
        <section ref={transactionsConRef} className="w-full h-fit max-h-screen rounded-t-3xl bg-white mt-6 flex-1">
            <div className="flex justify-between items-center p-2">
                <h3 className="text-[#0B0748] font-semibold w-fit text-[clamp(0.5rem,5vw,1.5rem)]">Senaste transaktioner</h3>
                <button className="bg-[#0B0748] p-3 rounded-full flex justify-center items-center text-white text-[clamp(0.5rem,3vw,1.5rem)]" onClick={() => {openNewTransaction();}}>
                    <Plus size={16} className="inline mr-2"/>
                    <span className="text-nowrap">Lägg till</span>
                </button>
            </div>
            <ul className="px-4 pb-4">
                {transactionsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, transactionsToShow)
                .map((transaction, index) => (
                    <PhoneTransactionCon key={transaction.id} transaction={transaction} index={index} />
                ))}
            </ul>
            {loaded && (
                <>
                    {transactionsToShow < transactionsList.length ? (
                        <button onClick={() => setTransactionsToShow(transactionsToShow + 8)} className="bg-[#0B0748] p-3 rounded-full flex justify-center items-center text-white text-[clamp(0.5rem,3vw,1.5rem)] my-2 m-auto px-10">Ladda fler</button>
                    ) : (
                        <button onClick={() => openAllTransactions()} className="bg-[#0B0748] p-3 rounded-full flex justify-center items-center text-white text-[clamp(0.5rem,3vw,1.5rem)] my-2 m-auto px-10">Visa alla</button>
                    )}
                </>
            )}
        </section>
    )
};

export default PhoneTransactions;