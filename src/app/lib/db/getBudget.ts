import supabase, { supabaseUserID } from "../supabaseClient";
import getUserOption from "./getUserOption";

export interface Budget {
    [key: string]: number | string | null;
}

interface GetBudgetResult {
    success: boolean;
    error?: string;
    budget?: Budget;
    total?: number;
}

const NUMERIC_KEYS_TO_IGNORE = ["id", "user_id", "created_at", "updated_at"];
const BUDGET_503020_KEYS = ["needs", "wants", "savings"];

const parseNumeric = (value: unknown): number | null => {
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.trim() !== "") {
        const num = Number(value);
        return Number.isNaN(num) ? null : num;
    }
    return null;
};

const getBudget = async (): Promise<GetBudgetResult> => {
    let type: string | undefined;

    try {
        const res = await getUserOption("budget_type");
        if (typeof res === "string") type = res;
    } catch (error) {
        console.error("Error fetching budget type:", error);
    }

    const userId = await supabaseUserID();
    if (!userId) {
        console.error("User not authenticated");
        return { success: false, error: "User not authenticated" };
    }

    const { data: budgetData, error } = await supabase
        .from("budgets")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error || !budgetData) {
        console.error("Error fetching budget:", error?.message);
        return { success: false, error: error?.message ?? "No budget data found" };
    }

    const filteredBudget: Budget = {};
    let total = 0;

    for (const [key, value] of Object.entries(budgetData)) {
        // Special case: 50/30/20 mode
        if (type === "50/30/20" && BUDGET_503020_KEYS.includes(key)) {
            const num = parseNumeric(value);
            if (num !== null) filteredBudget[key] = num;
            continue;
        }

        // Skip metadata keys
        if (NUMERIC_KEYS_TO_IGNORE.includes(key)) continue;

        const num = parseNumeric(value);
        if (num !== null) {
            filteredBudget[key] = num;
            total += num;
        }
    }

    return { success: true, budget: filteredBudget, total };
};

export default getBudget;
