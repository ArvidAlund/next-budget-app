import supabase, {supabaseUserID} from "../supabaseClient"

export interface Budget { [key: string]: number | string | null; }

interface GetBudgetResult { success: boolean; error?: string; budget?: Budget; total?: number; }

const getBudget = async (): Promise<GetBudgetResult> => {
    const userId = await supabaseUserID();
    if (!userId) {
        console.error("User not authenticated");
        return {success: false, error: "User not authenticated"};
    }
    const { data: budgetData, error } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", userId)
        .single();
    if (error || !budgetData) {
        console.error("Error fetching budget:", error?.message);
        return {success: false, error: error?.message ?? "No budget data found"};
    }
    const filterdBudgetData: Budget = {};
    let totalBudget = 0;
    for (const [key, value] of Object.entries(budgetData)) {
        if (key !== "id" && key !== "user_id" && key !== "created_at" && key !== "updated_at" && typeof value === "number") {
            filterdBudgetData[key] = value;
            totalBudget += value;
        }
    }

    return {budget: filterdBudgetData, total:totalBudget, success: true};
}

export default getBudget;