import supabase, { supabaseUserID } from "../supabaseClient";
import { Budget } from "./getBudget";

const saveBudget = async (budgetData: Budget) => {
    const userId = await supabaseUserID();
    if (!userId) return { success: false, error: "User not authenticated" };

    // Hämta befintlig budget (kan vara null)
    const { data: existing, error: selectError } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

    if (selectError) {
        return { success: false, error: selectError.message };
    }

    // Om ingen rad finns → skapa en
    if (!existing) {
        const { data: inserted, error: insertError } = await supabase
            .from("budgets")
            .insert([{ user_id: userId, ...budgetData }])
            .select()
            .single();

        if (insertError) return { success: false, error: insertError.message };
        return { success: true, data: inserted };
    }

    // Om rad finns → uppdatera endast ändrade fält
    const updates: Partial<Budget> = {};
    for (const key in budgetData) {
        const newVal = budgetData[key] ?? null;
        const oldVal = existing[key] ?? null;
        if (newVal !== oldVal) {
            updates[key] = newVal;
        }
    }

    if (Object.keys(updates).length === 0) {
        return { success: true, data: existing, message: "No changes" };
    }

    const { data: updated, error: updateError } = await supabase
        .from("budgets")
        .update(updates)
        .eq("user_id", userId)
        .select()
        .single();

    if (updateError) return { success: false, error: updateError.message };

    return { success: true, data: updated };
};

export default saveBudget;
