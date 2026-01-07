"use client"

import { TransactionTable } from "@/app/transactions/TransactionTable"
import { Navbar } from "@/components/ui/navbar/Navbar"
import { useState, useEffect } from "react"
import supabase from "../lib/supabaseClient";

/**
 * Render the transactions page including the top navigation and transactions table.
 *
 * @returns The page's JSX element: a fragment containing the `Navbar` component and a `<main>` element (classes "md:mt-4 p-2") that wraps `TransactionTable`.
 */
export default function TransactionsPage(){
    const [hasSession, setHasSession] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession();
            if (error) {
                console.error("Error fetching session:", error.message);
                setHasSession(false);
            } else {
                const session = data.session;
                setHasSession(session !== null);
            }
            setLoading(false);
        }
        checkSession();
    }, []);

    if (loading) return null;
    if (!hasSession) {
        window.location.href = '/404';
        return null;
    }
    
    return(
        <>
            <Navbar />
            <main className="md:mt-4 p-2">
                <TransactionTable/>
            </main>
        </>
    )
}