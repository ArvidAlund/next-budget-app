import { TransactionTable } from "@/app/transactions/TransactionTable"
import Link from "next/link"

export default function TransactionsPage(){
    return(
        <div className="min-h-screen w-dvw bg-primary flex flex-col items-center gap-6 overflow-x-hidden p-4">
            <Link className="bg-secondary p-1 rounded w-90 font-bold text-center" href="/">Hem</Link>
            <TransactionTable/>
        </div>
    )
}