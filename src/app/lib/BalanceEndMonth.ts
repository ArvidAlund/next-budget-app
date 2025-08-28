import supabase from "./supabaseClient";
import { supabaseUserID } from "./supabaseClient";
import { getIncomeExpenseTotal } from "./IncomeExspenseTotal";

// Returnerar antal dagar i en månad
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export async function BalanceEndMonth(){
    const date = new Date()
    const currday = date.toISOString().split("T")[0];
    const numdays = getDaysInMonth(date.getFullYear(), date.getMonth())
    const id = await supabaseUserID();

    if (date.getDate() === numdays){

        const { data:rowExist, error:rowExistError } = await supabase
        .from("end_of_month_balances")
        .select("*")
        .eq("user_id", id)
        .eq("date", currday)
        .maybeSingle(); // returnerar null om ingen rad finns

        if (rowExistError) return

        if (!rowExist) {
            const {income, expense} = await getIncomeExpenseTotal(id, date)

            const totsum = income - expense

            const isPositive =totsum > 0

            const { error } = await supabase.from("end_of_month_balances")
            .insert([
                {
                    user_id: id,
                    date: currday,
                    amount: totsum,
                    positive: isPositive
                }
            ])

            if (error){
                console.warn("Supabase insert error: ", error.message)
            }
        }
    }
}