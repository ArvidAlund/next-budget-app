import supabase from "./supabaseClient"
import { createBudget } from "./createBudget"

export async function getbudget(userId: string) {
  // Försök hämta budgeten
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", userId)

  if (error) {
    console.error("Fel vid hämtning:", error.message)
    return { error }
  }

  // Om ingen budget finns, skapa (upsert) en
  if (!data || data.length === 0) {
    try {
      await createBudget(userId)

      // Hämta budgeten igen efter skapande
      const { data: newData, error: fetchError } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", userId)
        .single()  // direkt hämta ett objekt, inte array

      if (fetchError) {
        console.error("Fel vid hämtning efter skapande:", fetchError.message)
        return { error: fetchError }
      }

      return { data: newData }
    } catch (creationError) {
      console.error("Fel vid skapande av budget:", creationError)
      return { error: creationError }
    }
  }
  // Returnera första (och enda) budgetposten
  return { data: data[0] }
}
