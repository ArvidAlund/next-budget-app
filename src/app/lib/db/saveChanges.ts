import supabase from "../supabaseClient";
import { supabaseUserID } from "../supabaseClient";

export default async function saveChangesToDb(changes: Record<string, number | string | boolean>) {
    const userID = await supabaseUserID();
    if (!userID) {
        throw new Error("User not authenticated");
    }
    console.log("Resolved userID:", userID);
    console.log("Saving changes to DB:", changes);

    const { data:selectData } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", userID);
    console.log("Row found:", selectData);

    const { data, error } = await supabase
    .from("users")
    .update(changes)
    .eq("user_id", userID)
    .select();
    
    if (error) {
        throw error;
    }

    console.log("Changes saved to DB:", data);
    return { success: true };
}