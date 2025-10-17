"use client"

import { Navbar } from "@/components/Navbar"
import  {Calander} from "@/components/Calendar/Calender"
import { ExpensesBox } from "@/components/visibleData/ExpensesBox"
import ConnectButton from "@/components/Calendar/ConnectCalander"
import TotInvestData from "@/components/Calendar/totInvestData"

export default function KalenderPage() {
    return (
        <div className="min-h-screen w-dvw bg-primary flex flex-col items-center gap-6 overflow-x-hidden p-4">
            <Navbar/>
            {/* <Calander/> */}
            <ConnectButton/>
            <ExpensesBox/>
            <TotInvestData/>
        </div>
    );
}
