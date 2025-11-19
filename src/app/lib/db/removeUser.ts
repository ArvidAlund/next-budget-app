import supabase from "../supabaseClient";
import { supabaseUserID } from "../supabaseClient";

/**
 * Deletes the authenticated user's record from the `users` table.
 *
 * @returns An object with `success` set to `true` when the deletion completes
 * @throws `Error` when no authenticated user is found
 * @throws The database error returned by Supabase if the delete operation fails
 */
export default async function removeUser() {
    const userID = await supabaseUserID();
    if (!userID) {
        throw new Error("User not authenticated");
    }
    const { error } = await supabase
        .from("users")
        .delete()
        .eq("user_id", userID);
    if (error) {
        throw error;
    }
    return { success: true };
};