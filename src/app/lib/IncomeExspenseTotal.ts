import supabase from "./supabaseClient"

export async function getIncomeExpenseTotal(userId: string, date: Date) {
  let currentMonth = date.getMonth() + 1;
  let currentYear = date.getFullYear();

  // Datum för första dagen i månaden
  const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1)
    .toLocaleDateString("sv-SE");
  const currentday = new Date().toLocaleDateString("sv-SE");

  // Hämta transaktioner
  const { data: transactions, error: txError } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .or(
      `and(date.gte.${firstDayOfMonth},date.lte.${currentday}),and(recurring.is.true,date.lte.${currentday})`
    );

  // Flytta till föregående månad
  if (currentMonth === 1) {
    currentMonth = 12;
    currentYear -= 1;
  } else {
    currentMonth -= 1;
  }

  const firstDayPrevMonth = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;

  // Hämta föregående månads balans
  const { data: balances, error: balancesError } = await supabase
    .from("end_of_month_balances")
    .select("*")
    .eq("user_id", userId)
    .gte("date", firstDayPrevMonth);

  if (txError || balancesError) {
    console.error("Fel vid hämtning:", txError?.message || balancesError?.message);
    return { income: 0, expense: 0 };
  }

  // Summera income och expense
  let income = 0;
  let expense = 0;

  transactions?.forEach((item) => {
    if (parseInt(item.date.split("-")[2], 10) > date.getDate()) return;
    
    if (item.type === "income") income += item.amount;
    else if (item.type === "expense") expense += item.amount;
    
    });

  // Lägg till föregående månads balans
  if (balances && balances.length > 0) {
    if (balances[0].date != currentday){
      const prev = balances[0]; // första raden
      if (prev.positive) income += prev.amount;
      else expense -= prev.amount;
    }
  }

  return { income, expense };
}
