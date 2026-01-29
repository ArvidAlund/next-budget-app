import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import CarryoverOption from "../optionFunctions/carryover";
import ExportTransactionsOption from "../optionFunctions/exportTransactions";
import TransactionFormatOption from "../optionFunctions/transactionFormat";
import BudgetTypeOption from "../optionFunctions/budgetType";
import BudgetOverviewOption from "../optionFunctions/budgetOverview";


/**
 * Render the "Budget Inställningar" section containing budget option controls and a conditional save button.
 *
 * The save button is shown when there are unsaved changes and triggers saving when clicked.
 *
 * @returns A JSX element representing the "Budget Inställningar" section with the CarryoverOption, TransactionFormatOption, BudgetTypeOption, BudgetOverviewOption, and ExportTransactionsOption entries
 */
export default function BudgetOptions() {
    const { unsavedChanges, setSaveChanges } = useUnsavedChanges();
    
    return (
        <section className="text-secondary">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
                <h1 className="text-2xl font-bold w-full text-center">
                Budget Inställningar
                </h1>
                {unsavedChanges && Object.keys(unsavedChanges).length > 0 && (
                <button
                    className="border text-secondary px-4 py-2 rounded-md hover:bg-neutral-800 transition-all duration-300 text-sm w-fit"
                    onClick={() => setSaveChanges(true)}
                >
                    Spara Ändringar
                </button>
                )}
            </div>
            <div className="space-y-4 *:border-b *:pb-4">
                <CarryoverOption />
                <TransactionFormatOption />
                <BudgetTypeOption />
                <BudgetOverviewOption />
                <ExportTransactionsOption />
            </div>
        </section>
    );
}