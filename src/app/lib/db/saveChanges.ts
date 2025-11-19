import supabase from "../supabaseClient";
import { supabaseUserID } from "../supabaseClient";

/**
 * Update the current authenticated user's record with the provided field values.
 *
 * @param changes - Object mapping user column names to their new values
 * @returns An object with `success: true` when the update completes
 * @throws Error when no authenticated user is found
 * @throws Error when the database update returns an error
 */
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