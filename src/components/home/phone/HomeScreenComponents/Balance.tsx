import { formatCurrency } from "@/app/lib/formatcurrency";
import { getIncomeExpenseTotal } from "@/app/lib/IncomeExspenseTotal";
import { supabaseUserID } from "@/app/lib/supabaseClient";
import BalanceAnimation from "@/components/ui/balanceAnimation";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import incomeDiffMonth from "@/app/lib/incomeDiffMonth";
import expenseDiffMonth from "@/app/lib/expenseDiffMonth";

const PhoneBalance = () => {
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

    useEffect(() => {
        const fetchBalanceData = async () => {
            const userId = await supabaseUserID();
            const res = await getIncomeExpenseTotal(userId as string, new Date());
            setMoneyData({
                income: res.income,
                expense: res.expense,
                total: res.income - res.expense,
            });
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
        }
        fetchBalanceData();
    }, []);
    return (
        <section>
            <div className="w-full flex flex-col justify-center items-start mt-8 text-white" ref={balanceRef}>
                <p>Total balans</p>
                <h1 className="text-center w-full text-[clamp(0.8rem,20vw,10rem)] mt-4 text-[#0B0748] text-nowrap"><BalanceAnimation end={moneyData.total} /> kr</h1>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full mt-8">
                <div className="bg-white/30 backdrop-blur-md p-4 rounded flex flex-col items-start text-[#0B0748]" ref={totalIncomeRef}>
                    <p className="text-xs">Inkomster</p>
                    <h2 className="text-[clamp(0.5rem,10vw,2rem)] mt-2">{formatCurrency(moneyData.income)} kr</h2>
                    <div className="flex justify-center items-center mt-2">
                        {incomeDiff && incomeDiff.positive ? (
                            <TrendingUp className="text-green-500" size={24}/>
                        ) : (
                            <TrendingDown className="text-red-500" size={24}/>
                        )}
                        <p className="text-sm ml-1">
                            {incomeDiff ? `${incomeDiff.positive ? '+' : '-'}${incomeDiff.percentage}%` : ''}
                        </p>
                    </div>
                </div>
                <div className="bg-white/30 backdrop-blur-md p-4 rounded flex flex-col items-start text-[#0B0748]" ref={totalExpenseRef}>
                    <p className="text-xs">Utgifter</p>
                    <h2 className="text-[clamp(0.5rem,10vw,2rem)] mt-2">{formatCurrency(moneyData.expense)} kr</h2>
                    <div className="flex justify-center items-center mt-2">
                        {expenseDiff && expenseDiff.positive ? (
                            <TrendingUp className="text-red-500" size={24}/>
                        ) : (
                            <TrendingDown className="text-green-500" size={24}/>
                        )}
                        <p className="text-sm ml-1">
                            {expenseDiff ? `${expenseDiff.positive ? '+' : '-'}${expenseDiff.percentage}%` : ''}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default PhoneBalance;