import { getIncomeExpenseTotal } from "./IncomeExspenseTotal";
import supabase, { supabaseUserID } from "./supabaseClient";
import createNotification from "./db/notifications/createNotification";
import getAvanzaInvestment from "./db/getAvanzaInvestment";
import { formatCurrency } from "./formatcurrency";

/**
 * Calculate the user's monthly investable amount and indicate whether it has already been invested.
 *
 * @returns `0` if the current day of the month is before the 25th; otherwise an object with:
 * - `amount`: the rounded investable amount calculated as (income - expense) minus today's income, and
 * - `invested`: `true` if a matching Avanza investment was found (a notification is created), `false` if no existing investment was found (a notification with the calculated amount is created).
 */
export default async function calcInvestment(): Promise<{amount: number, invested: boolean} | 0> {
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

    if(incomeTodayError) return {amount: 0, invested: false};

    let incomeTodayTotal: number = 0;

    for (let index = 0; index < incomeToday.length; index++) {
        const amount = incomeToday[index]["amount"];
        incomeTodayTotal += amount;
    }

    const totinvest: number = Math.round((Number(income) - Number(expense)) - incomeTodayTotal);

    const existingInvestment = await getAvanzaInvestment(totinvest);
    if (existingInvestment && existingInvestment.length > 0) {
        createNotification({
            title: "Månatlig investering gjord",
            message: `Din rekommenderade investering för denna månad på ${formatCurrency(totinvest)} kr har registrerats.`,
            type: "info"
        });
        return {amount: totinvest, invested: true};
    }

    await createNotification({
        title: "Månatlig investering beräknad",
        message: `Din rekommenderade investering för denna månad är ${formatCurrency(totinvest)} kr.`,
        type: "info"
    });
    return {amount: totinvest, invested: false};
}