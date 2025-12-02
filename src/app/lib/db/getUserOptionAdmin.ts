import { supabaseAdmin } from "../supabaseClient";

/**
 * Retrieve a single user option value using the Supabase admin client.
 * @param option - Column name of the user option to fetch from the users table
 * @param userId - The ID of the user whose option is to be fetched
 * @returns The value of the specified user option (`number`, `string`, or `boolean`) if present, otherwise `null`
 */
export default async function getUserOptionAdmin(option: string, userId: string): Promise<number | string | boolean | null> {
    const { data, error } = await supabaseAdmin
        .from("users")
        .select(option)
        .eq("user_id", userId)
        .maybeSingle<Record<string, number | string | boolean | null>>();
    if (error) throw error;

    return data ? (data[option] as number | string | boolean | null) : null;
}