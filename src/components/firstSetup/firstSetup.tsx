import { useEffect, useState } from "react";
import AddInitalAmount from "./addInitalAmount";
import LanguageCurrency from "./languageCurrency";
import AddIncome from "./addIncome";
import BudgetTypeOption from "../options/optionFunctions/budgetType";
import AddExpense from "./addExpense";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { Button } from "../ui/button";
import { onEvent, emitEvent } from "@/app/lib/eventbus";

type Income = { day: string; amount: number };
type IncomeData = {
  salary: Income[];
  grants: Income[];
};

type Expense = { day: string; amount: number, description: string, category: string };

export default function FirstSetup() {
  const [stage, setStage] = useState<number>(1);
  const { unsavedChanges, setSaveChanges } = useUnsavedChanges();
  const [incomeList, setIncomeList] = useState<IncomeData | null>(null);
  const [expenseList, setExpenseList] = useState<Expense[]| null>(null)
  const [startAmount, setStartAmount] = useState<number>()
  const totSteps: number = 5;

  useEffect(() => {
    const unsubscribe = onEvent("Income-data", (data: IncomeData) => {
        setIncomeList(data);
    });

    const unsubscribeExpense = onEvent("Expense-data", (data: { expense: Expense[] }) => {
      setExpenseList(data.expense);
    });

    const unsubscribeStart = onEvent("Start-Income", (data: number) => {setStartAmount(data)})

    return () => {
        unsubscribe();
        unsubscribeExpense();
        unsubscribeStart();
    }
  }, []);

  useEffect(()=>{
    if (stage <= totSteps) return
    console.log("yay")
  },[stage])

  const renderStage = () => {
    switch (stage) {
        case 1:
            return <LanguageCurrency />;
        case 2:
            return <BudgetTypeOption />;
        case 3:
            return <AddIncome />;
        case 4:
            return <AddExpense />;
        case 5:
            return <AddInitalAmount/>;
      default:
        return null;
    }
  };

  return (
    <main className="fixed top-0 left-0 z-200 w-full h-full bg-primary flex items-center justify-center">
        <div className="border min-w-1/2 bg-secondary">
            {renderStage()}
            <div className={`mt-2 text-center ${stage === totSteps+1 ? "hidden" : "block"}`}>
                <Button className="m-2 px-8 text-lg" onClick={() => setStage(stage + 1)}>{totSteps === stage ? "Bekräfta och starta" : "Nästa steg"}</Button>
                <p>Steg {stage} av {totSteps}</p>
                <div className="h-2 w-[90%] m-auto rounded-full overflow-hidden bg-gray-200">
                    <div
                        className="bg-green-500 h-full transition-all duration-300"
                        style={{ width: `${(stage / totSteps) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    </main>
  );
}
