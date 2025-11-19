import supabase from "../supabaseClient";
import { supabaseUserID } from "../supabaseClient";

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