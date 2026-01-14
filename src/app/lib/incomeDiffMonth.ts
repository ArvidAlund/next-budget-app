import supabase, { supabaseUserID } from "./supabaseClient";

/**
 * Compute how much income has changed between the current month (up to today) and the previous month (up to the same day).
 *
 * @returns An object with `percentage` — the absolute percentage difference rounded to the nearest integer, and `positive` — `true` if current month income is greater than or equal to previous month income, `false` otherwise.
 * @throws If there is no authenticated user.
 * @throws If the transactions query returns an error.
 */
export default async function incomeDiffMonth() {
    const userId = await supabaseUserID();
    if (!userId) throw new Error("User not authenticated");

    const { data: incomesMonths, error } = await supabase
        .from("transactions")
        .select("amount, date")
        .eq("user_id", userId)
        .eq("type", "income");

    if (error) throw error;

    const now = new Date();
    const currentDay = now.getDate();

    const currentMonthIncome = incomesMonths
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

    const previousMonthIncome = incomesMonths
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
        previousMonthIncome === 0
            ? currentMonthIncome === 0
                ? 0
                : 100
            : ((currentMonthIncome - previousMonthIncome) / previousMonthIncome) * 100;

    return {
        percentage: Math.round(Math.abs(rawDiff)),
        positive: rawDiff >= 0,
    };
}
