import supabase from "../supabaseClient";
import { supabaseUserID } from "../supabaseClient";

export default async function saveChangesToDb(changes: Record<string, number | string>) {
    const userId = await supabaseUserID();
    if (!userId) throw new Error("Användare inte autentiserad");
    const { data, error } = await supabase
        .from("users")
        .update(changes)
        .eq("user_id", userId)
        .select()
        .single();
    if (error) throw error;
    return data;
}