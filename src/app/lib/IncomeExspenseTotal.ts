import supabase from "./supabaseClient"

export async function getIncomeExpenseTotal(userId: string, date: Date) {
  // Skapa datumsträngar i format YYYY-MM-DD utan tid
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    .toISOString()
    .split("T")[0] // t.ex. "2025-07-01"

  const currentday = new Date()
    .toISOString()
    .split("T")[0]

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .or(
        `and(date.gte.${firstDayOfMonth},date.lte.${currentday}),and(recurring.eq.true,date.lte.${currentday})`
      );


  if (error) {
    console.error("Fel vid hämtning:", error.message)
    return { income: 0, expense: 0 }
  }

  let income = 0
  let expense = 0

  data.forEach((item) => {
    if (item.type === "inkomst") {
      income += item.amount
    } else if (item.type === "utgift") {
      expense += item.amount
    }
  })

  return { income, expense }
}