import supabase from "./supabaseClient";

export async function GetTransactionsMonth(){
    const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
    
      if (!user) return { data: [], error: authError ?? null };

      const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toLocaleDateString("sv-SE");
      const currentday = new Date().toLocaleDateString("sv-SE");

    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .or(
        `and(date.gte.${firstDayOfMonth},date.lte.${currentday}),and(recurring.eq.true,date.lte.${currentday})`
      );

      return {data, error}
}