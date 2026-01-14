import supabase, { supabaseUserID } from "./supabaseClient";


export default async function expenseDiffMonth() {
    const userId = await supabaseUserID();
    if (!userId) throw new Error("User not authenticated");
    const { data: expensesMonths, error } = await supabase
        .from("transactions")
        .select("amount, date")
        .eq("user_id", userId)
        .eq("type", "expense");
    if (error) throw error;

    const now = new Date();
    const currentDay = now.getDate();
    const currentMonthExpense = expensesMonths
        ?.filter(tx => {
            const d = new Date(tx.date);
            return (
                d.getFullYear() === now.getFullYear() &&
                d.getMonth() === now.getMonth() &&
                d.getDate() <= currentDay
            );
        })
        .reduce((sum, tx) => sum + tx.amount, 0) || 0;
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthExpense = expensesMonths
        ?.filter(tx => {
            const d = new Date(tx.date);
            return (
                d.getFullYear() === prev.getFullYear() &&
                d.getMonth() === prev.getMonth() &&
                d.getDate() <= currentDay
            );
        })
        .reduce((sum, tx) => sum + tx.amount, 0) || 0;
    const rawDiff =
        previousMonthExpense === 0
            ? currentMonthExpense === 0
                ? 0
                : 100
            : ((currentMonthExpense - previousMonthExpense) / previousMonthExpense) * 100;
    return {
        percentage: Math.round(Math.abs(rawDiff)),
        positive: rawDiff >= 0,
    };
}