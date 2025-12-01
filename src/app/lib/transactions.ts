import supabase from "@/app/lib/supabaseClient"

export async function addTransaction(transaction: {
  type: "income" | "expense"
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

  if (transaction.recurring === true) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("recurring", true)
      .eq("description", transaction.description)
      .eq("user_id", user.id);

    if (error) {
      console.error("Fel vid fetch:", error);
    } else if (data.length > 0) {
      return false
    } else {
      const { error: insertError } = await supabase.from("transactions").insert([
      {
        ...transaction,
        user_id: user.id,
      },
    ])

      if (insertError) console.error("Fel vid insert:", insertError);
    }
  } else {
    const { error } = await supabase.from("transactions").insert([
      {
        ...transaction,
        user_id: user.id,
      },
    ])

    if (error) throw new Error("Fel vid insättning: " + error.message)
  }
}

export async function deleteTransaction(id: string, user_id:string){
  const { error } = await supabase
    .from("transactions")  // tabellen du vill ta bort från
    .delete()
    .eq("user_id", user_id.trim())
    .eq("id", id.trim());    

  if (error) {
    console.error("Failed to delete:", error);
  }
}