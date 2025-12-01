import { supabaseUserID } from "../supabaseClient";
import supabase from "../supabaseClient";

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