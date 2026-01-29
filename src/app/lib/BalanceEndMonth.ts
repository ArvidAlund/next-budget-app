import getUserOption from "./db/getUserOption";
import supabase, {supabaseUserID} from "./supabaseClient";
import CreateNotification from "./db/notifications/createNotification";

/**
 * Get the number of days in the specified month for a given year.
 *
 * @param year - The full year (e.g., 2025)
 * @param month - The month as 1-12
 * @returns The number of days in that month
 */
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

// Returnerar föregående månad 
function changeMonth(year: number, month: number, minus: number): [number, number] {
  const totalMonths = (year * 12 + (month - 1)) - minus;
  const newYear = Math.floor(totalMonths / 12);
  const newMonth = (totalMonths % 12) + 1;
  return [newYear, newMonth];
}

// Formaterar datumet korrekt
function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
}


/**
 * Compute and persist the previous month's end balance for the current user when appropriate.
 *
 * Checks the user's "carryover" option and returns early if the option is explicitly disabled or cannot be read.
 * If no end-of-month balance exists for the previous month, aggregates transactions (including recurring ones up to that month)
 * and any recorded balance from two months ago to compute the net amount, then inserts an end_of_month_balances record.
 * On successful insert, creates a notification and reloads the page.
 */
export async function BalanceEndMonth(){
    const date = new Date()
    const id = await supabaseUserID();

    try {
        const userCarryover = await getUserOption("carryover");
        if (typeof userCarryover === "boolean") {
            if (!userCarryover) return;
        }
    } catch (error) {
        console.error("Error fetching carryover option:", error);
        return;
    }
    

    // Dagens datum
    const currday = date.toLocaleDateString("sv-SE").split("T")[0];
    const [year, month, day] = currday.split("-").map(Number);

    // Förra månadens år, månad och dagar
    const [Year, lastMonth] = changeMonth(year, month, 1);
    const numdays = getDaysInMonth(Year, lastMonth);

    // Första och sista dagen i förra månaden
    const lastDayPrevMonth = formatDate(Year, lastMonth, numdays);
    const firstDayPrevMonth = formatDate(Year, lastMonth, 1);

    // 2 månader sedan
    const [twoMAGYear, twoMAGMonth] = changeMonth(year, month, 2);
    const lastDayTwoMonthsAgo = formatDate(twoMAGYear, twoMAGMonth, getDaysInMonth(twoMAGYear, twoMAGMonth));


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
                if (item.type === "income") income += item.amount;
                else if (item.type === "expense") expense += item.amount;
            });

            if (balances && balances.length > 0) {
                const prev = balances[0]; // första raden
                if (prev.positive) income += prev.amount;
                else expense -= prev.amount;
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
            } else {
                try {
                    await CreateNotification({
                        title: "Månadens balans sparad",
                        message: `Din balans för ${lastMonth}/${Year} har sparats.`,
                        type: "info"
                    });
                } catch (notificationError) {
                    console.error("Error creating notification:", notificationError);
                }
                window.location.reload();
            }
        }
}