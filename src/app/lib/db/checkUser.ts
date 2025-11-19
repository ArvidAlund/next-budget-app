import supabase from "../supabaseClient";
import { supabaseUserID } from "../supabaseClient";

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
