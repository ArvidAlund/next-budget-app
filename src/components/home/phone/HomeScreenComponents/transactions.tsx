import { Plus } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import PhoneTransactionCon from "../../transactions/phoneTransactionCon";
import { GetTransactionsMonth } from "@/app/lib/getTransactionsMonth";
import gsap from "gsap";
import { animateAwayItemsDuration, animateBackItemsDuration } from "@/app/lib/globalSettings";
import { onEvent } from "@/app/lib/eventbus";
import { Transaction } from "@/app/lib/types";

const PhoneTransactions = ({openNewTransaction, openAllTransactions, createdTransactions} : {openNewTransaction: () => void, openAllTransactions: () => void, createdTransactions: Transaction[] | null}) => {
    const startAmountToShow = 10;
    const transactionsConRef = useRef<HTMLElement>(null);
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
    const [transactionsToShow, setTransactionsToShow] = useState<number>(startAmountToShow);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [timesClickedLoadMore, setTimesClickedLoadMore] = useState<number>(0);

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

        const unsubscribe = onEvent("animateAwayItems", () => {
            if (transactionsConRef.current) {
                gsap.to(transactionsConRef.current, {
                    y: "150%",
                    opacity: 0,
                    duration: animateAwayItemsDuration,
                    ease: "power1.inOut",
                    delay: 0.1,
                });
            }
        });

        const unsubscribeBack = onEvent("animateBackItems", () => {
            if (transactionsConRef.current) {
                gsap.to(transactionsConRef.current, {
                    y: "0%",
                    opacity: 1,
                    duration: animateBackItemsDuration,
                    ease: "power1.inOut",
                    delay: 0.1,
                });
            }
        });

        return () => {
            unsubscribe();
            unsubscribeBack();
        };
    }, []);

    useEffect(() => {
        if (createdTransactions && createdTransactions.length > 0) {
            setTransactionsList(prev => {
                if (!prev) return createdTransactions;
                const combined = [...createdTransactions, ...prev];
                const uniqueTransactions = combined.filter((transaction, index, self) =>
                    index === self.findIndex((t) => t.id === transaction.id)
                );
                return uniqueTransactions;
            });
        }
    }, [createdTransactions]);

    return (
        <section ref={transactionsConRef} className="w-full h-fit rounded-t-3xl bg-white mt-6 flex-1">
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
                    <PhoneTransactionCon key={transaction.id} transaction={transaction} index={startAmountToShow === transactionsToShow ? index : index - (startAmountToShow * timesClickedLoadMore)} />
                ))}
            </ul>
            {loaded && (
                <>
                    {transactionsToShow < transactionsList.length ? (
                        <button onClick={() => {setTransactionsToShow(transactionsToShow + 8); setTimesClickedLoadMore(timesClickedLoadMore + 1);}} className="bg-[#0B0748] p-3 rounded-full flex justify-center items-center text-white text-[clamp(0.5rem,3vw,1.5rem)] my-2 m-auto px-10">Ladda fler</button>
                    ) : (
                        <button onClick={() => openAllTransactions()} className="bg-[#0B0748] p-3 rounded-full flex justify-center items-center text-white text-[clamp(0.5rem,3vw,1.5rem)] my-2 m-auto px-10">Visa alla</button>
                    )}
                </>
            )}
        </section>
    )
};

export default PhoneTransactions;