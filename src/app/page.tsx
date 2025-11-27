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

/**
 * Application root component that manages authentication state, modal visibility, setup gating, and temporary alerts while rendering the main overview and expenses UI.
 *
 * Renders nothing while initializing; shows the login modal when unauthenticated; if the user requires initial setup shows `FirstSetup`; otherwise renders the primary authenticated layout including responsive top info, overview, expenses, the add-transaction flow, temporary alerts, and investment data.
 *
 * @returns `null` while initializing, the `LoginModal` when there is no active session, `FirstSetup` when initial setup is required, or the authenticated app layout otherwise.
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
      <div className="min-h-screen w-full bg-primary flex flex-col items-center gap-6 overflow-x-hidden p-4">
      {width < 1024 ? <TopInfo textclr="text-white"/> : null}
      <Overview />
      <ExpensesCard />
      <AddExpenseBtn onClick={() => setModalOpen(true)} />

      {modalOpen && (
        <AddTransactionModal
          onClose={() => setModalOpen(false)}
          onSuccess={(type) => setAlertType(type)} // "good" eller "bad"
        />
      )}

      {alertType && <AlertboxContainer type={alertType} />}

      <ExpensesBox/>
      <TotInvestData/>
    </div>
    )}
    </>
  )
}

export default App