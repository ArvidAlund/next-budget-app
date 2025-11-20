import supabase from "./supabaseClient"

export async function createBudget(userId: string) {
  const defaultBudget = {
    user_id: userId,
    housing: 5000,
    food: 1500,
    transport: 750,
    work: 500,
    subscriptions: 300,
    health: 300,
    shopping: 500,
    entertainment: 500,
    savings: 500,
    other: 200,
  }

  const { data, error } = await supabase
    .from("budgets")
    .upsert([defaultBudget], { onConflict: "user_id", ignoreDuplicates: true })

  if (error) {
    console.error("Fel vid skapande/uppdatering av budget:", error.message)
    throw error
  }

  return data
}
