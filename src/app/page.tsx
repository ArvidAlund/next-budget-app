"use client"

import { useEffect, useState } from "react"
import supabase from "@/app/lib/supabaseClient"
import { supabaseUserID } from "@/app/lib/supabaseClient"

import { ExpensesBox } from "@/components/visibleData/ExpensesBox"
import { AddExpenseBtn } from "@/components/AddExpenseBtn"
import { TopInfo } from "@/components/Topinfo"
import { Overview } from "@/components/visibleData/Overview"
import { ExpensesCard } from "@/components/visibleData/ExpensesCard"
import { AddTransactionModal } from "@/components/transactions/AddTransactionModal"
import { LoginModal } from "@/components/LoginForm"
import { AlertboxContainer } from "@/components/AlertboxContainer"
import type { Session } from '@supabase/supabase-js'
import { useWindowWidth } from "@/components/useWindowWidth"
import calcInvestment from "./lib/calcInvestment"
import TotInvestData from "@/components/Calendar/totInvestData"
import FirstSetup from "@/components/firstSetup/firstSetup"
import LockScreen from "@/components/lockScreen";
import getUserOption from "./lib/db/getUserOption"
import { Navbar, NavbarHeight } from "@/components/Navbar"
import styles from "@/app/style/home.module.css"
import Spending from "@/components/home/spending"
import Summary from "@/components/home/summary"
import Transactions from "@/components/home/transactions"
import Expenses from "@/components/home/expenses"
import Tips from "@/components/home/tips"

/**
 * Application root component that manages authentication state, modal visibility, initial-setup gating, transient alerts, and renders the appropriate UI for the current state.
 *
 * @returns The top-level UI: `null` while initializing, the `LoginModal` when unauthenticated, the `FirstSetup` flow when initial setup is required, or the authenticated application layout (overview, expenses, add-transaction flow, alerts, and investment data) otherwise.
 */
function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [alertType, setAlertType] = useState<"good" | "bad" | "">("")
  const width = useWindowWidth();
  const [setup, setSetup] = useState<boolean>(true);
  const [locked, setLocked] = useState<boolean>(false);

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
      const lockSetting = await getUserOption('app_lock');
      if (typeof lockSetting === 'boolean' && lockSetting) {
        setLocked(true);
        setLoading(false);   
      }
    }

    checkLock();

    const checkSetup = async () => {
      const userId = await supabaseUserID();

      const {count, error} = await supabase
      .from("transactions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("type", "income")
      .eq("description", "Inital Amount")

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
  if (!session) return <LoginModal />
  if (locked) return <LockScreen onUnlock={() => {setLocked(false)}}/>

  return (
    <>
      {setup ? (
        <FirstSetup />
      ) : (
        <>
          <Navbar />
          <main style={{ minHeight: `calc(100vh - ${NavbarHeight}px)` }} className={`p-4 ${styles.gridAreaHome} gap-4`}>
            <Summary className={styles.summary} />
            <Spending className={styles.spending} />
            <Transactions className={styles.transactions} />
            <Expenses className={styles.expenses} />
            <Tips className={styles.tips} />
          </main>
        </>
      )}
    </>
  )
}

export default App