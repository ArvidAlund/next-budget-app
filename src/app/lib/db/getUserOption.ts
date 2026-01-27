import supabase from "../supabaseClient";
import { supabaseUserID } from "../supabaseClient";

/**
 * Retrieve a single user option value for the currently authenticated user.
 *
 * @param option - Column name of the user option to fetch from the user_options table
 * @returns The value of the specified user option (`number`, `string`, or `boolean`) if present, otherwise `null`
 */
export default async function getUserOption( option: string ): Promise<number | string | boolean | null> {
    const userId = await supabaseUserID();
    if (!userId) throw new Error("Användare inte autentiserad");

    const { data, error } = await supabase
        .from("user_options")
        .select(option)
        .eq("user_id", userId)
        .single<Record<string, number | string | boolean | null>>(); 

    if (error) throw error;
    return data ? data[option] : null;
}