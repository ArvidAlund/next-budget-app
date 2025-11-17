"use client"
import { ExpensesBox } from "@/components/visibleData/ExpensesBox"
import ConnectButton from "@/components/Calendar/ConnectCalander"
import TotInvestData from "@/components/Calendar/totInvestData"

export default function KalenderPage() {
    return (
        <div className="flex flex-col items-center p-2 gap-4 md:mt-2">
            <ConnectButton/>
            <ExpensesBox/>
            <TotInvestData/>
        </div>
    );
}
