import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import CarryoverOption from "../optionFunctions/carryover";
import ExportTransactionsOption from "../optionFunctions/exportTransactions";
import TransactionFormatOption from "../optionFunctions/transactionFormat";


/**
 * Render the "Budget Inställningar" section with its options.
 *
 * @returns A JSX element containing a styled section with a centered header and the ExportTransactionsOption entry.
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
                <ExportTransactionsOption />
            </div>
        </section>
    );
}