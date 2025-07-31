"use client"

import supabase from "@/app/lib/supabaseClient"

import { Navbar } from "@/components/Navbar"
import  {Calander} from "@/components/Calander"
import { ExpensesBox } from "@/components/ExpensesBox"

export default function KalenderPage() {
    return (
        <div className="min-h-screen w-dvw bg-primary flex flex-col items-center gap-6 overflow-x-hidden p-4">
            <Calander/>
            <ExpensesBox/>
            <Navbar/>
        </div>
    );
}
