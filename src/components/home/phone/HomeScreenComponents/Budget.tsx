import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "@/app/lib/formatcurrency";
import ProgressBar from "@/components/ui/progressBar";
import { Sparkles } from "lucide-react";
import supabase, { supabaseUserID } from "@/app/lib/supabaseClient";
import { getIncomeExpenseTotal } from "@/app/lib/IncomeExspenseTotal";

const PhoneBudget = ({ openImproveModal } : { openImproveModal: () => void }) => {
    const [budget, setBudget] = useState<number>(0);
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const progressBarRef = useRef<HTMLElement>(null);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const fetchBudgetData = async () => {
            try {
                const userId = await supabaseUserID();

                const {data:budgetRes, error} = await supabase.from('budgets').select('*').eq('user_id', userId).single();
                if (error) {
                    console.error("Error fetching budget:", error.message);
                    return;
                }
                let sum = 0;
                if (budgetRes) {
                    for (const key in budgetRes) {
                        if (typeof budgetRes[key] === 'number' && key !== 'user_id' && key !== 'id' && budgetRes[key] !== null) {
                            sum += budgetRes[key];
                        }
                    }
                }
                setBudget(sum);
            } catch (error) {
                console.error("Error fetching budget data:", error);
            }
        };

        const fetchTotalExpense = async () => {
            try {
                const userId = await supabaseUserID();
                const res = await getIncomeExpenseTotal(userId as string, new Date());
                setTotalExpense(res.expense);
            } catch (error) {
                console.error("Error fetching total expense:", error);
            }
        };

        const loadData = async () => {
            await fetchBudgetData();
            await fetchTotalExpense();
            setLoaded(true);
        };

        loadData();
    }, []);

    return (
        <section className="mt-6" ref={progressBarRef}>
            <div className="flex justify-between items-center text-[clamp(0.5rem,3vw,1.5rem)]">
                <p>Din budget</p>
                <button className="bg-[#0B0748] p-2 rounded-full flex justify-center items-center" onClick={() => {openImproveModal();}}>
                    <Sparkles size={16} className="inline mr-2"/>
                    <span>Förbättra</span>
                </button>
            </div>
            <div className="mt-4">
                <ProgressBar start={0} end={budget} current={totalExpense} />
            </div>
            {loaded && (
            <div className="flex justify-between items-center text-[clamp(0.5rem,3vw,1.5rem)] animate-fade-in">
                <p>{formatCurrency(totalExpense)} kr</p>
                <p>{Math.round((totalExpense/budget) * 100)} %</p>
                <p>{formatCurrency(budget)} kr</p>
            </div>
            )}
        </section>
    );
}
export default PhoneBudget;