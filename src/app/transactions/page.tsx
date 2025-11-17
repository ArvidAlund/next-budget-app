import { TransactionTable } from "@/app/transactions/TransactionTable"

export default function TransactionsPage(){
    return(
        <main className="md:mt-4 p-2">
            <TransactionTable/>
        </main>
    )
}