import { TransactionTable } from "@/app/transactions/TransactionTable"

/**
 * Renders the transactions page with the transactions table.
 *
 * @returns A JSX element: a <main> wrapper (classes "md:mt-4 p-2") that contains the TransactionTable component.
 */
export default function TransactionsPage(){
    return(
        <main className="md:mt-4 p-2">
            <TransactionTable/>
        </main>
    )
}