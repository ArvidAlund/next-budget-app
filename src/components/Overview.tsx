import { useEffect, useState } from "react"
import { Container } from "./ui/container"
import { NavIcon } from "./ui/navicon"
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { getIncomeExpenseTotal } from "@/app/lib/IncomeExspenseTotal"
import supabase from "@/app/lib/supabaseClient"
import { formatCurrency } from "@/app/lib/formatcurrency"

function isNegative(num:number){
  return num < 0;
}

export function Overview() {
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const currentDate = new Date()

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError) {
          console.error("Auth error:", authError)
          setLoading(false)
          return
        }

        if (!user) {
          console.warn("No user logged in")
          setLoading(false)
          return
        }

        const totals = await getIncomeExpenseTotal(user.id, currentDate)

        if (!totals) {
          console.warn("Totals is null or undefined")
          setIncome(0)
          setExpense(0)
        } else {
          setIncome(totals.income || 0)
          setExpense(totals.expense || 0)
        }

      } catch (error) {
        console.error("Error fetching totals:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const sum = income - expense

  return (
    <Container sizeClass="w-full h-40">
      <div className="flex flex-col mb-3">
        <h3>Saldo</h3>
        <div className={`font-bold text-4xl  ${isNegative(sum) ? "text-red-500" : "text-green-500"}`}>{loading ? "..." : formatCurrency(sum) + " kr"}</div>
      </div>
      <div className="flex flex-row justify-around">
        <div className="flex flex-row items-center text-center gap-2">
          <div className="flex justify-center items-center min-w-fit">
            <NavIcon icon={faArrowDown} label="Utgifter" color="text-red-700" bgcolor="bg-white" />
          </div>
          <div className="flex flex-col text-left">
            <p className="text-sm text-muted-foreground">Utgifter</p>
            <div className="text-xl font-semibold">{loading ? "..." : formatCurrency(expense) + " kr"}</div>
          </div>
        </div>
        <div className="flex flex-row items-center text-center gap-2">
          <div className="flex justify-center items-center min-w-fit">
            <NavIcon icon={faArrowUp} label="Inkomst" color="text-lime-600" bgcolor="bg-white" />
          </div>
          <div className="flex flex-col text-left">
            <p className="text-sm text-muted-foreground">Inkomst</p>
            <div className="text-xl font-semibold">{loading ? "..." : formatCurrency(income) + " kr"}</div>
          </div>
        </div>
      </div>
    </Container>
  )
}
