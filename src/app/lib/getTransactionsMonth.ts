import supabase from "./supabaseClient";
import { supabaseUserID } from "./supabaseClient";

export async function GetTransactionsMonth(){
    const userId = await supabaseUserID();

      const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString("sv-SE");
      const currentday = new Date().toLocaleDateString("sv-SE");

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .or(
        `and(date.gte.${firstDayOfMonth},date.lte.${currentday}),and(recurring.eq.true,date.lte.${currentday})`
      );

      if (error) {
        return { data: [], error:error ?? null };
      }
      return {data, error}
}