import supabase, { supabaseUserID } from "./supabaseClient";


/**
 * Compute the percentage change in expenses between the current month‑to‑date and the previous month‑to‑date.
 *
 * Queries the authenticated user's expense transactions, sums amounts up to the current day-of-month for both the current and previous months, and computes the percentage difference. If the previous month total is zero, returns `0%` when both totals are zero or `100%` when the current month has any expense.
 *
 * @returns An object with:
 *  - `percentage` — the absolute percentage change rounded to the nearest integer
 *  - `positive` — `true` if the current month-to-date expense is greater than or equal to the previous month-to-date expense, `false` otherwise
 * @throws Error if the user is not authenticated
 * @throws Error if the transactions query fails
 */
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