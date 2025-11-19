import supabase from "../supabaseClient";
import { supabaseUserID } from "../supabaseClient";

export default async function getUserOption( option: string ): Promise<number | string | boolean | null> {
    const userId = await supabaseUserID();
    if (!userId) throw new Error("Användare inte autentiserad");

    const { data, error } = await supabase
        .from("users")
        .select(option)
        .eq("user_id", userId)
        .single<Record<string, number | string | boolean | null>>(); 

    if (error) throw error;
    return data ? data[option] : null;
}
