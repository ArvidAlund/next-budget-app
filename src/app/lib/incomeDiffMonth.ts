import supabase, { supabaseUserID } from "./supabaseClient";

/**
 * Calculate the percentage difference in income between the current month and the previous month.
 * @returns An object containing the percentage difference and a boolean indicating if the difference is positive.
 */
export default async function incomeDiffMonth() {
    const userId = await supabaseUserID();
    if (!userId) {
        throw new Error("User not authenticated");
    }
    const { data: incomesMonths, error } = await supabase.from('transactions')
        .select('amount, date')
        .eq('user_id', userId)
        .eq('type', 'income');
    
    if (error) {
        throw error;
    }

    const now = new Date();

    const currentMonthIncome = incomesMonths?.filter(tx => {
        const txDate = new Date(tx.date);
        return txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear();
    }).reduce((sum, tx) => sum + tx.amount, 0) || 0;

    const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthIncome = incomesMonths?.filter(tx => {
        const txDate = new Date(tx.date);
        return txDate.getMonth() === previousMonth.getMonth() && txDate.getFullYear() === previousMonth.getFullYear();
    }).reduce((sum, tx) => sum + tx.amount, 0) || 0;

    let rawDiff;
    if (previousMonthIncome === 0) {
        rawDiff = currentMonthIncome === 0 ? 0 : 100;
    } else {
        rawDiff = ((currentMonthIncome - previousMonthIncome) / previousMonthIncome) * 100;
    }

    const percentage = Math.round(Math.abs(rawDiff));
    const positive = rawDiff >= 0;

    return { percentage, positive };
}
