import { getIncomeExpenseTotal } from "./IncomeExspenseTotal";
import supabase, { supabaseUserID } from "./supabaseClient";

export default async function calcInvestment(): Promise<number> {
    const date = new Date();
    if (date.getDate() < 25) return 0
    const dateMinus:number = date.getDate() - 24;
    date.setDate(date.getDate() - dateMinus);

    const user = await supabaseUserID();

    const {income, expense} = await getIncomeExpenseTotal(user, date);

    const {data:incomeToday, error:incomeTodayError} = await supabase
    .from("transactions")
    .select("amount")
    .eq("user_id", user)
    .eq("date", date.toLocaleDateString("sv-SE"))
    .eq("type", "inkomst")

    if(incomeTodayError) return 0

    let incomeTodayTotal: number = 0;

    for (let index = 0; index < incomeToday.length; index++) {
        const amount = incomeToday[index]["amount"];
        incomeTodayTotal += amount;
    }

    const totinvest: number = (Number(income) - Number(expense)) - incomeTodayTotal;

    return Math.round(totinvest)
}