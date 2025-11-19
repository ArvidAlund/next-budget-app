import supabase from "../supabaseClient";
import { supabaseUserID } from "../supabaseClient";

/**
 * Ensures a database record exists for the currently authenticated Supabase user, creating and returning a new record if none exists.
 *
 * @returns The user record from the "users" table.
 * @throws An Error with message "Användare inte autentiserad" when no authenticated user ID is available.
 * @throws Any database error encountered while selecting or inserting the user.
 */
export default async function checkOrCreateUser() {
  const userId = await supabaseUserID();
  if (!userId) throw new Error("Användare inte autentiserad");

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error && error.code !== "PGRST116") { 
    throw error;
  }

  if (!user) {
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([{ user_id: userId, email: (await supabase.auth.getUser()).data.user?.email }])
      .select()
      .single();

    if (insertError) throw insertError;
    return newUser;
  }

  return user;
}