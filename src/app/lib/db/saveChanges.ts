import supabase from "../supabaseClient";
import { supabaseUserID } from "../supabaseClient";

export default async function saveChangesToDb(changes: Record<string, number | string | boolean>) {
    const userID = await supabaseUserID();
    if (!userID) {
        throw new Error("User not authenticated");
    }

    const { error } = await supabase
    .from("users")
    .update(changes)
    .eq("user_id", userID)
    .select();
    
    if (error) {
        throw error;
    }

    return { success: true };
}