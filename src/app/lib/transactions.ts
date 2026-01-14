import supabase, { supabaseUserID } from "@/app/lib/supabaseClient"

/**
 * Create a new transaction for the current user, with special handling to prevent duplicate recurring entries.
 *
 * @param transaction - Transaction data. If `transaction.recurring` is `true`, `transaction.description` is used to detect existing recurring transactions for the user and avoid inserting duplicates.
 * @returns `false` if a recurring transaction with the same description already exists for the current user, `undefined` otherwise.
 * @throws When no user is logged in ("User not logged in") or when inserting a non-recurring transaction fails (error message prefixed with "Fel vid insättning: ").
 */
export async function addTransaction(transaction: {
  type: "income" | "expense"
  category: string
  amount: number
  date: string
  description?: string
  recurring:boolean
}) {
  const userId = await supabaseUserID();

  if (!userId) {
    throw new Error("User not logged in");
  }

  if (transaction.recurring === true) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("recurring", true)
      .eq("description", transaction.description)
      .eq("user_id", userId);

    if (error) {
      console.error("Fel vid fetch:", error);
    } else if (data.length > 0) {
      return false
    } else {
      const { error: insertError } = await supabase.from("transactions").insert([
      {
        ...transaction,
        user_id: userId,
      },
    ])

      if (insertError) console.error("Fel vid insert:", insertError);
    }
  } else {
    const { error } = await supabase.from("transactions").insert([
      {
        ...transaction,
        user_id: userId,
      },
    ])

    if (error) throw new Error("Fel vid insättning: " + error.message)
  }
}

/**
 * Deletes the transaction with the given id that belongs to the specified user.
 *
 * If the delete operation fails, an error is logged to the console.
 *
 * @param id - The transaction id to remove
 * @param user_id - The id of the user who owns the transaction
 */
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