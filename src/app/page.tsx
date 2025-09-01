"use client"

import { useEffect, useState } from "react"
import supabase from "@/app/lib/supabaseClient"

import { Navbar } from "@/components/Navbar"
import { AddExpenseBtn } from "@/components/AddExpenseBtn"
import { TopInfo } from "@/components/Topinfo"
import { Overview } from "@/components/visibleData/Overview"
import { ExpensesCard } from "@/components/visibleData/ExpensesCard"
import { AddTransactionModal } from "@/components/transactions/AddTransactionModal"
import { LoginModal } from "@/components/LoginForm"
import { AlertboxContainer } from "@/components/AlertboxContainer"
import type { Session } from '@supabase/supabase-js'
import { useWindowWidth } from "@/components/useWindowWidth"


function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [alertType, setAlertType] = useState<"good" | "bad" | "">("")
  const width = useWindowWidth();

  // Hämta användarsession
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
      setLoading(false)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

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

  return (
    <div className="min-h-screen w-full bg-primary flex flex-col items-center gap-6 overflow-x-hidden p-4">
      <Navbar />
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
    </div>
  )
}

export default App
