import supabase from "@/app/lib/supabaseClient"

export async function addTransaction(transaction: {
  type: string
  category: string
  amount: number
  date: string
  description?: string
  recurring:boolean
}) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error("Ingen användare inloggad")
  }

  const { error } = await supabase.from("transactions").insert([
    {
      ...transaction,
      user_id: user.id,
    },
  ])

  if (error) throw new Error("Fel vid insättning: " + error.message)
}
