import { TransactionTable } from "@/app/transactions/TransactionTable"
import { Navbar } from "@/components/Navbar"

export default function TransactionsPage(){
    return(
        <div className="min-h-screen w-dvw bg-primary flex flex-col items-center gap-6 overflow-x-hidden p-4">
            <Navbar/>
            <TransactionTable/>
        </div>
    )
}