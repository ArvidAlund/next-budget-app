import { useEffect, useState } from "react";
import AddInitalAmount from "./addInitalAmount";
import LanguageCurrency from "./languageCurrency";
import AddIncome from "./addIncome";
import BudgetTypeOption from "../options/optionFunctions/budgetType";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { Button } from "../ui/button";
import { onEvent } from "@/app/lib/eventbus";

type Income = { day: string; amount: number };
type IncomeData = {
  salary: Income[];
  grants: Income[];
};

export default function FirstSetup() {
  const [stage, setStage] = useState<number>(1);
  const { unsavedChanges, setSaveChanges } = useUnsavedChanges();
  const [incomeList, setIncomeList] = useState<IncomeData | null>(null);

  useEffect(() => {
    const unsubscribe = onEvent("Income-data", (data: IncomeData) => {
        console.log("Data: ", data);
        setIncomeList(data);
    });

    return () => unsubscribe();
  }, []);

  const renderStage = () => {
    switch (stage) {
        case 1:
            return <LanguageCurrency />;
        case 2:
            return <BudgetTypeOption />;
        case 3:
            return <AddIncome />;
      default:
        return null;
    }
  };

  return (
    <main className="fixed top-0 left-0 z-200 w-full h-full bg-primary flex items-center justify-center">
        <div className="border min-w-1/2 bg-secondary">
            {renderStage()}
            <div className="mt-2 text-center">
                <Button className="m-2 px-8 text-lg" onClick={() => setStage(stage + 1)}>Nästa steg</Button>
                <p>Steg {stage} av 7</p>
                <div className="h-2 w-[90%] m-auto rounded-full overflow-hidden bg-gray-200">
                    <div
                        className="bg-green-500 h-full transition-all duration-300"
                        style={{ width: `${(stage / 7) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    </main>
  );
}
