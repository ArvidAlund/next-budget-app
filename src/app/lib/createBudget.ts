import supabase from "./supabaseClient"

export async function createBudget(userId: string) {
  const defaultBudget = {
    user_id: userId,
    boende: 5000,
    mat: 1500,
    transport: 750,
    arbete: 500,
    abonnemang: 300,
    halsa: 300,
    shopping: 500,
    nojen: 500,
    sparande: 500,
    ovrigt: 200,
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
