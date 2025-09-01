import supabase from "./supabaseClient";
import { supabaseUserID } from "./supabaseClient";

// Returnerar antal dagar i en månad
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function changeMonth(year: number, month: number, minus: number): string {
    // Justera månaden och året manuellt
    let newMonth = month - minus; // 1-baserad
    let newYear = year;

    while (newMonth <= 0) {
        newMonth += 12;
        newYear -= 1;
    }

    // JavaScript Date använder 0-baserad månad
    const lastDay = new Date(newYear, newMonth, 0); // dag 0 = sista dagen i föregående månad
    return lastDay.toLocaleDateString("sv-SE");
}

export async function BalanceEndMonth(){
    const date = new Date()
    const currday = date.toISOString().split("T")[0];
    const numdays = getDaysInMonth(date.getFullYear(), (date.getMonth() - 1))
    const id = await supabaseUserID();
    const firstDayPrevMonth = changeMonth(date.getFullYear(), date.getMonth(), 1);
    const lastDayPrevMonth = new Date(date.getFullYear(), (date.getMonth() - 1), numdays).toLocaleDateString("sv-SE");
    const lastDayTwoMonthsAgo = changeMonth(date.getFullYear(), date.getMonth(), 2);

    if (date.getDate() === 1){

        const { data:rowExist, error:rowExistError } = await supabase
        .from("end_of_month_balances")
        .select("*")
        .eq("user_id", id)
        .eq("date", lastDayPrevMonth)
        .maybeSingle(); // returnerar null om ingen rad finns

        if (rowExistError) return

        if (!rowExist) {

            // Hämtar alla transaktioner från föregående månad

            const { data:transactions, error:transactionsError } = await supabase
            .from("transactions")
            .select("*")
            .eq("user_id", id)
            .or(
                `and(date.gte.${firstDayPrevMonth},date.lte.${lastDayPrevMonth}),and(recurring.eq.true,date.lte.${lastDayPrevMonth})`
            );

            const { data: balances, error: balancesError } = await supabase
            .from("end_of_month_balances")
            .select("*")
            .eq("user_id", id)
            .eq("date", lastDayTwoMonthsAgo);

            if (transactionsError && balancesError) return

            let income = 0;
            let expense = 0;

            //Räknar ihop alla transaktioner

            transactions?.forEach((item) => {
                if (item.type === "inkomst") income += item.amount;
                else if (item.type === "utgift") expense += item.amount;
            });

            if (balances && balances.length > 0) {
                if (balances[0].date == lastDayPrevMonth){
                const prev = balances[0]; // första raden
                if (prev.positive) income += prev.amount;
                else expense -= prev.amount;
                }
            }

            let totsum = income - expense;

            totsum = Math.round(totsum * 100) / 100;


            const isPositive = totsum > 0


            console.log("SUM: ", totsum)
            

            //Sätter in värdet i databasen

            const { error } = await supabase.from("end_of_month_balances")
            .insert([
                {
                    user_id: id,
                    date: lastDayPrevMonth,
                    amount: totsum,
                    positive: isPositive
                }
            ])

            if (error){
                console.warn("Supabase insert error: ", error.message)
            }

            window.location.reload();
        }
    }
}