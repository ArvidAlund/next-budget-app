import getBudget, { Budget } from "@/app/lib/db/getBudget";
import getUserOption from "@/app/lib/db/getUserOption";
import { formatCurrency } from "@/app/lib/formatcurrency";
import { useEffect, useState } from "react";

type BudgetType = "manual" | "zero" | "50/30/20" | "surplus-budget";


const BudgetOverviewOption = () => {
    const [userBudget, setUserBudget] = useState<Budget | null>(null);
    const [totalBudget, setTotalBudget] = useState<number | string | null>(null);
    const [budgetType, setBudgetType] = useState<BudgetType>("manual");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchBudgetOverview = async () => {
            try {
                const res = await getBudget();
                if (res && typeof res.total === "number") {
                    setUserBudget(res.budget as Budget);
                    setTotalBudget(res.total);
                    setLoaded(true);
                }
            } catch (error) {
                console.error("Error fetching budget overview:", error);
            }
        };

        const fetchBudgetType = async () => {
            try {
                const res = await getUserOption("budget_type");
                if (typeof res === "string" && (res === "zero" || res === "50/30/20" || res === "manual" || res === "surplus-budget")) {
                    setBudgetType(res);
                }
            } catch (error) {
                console.error("Error fetching budget type:", error);
            }
        };

        fetchBudgetType();
        fetchBudgetOverview();
    }, []);

    // Auto-assign logik baserat på budgetType
    useEffect(() => {
        if (!userBudget || !totalBudget || typeof totalBudget === "string") return;

        if (budgetType === "50/30/20") {
            setUserBudget(prev => ({
                ...prev!,
                needs: totalBudget * 0.5,
                wants: totalBudget * 0.3,
                savings: totalBudget * 0.2,
            }));
        }

        // Zero-based kräver ingen auto-assign
    }, [budgetType, totalBudget]);

    const handleChange = (key: string, value: number) => {
        setUserBudget(prev => ({
            ...prev!,
            [key]: value
        }));
    };

    const isLocked = (key: string) => {
        if (budgetType === "50/30/20") {
            return key === "needs" || key === "wants" || key === "savings";
        }
        return false;
    };

    return (
        <div className="p-4 grid gap-2 items-center">
            <div className="sm:w-3/4">
                <h2 className="text-xl font-semibold mb-2">Din budget</h2>
            </div>

            {loaded ? (
                <>
                    {totalBudget !== null && budgetType !== "50/30/20" && (
                        <h3 className="text-lg font-semibold my-2 text-center">
                            Total budget {budgetType === "surplus-budget" ? (Number(totalBudget) - (Number(userBudget?.savings) ?? 0)) : formatCurrency(Number(totalBudget))} kr
                        </h3>
                    )}

                    {totalBudget !== null && budgetType === "50/30/20" && (
                        <>
                            <h3 className="text-lg font-semibold my-2 text-center">
                                Total budget:
                            </h3>
                            <input
                            type="number"
                            className="w-32 p-1 border rounded text-center mx-auto mb-4"
                            value={totalBudget}
                            onChange={(e) => {
                                const value = e.target.value;
                                const numericValue = value.replace(/[^0-9.]/g, '');

                                // Om fältet är tomt → sätt state till tomt
                                if (value === "") {
                                setTotalBudget("");
                                setUserBudget({
                                    ...userBudget!,
                                    needs: 0,
                                    wants: 0,
                                    savings: 0,
                                });
                                return;
                                }

                                // Annars → konvertera till nummer
                                const newTotal = Number(numericValue);

                                setTotalBudget(newTotal);
                                setUserBudget({
                                ...userBudget!,
                                needs: newTotal * 0.5,
                                wants: newTotal * 0.3,
                                savings: newTotal * 0.2,
                                });
                            }}
                            />
                        </>
                    )}

                    <ul>
                        {userBudget && Object.entries(userBudget).sort((a, b) => Number(b[1]) - Number(a[1])).map(([key, value]) => {
                            if (key === "id" || key === "user_id") return null;
                            if (budgetType === "surplus-budget" && key == "savings") return null;
                            if (budgetType == "50/30/20" && (key === "needs" || key === "wants" || key === "savings")) {
                                return (
                                    <li key={key} className="flex justify-between border-b py-2">
                                        <span className="capitalize">{key.replace(/_/g, " ")}</span>
                                        <span>{formatCurrency(Number(value))}</span>
                                    </li>
                                );
                            }
                            if (budgetType !== "50/30/20") {
                                return (
                                    <li key={key} className="flex justify-between border-b py-2">
                                        <span className="capitalize">{key.replace(/_/g, " ")}</span>

                                        <input
                                            type="number"
                                            className="w-32 p-1 border rounded text-right"
                                            value={value ?? 0}
                                            disabled={isLocked(key)}
                                            onChange={(e) => handleChange(key, Number(e.target.value))}
                                        />
                                    </li>
                                );
                            }
                            return null;
                        })}
                    </ul>
                </>
            ) : (
                <p className="w-full text-center">Laddar...</p>
            )}
        </div>
    );
};

export default BudgetOverviewOption;
