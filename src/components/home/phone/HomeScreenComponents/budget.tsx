import { useEffect, useRef, useState } from "react";
import { formatCurrency } from "@/app/lib/formatcurrency";
import ProgressBar from "@/components/ui/progressBar";
import { Sparkles } from "lucide-react";
import { supabaseUserID } from "@/app/lib/supabaseClient";
import { getIncomeExpenseTotal } from "@/app/lib/IncomeExspenseTotal";
import { onEvent } from "@/app/lib/eventbus";
import { animateAwayItemsDuration, animateBackItemsDuration } from "@/app/lib/globalSettings";
import gsap from "gsap";
import createNotification from "@/app/lib/db/notifications/createNotification";
import getBudget from "@/app/lib/db/getBudget";

const PhoneBudget = ({ openImproveModal } : { openImproveModal: () => void }) => {
    const [budget, setBudget] = useState<number>(0);
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const progressBarRef = useRef<HTMLElement>(null);
    const lastNotifiedRef = useRef<number | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        const fetchBudgetData = async () => {
            try {
                const res = await getBudget();
                setBudget(res.total as number);
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

        const unsubscribe = onEvent("animateAwayItems", () => {
            if (progressBarRef.current) {
                gsap.to(progressBarRef.current, {
                y: "100%",
                opacity: 0,
                duration: animateAwayItemsDuration,
                ease: "power1.inOut",
            });
            }
        });

        const unsubscribeBack = onEvent("animateBackItems", () => {
            if (progressBarRef.current) {
                gsap.to(progressBarRef.current, {
                y: "0%",
                opacity: 1,
                duration: animateBackItemsDuration,
                ease: "power1.inOut",
            });
            }
        });

        loadData();

        return () => {
            unsubscribe();
            unsubscribeBack();
        };
    }, []);

    useEffect(() => {
        const NewNotification = async (amount: number) => {
            try {
                await createNotification({
                    title: "Budgetvarning",
                    message: `Du har spenderat över ${amount}% av din budget för denna månad.`,
                    type: "warning"
                });
            } catch (err) {
                console.error("Error creating budget notification:", err);
            }
        };

        if (!totalExpense || !budget) return;
        let threshold: number | null = null;
        if (totalExpense >= budget) threshold = 100;
        else if (totalExpense >= budget * 0.9) threshold = 90;
        else if (totalExpense >= budget * 0.8) threshold = 80;

        if (threshold !== null && lastNotifiedRef.current !== threshold) {
            lastNotifiedRef.current = threshold;
            void NewNotification(threshold);
        }
    }, [totalExpense, budget]);
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
                <p>{budget > 0 ? Math.round((totalExpense/budget) * 100) : 0} %</p>
                <p>{formatCurrency(budget)} kr</p>
            </div>
            )}
        </section>
    );
}
export default PhoneBudget;