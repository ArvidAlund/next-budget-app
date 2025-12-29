"use client"

import { useEffect, useState } from "react"
import supabase from "@/app/lib/supabaseClient"
import { supabaseUserID } from "@/app/lib/supabaseClient"

import type { Session } from '@supabase/supabase-js'
import calcInvestment from "./lib/calcInvestment"
import FirstSetup from "@/components/firstSetup/firstSetup"
import LockScreen from "@/components/lockScreen";
import getUserOption from "./lib/db/getUserOption"
import { Navbar, NavbarHeight } from "@/components/ui/navbar/Navbar"
import styles from "@/app/style/home.module.css"
import Summary from "@/components/home/summary"
import Transactions from "@/components/home/transactions"
import Expenses from "@/components/home/expenses"
import Tips from "@/components/home/tips"
import { useWindowWidth } from "@/components/useWindowWidth"
import Investment from "@/components/home/investment"
import HomePage from "./pages/home"

/**
 * Root React component that controls authentication, initial-setup gating, lock screen, transient alerts, and renders the main dashboard layout.
 *
 * @returns The rendered application UI as a JSX element, chosen based on authentication, lock state, and setup completion.
 */
function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [alertType, setAlertType] = useState<"good" | "bad" | "">("")
  const [setup, setSetup] = useState<boolean>(true);
  const [locked, setLocked] = useState<boolean>(false);
  const windowWidth = useWindowWidth();
  const date = new Date();
  const day = date.getDate();

  // Hämta användarsession
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    const checkLock = async () => {
      if (!session) {
        setLoading(false);
        return;
      }
      const lockSetting = await getUserOption('app_lock');
      if (typeof lockSetting === 'boolean' && lockSetting) {
        setLocked(true);
        setLoading(false);   
      }
    }

    checkLock();

    const checkSetup = async () => {
      if (!session) {
        setLoading(false);
        return;
      }
      const userId = await supabaseUserID();

      const { count, error } = await supabase
        .from("transactions")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("type", "income")
        .eq("description", "Initial Amount")

      if (error || !count) return

      if (count > 0) {
        setSetup(false)
      }
      setLoading(false)
    }

    checkSetup();

    calcInvestment();

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (alertType) {
      const timeout = setTimeout(() => {
        setAlertType("") // Tar bort alerten efter 3 sekunder
      }, 3000)

      return () => clearTimeout(timeout) // Städar upp ifall det ändras snabbt
    }
  }, [alertType])

  if (loading) return null
  if (!session) return <HomePage />
  if (locked) return <LockScreen onUnlock={() => { setLocked(false) }} />

  return (
    <>
      {setup ? (
        <FirstSetup />
      ) : (
        <>
          <Navbar />
          <main
            style={
              windowWidth > 1024
                ? {
                    maxHeight: `calc(100vh - ${NavbarHeight}px)`,
                    gridTemplateRows: `repeat(3, 1fr)`,
                  }
                : {
                    minHeight: `calc(100vh - ${NavbarHeight}px)`,
                    gridTemplateRows: `1fr`,
                  }
            }
            className={`p-4 ${
              day >= 25 ? styles.gridAreaAfter25th : styles.gridAreaBefore25th
            } ${styles.gridArea} gap-4 md:overflow-hidden`}
          >
            <Summary className={styles.summary} />
            <Transactions className={styles.transactions} />
            {day >= 25 && <Investment className={styles.investment} />}
            {windowWidth >= 768 && <Expenses className={styles.expenses} />}
            {windowWidth >= 768 && (
              <Tips className={`${styles.tips}`} />
            )}
          </main>
        </>
      )}
    </>
  )
}

export default App