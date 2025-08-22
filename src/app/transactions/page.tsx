import { TransactionTable } from "@/app/transactions/TransactionTable"

export default function TransactionsPage(){
    return(
        <div className="min-h-screen w-dvw bg-primary flex flex-col items-center gap-6 overflow-x-hidden p-4">
            <TransactionTable/>
        </div>
    )
}