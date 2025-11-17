"use client"
import { ExpensesBox } from "@/components/visibleData/ExpensesBox"
import ConnectButton from "@/components/Calendar/ConnectCalander"
import TotInvestData from "@/components/Calendar/totInvestData"

/**
 * Renders the Kalender page with controls and summary sections for calendar connection, expenses, and total investments.
 *
 * @returns A JSX element containing the page layout with a calendar-connect control, an expenses display, and a total-investment summary.
 */
export default function KalenderPage() {
    return (
        <div className="flex flex-col items-center p-2 gap-4 md:mt-2">
            <ConnectButton/>
            <ExpensesBox/>
            <TotInvestData/>
        </div>
    );
}