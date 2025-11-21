import { useState, useEffect } from "react";
import getUserOption from "@/app/lib/db/getUserOption";
import { emitEvent } from "@/app/lib/eventbus";

export default function BudgetTypeOption(){
    const [budgetType, setBudgetType] = useState<string>("zero");
    const [userBudgetType, setUserBudgetType] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchAutoBackup = async () => {
            try {
                const userAutoBackup = await getUserOption("budget_type");
                if (typeof userAutoBackup === "string") {
                    setBudgetType(userAutoBackup);
                    setUserBudgetType(userAutoBackup);
                    setLoaded(true);
                }
            } catch (error) {
                console.error("Error fetching auto backup option:", error);
            }
        };

        fetchAutoBackup();
    }, []);

    useEffect(() => {
        if (!loaded) return
        if (userBudgetType === null) return;
        if (budgetType === userBudgetType) {
            emitEvent("remove-unsaved-changes", {"auto_backup" : budgetType});
            return;
        }
        emitEvent("unsaved-changes", {"auto_backup" : budgetType});
    }, [budgetType, userBudgetType, loaded]);

    return (
        <div className="p-4 grid gap-2 grid-cols-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Välj Budgetstil</h2>
                <p>Välj vilket sätt du vill bygga och strukturera din budget på.</p>
            </div>
            {loaded ? (
                <div className="flex justify-center items-center">
                    <label className="inline-flex items-center">
                        <select className="mt-2 p-2 border rounded w-full bg-primary text-secondary" name="" id="" onChange={(e) => setBudgetType(e.target.value)} value={budgetType}>
                            <option value="zero" selected={budgetType === "zero"}>Zero-based budget</option>
                            <option value="50/30/20" selected={budgetType === "50/30/20"}>50/30/20-modellen</option>
                        </select>
                    </label>
                </div>
            ) : (
                <p className="w-full text-center">Laddar...</p>
            )}
        </div>
    );
}