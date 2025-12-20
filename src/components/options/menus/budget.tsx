import CarryoverOption from "../optionFunctions/carryover";
import ExportTransactionsOption from "../optionFunctions/exportTransactions";
import TransactionFormatOption from "../optionFunctions/transactionFormat";


/**
 * Render the "Budget Inställningar" section with its options.
 *
 * @returns A JSX element containing a styled section with a centered header and the ExportTransactionsOption entry.
 */
export default function BudgetOptions() {
    return (
        <section className="text-secondary">
            <h1 className="text-2xl font-bold mb-4 w-full text-center">Budget Inställningar</h1>
            <div className="space-y-4 *:border-b *:pb-4">
                <CarryoverOption />
                <TransactionFormatOption />
                <ExportTransactionsOption />
            </div>
        </section>
    );
}