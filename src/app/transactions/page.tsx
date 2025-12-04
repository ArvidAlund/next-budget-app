import { TransactionTable } from "@/app/transactions/TransactionTable"
import { Navbar } from "@/components/Navbar"

/**
 * Render the transactions page including the top navigation and transactions table.
 *
 * @returns The page's JSX element: a fragment containing the `Navbar` component and a `<main>` element (classes "md:mt-4 p-2") that wraps `TransactionTable`.
 */
export default function TransactionsPage(){
    return(
        <>
            <Navbar />
            <main className="md:mt-4 p-2">
                <TransactionTable/>
            </main>
        </>
    )
}