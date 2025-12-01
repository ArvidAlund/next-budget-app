import { supabaseUserID } from "../supabaseClient";
import supabase from "../supabaseClient";

/**
 * Retrieve transactions for the current user, optionally limited to those on or after a past date calculated by subtracting a number of months from today.
 *
 * @param numberOfMonths - If a number greater than 0 and less than 100, the function returns transactions dated on or after the date obtained by subtracting `numberOfMonths` months from today; otherwise all transactions for the user are returned. Accepts a number or string.
 * @returns An object `{ data, error }` where `data` is the array of matching transactions (or `undefined` if none) and `error` is `null` when the call completes successfully.
 * @throws Error - Throws an Error with the upstream error message when the database query returns an error.
 */
export default async function getTransactions({ numberOfMonths }: { numberOfMonths: number | string }) {
    const userId = await supabaseUserID();
    let data;
    let error;

    let dateCondition = '';
    if (typeof numberOfMonths === "number" && numberOfMonths > 0 && numberOfMonths < 100) {
        const currentDate = new Date();
        const pastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - numberOfMonths, currentDate.getDate());
        dateCondition = pastDate.toISOString().split('T')[0];

        const response = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .filter('date', 'gte', dateCondition);
        data = response.data;
        error = response.error;
    } else {
        const response = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        ;
        data = response.data;
        error = response.error;
    }

    if (error) {
        throw new Error(error.message);
    }

    return {data, error: error ?? null};
}