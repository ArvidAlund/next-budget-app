"use client"

import { Navbar } from "@/components/Navbar"
import  {Calander} from "@/components/Calander"
import { ExpensesBox } from "@/components/ExpensesBox"
import ConnectButton from "@/components/ConnectCalander"

export default function KalenderPage() {
    return (
        <div className="min-h-screen w-dvw bg-primary flex flex-col items-center gap-6 overflow-x-hidden p-4">
            <Calander/>
            <ConnectButton/>
            <ExpensesBox/>
            <Navbar/>
        </div>
    );
}
