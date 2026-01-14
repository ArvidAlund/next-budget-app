import { getIncomeExpenseTotal } from "@/app/lib/IncomeExspenseTotal";
import { supabaseUserID } from "@/app/lib/supabaseClient";
import BalanceAnimation from "@/components/ui/balanceAnimation";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import incomeDiffMonth from "@/app/lib/incomeDiffMonth";
import expenseDiffMonth from "@/app/lib/expenseDiffMonth";
import BouncingDots from "@/components/ui/bouncingDots";
import gsap from "gsap";
import { onEvent } from "@/app/lib/eventbus";
import { animateAwayItemsDuration } from "@/app/lib/globalSettings";
import { Transaction } from "@/app/lib/types";

const PhoneBalance = ({createdTransactions} : {createdTransactions: Transaction[] | null}) => {
    const [moneyData, setMoneyData] = useState<{ income: number; expense: number; total: number }>({
        income: 0,
        expense: 0,
        total: 0,
    });
    const [incomeDiff, setIncomeDiff] = useState<{ percentage: number; positive: boolean } | null>(null);
    const [expenseDiff, setExpenseDiff] = useState<{ percentage: number; positive: boolean } | null>(null);
    const totalIncomeRef = useRef<HTMLDivElement>(null);
    const totalExpenseRef = useRef<HTMLDivElement>(null);
    const balanceRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBalanceData = async () => {
            const userId = await supabaseUserID();
            if (!userId) {
                console.error("User not authenticated");
                setLoading(false);
                return;
            }
            try {
                const res = await getIncomeExpenseTotal(userId as string, new Date());
                setMoneyData({
                    income: res.income,
                    expense: res.expense,
                    total: res.income - res.expense,
                });
            } catch (error) {
                console.error("Error fetching balance data:", error);
            }
            try {
                const incomeDiffRes = await incomeDiffMonth();
                setIncomeDiff(incomeDiffRes);
            } catch (error) {
                console.error("Error fetching income difference:", error);
            }
            try {
                const expenseDiffRes = await expenseDiffMonth();
                setExpenseDiff(expenseDiffRes);
            } catch (error) {
                console.error("Error fetching expense difference:", error);
            }
            setLoading(false);
        }

        const unsubscribe = onEvent("animateAwayItems", () => {
            if (balanceRef.current && totalIncomeRef.current && totalExpenseRef.current) {
                gsap.to(balanceRef.current, {
                    y: "-50%",
                    opacity: 0,
                    duration: animateAwayItemsDuration,
                    ease: "power1.inOut",
                    delay: 0.1,
                });
                gsap.to(totalIncomeRef.current, {
                    x: "-150%",
                    duration: animateAwayItemsDuration,
                    ease: "power1.inOut",
                });
                gsap.to(totalExpenseRef.current, {
                    x: "150%",
                    duration: animateAwayItemsDuration,
                    ease: "power1.inOut",
                });
            }
        });

        const unsubscribeBack = onEvent("animateBackItems", () => {
            if (balanceRef.current && totalIncomeRef.current && totalExpenseRef.current) {
                gsap.to(balanceRef.current, {
                    y: "0%",
                    opacity: 1,
                    duration: animateAwayItemsDuration,
                    ease: "power1.inOut",
                    delay: 0.1,
                });
                gsap.to(totalIncomeRef.current, {
                    x: "0%",
                    duration: animateAwayItemsDuration,
                    ease: "power1.inOut",
                });
                gsap.to(totalExpenseRef.current, {
                    x: "0%",
                    duration: animateAwayItemsDuration,
                    ease: "power1.inOut",
                });
            }
        });

        fetchBalanceData();
        return () => {
            unsubscribe();
            unsubscribeBack();
        };
    }, []);

    useEffect(() => {
        if (createdTransactions && createdTransactions.length > 0) {
            let incomeSum = 0;
            let expenseSum = 0;
            createdTransactions.forEach((transaction) => {
                if (transaction.type === "income") {
                    incomeSum += transaction.amount;
                } else if (transaction.type === "expense") {
                    expenseSum += transaction.amount;
                }
            });
            setMoneyData((prev) => ({
                income: prev.income + incomeSum,
                expense: prev.expense + expenseSum,
                total: prev.total + incomeSum - expenseSum,
            }));
        }
    }, [createdTransactions]);

    return (
        <section>
            <div className="w-full flex flex-col justify-start items-start mt-8 text-white min-h-20" ref={balanceRef}>
                <p>Total balans</p>
                    {loading ? 
                    <BouncingDots color="#0B0748" gap="10px"/> :
                    <h1 className="text-center w-full text-[clamp(0.8rem,20vw,10rem)] mt-4 text-[#0B0748] text-nowrap animate-fade-in">
                        {<BalanceAnimation end={moneyData.total} />} kr
                    </h1>
                    }
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <div className="bg-white/30 backdrop-blur-md p-4 rounded flex flex-col items-start text-[#0B0748]" ref={totalIncomeRef}>
                    <p className="text-xs">Inkomster</p>
                    {loading ? 
                    <>
                        <span className="w-full h-[clamp(0.5rem,10vw,2rem)] bg-neutral-500 animate-pulse rounded-md mt-2"/>
                        <span className="w-1/3 h-3.5 bg-neutral-500 animate-pulse rounded-md mt-2"/>
                    </> :
                        <>
                            <h2 className="text-[clamp(0.5rem,10vw,2rem)] mt-2 animate-fade-in">{<BalanceAnimation end={moneyData.income} duration={500} />} kr</h2>
                            <div className="flex justify-center items-center mt-2 animate-fade-in">
                                {incomeDiff && incomeDiff.positive ? (
                                    <TrendingUp className="text-green-500" size={24}/>
                                ) : (
                                    <TrendingDown className="text-red-500" size={24}/>
                                )}
                                <p className="text-sm ml-1">
                                    {incomeDiff ? `${incomeDiff.positive ? '+' : '-'}${incomeDiff.percentage}%` : ''}
                                </p>
                            </div>
                        </>
                    }   
                </div>
                <div className="bg-white/30 backdrop-blur-md p-4 rounded flex flex-col items-start text-[#0B0748]" ref={totalExpenseRef}>
                    <p className="text-xs">Utgifter</p>
                    {loading ? 
                    <>
                        <span className="w-full h-[clamp(0.5rem,10vw,2rem)] bg-neutral-500 animate-pulse rounded-md mt-2"/>
                        <span className="w-1/3 h-3.5 bg-neutral-500 animate-pulse rounded-md mt-2"/>
                    </> : 
                    <>
                        <h2 className="text-[clamp(0.5rem,10vw,2rem)] mt-2 animate-fade-in">{<BalanceAnimation end={moneyData.expense} duration={500} />} kr</h2>
                        <div className="flex justify-center items-center mt-2 animate-fade-in">
                            {expenseDiff && expenseDiff.positive ? (
                                <TrendingUp className="text-red-500" size={24}/>
                            ) : (
                                <TrendingDown className="text-green-500" size={24}/>
                            )}
                            <p className="text-sm ml-1">
                                {expenseDiff ? `${expenseDiff.positive ? '+' : '-'}${expenseDiff.percentage}%` : ''}
                            </p>
                        </div>
                    </>
                    }
                </div>
            </div>
        </section>
    );
}
export default PhoneBalance;