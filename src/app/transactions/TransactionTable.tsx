"use client"

import { GetTransactionsMonth } from "../lib/getTransactionsMonth"
import { useEffect, useState } from "react"
import HamburgerMenu from "@/components/hamburgerMenu";
import { TransactionsTableMenu } from "@/components/transactions/transactionsTableMenu";
import { X } from "lucide-react";
import TransactionItem from "@/components/transactions/transactionItem";
import getTransactions from "../lib/db/getTransactions";


type Transaction = {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  description?: string;
  user_id: string;
  recurring: boolean;
};

const sortList = [
  { label: "Nyast", value: "date_desc" },
  { label: "Äldst", value: "date_asc" },
  { label: "A–Ö", value: "alpha_asc" },
  { label: "Ö–A", value: "alpha_desc" },
  { label: "Pris: Högst → Lägst", value: "price_desc" },
  { label: "Pris: Lägst → Högst", value: "price_asc" },
]

const activeOptionsTable = [
  { label: "Aktiv månad", value: "0" },
  { label: "1 månad", value: "1" },
  { label: "3 månader", value: "3" },
  { label: "6 månader", value: "6" },
  { label: "12 månader", value: "12" },
  { label: "Alla", value: "all" },
  { label: "Inkomster", value: "income" },
  { label: "Utgifter", value: "expense" },
  { label: "Återkommande", value: "recurring" },
]

/**
 * Render a searchable, filterable, and sortable list of the current month's transactions with animated entry.
 *
 * The component fetches the current month's transactions and maintains client-side state for text search,
 * visibility toggles for income ("inkomst") and expense ("utgift"), and sorting (alphabetical or by amount).
 * The rendered UI includes a search input, type filter buttons, a sort selector, and a list of transaction cards
 * showing description, formatted amount (colored by type), and date. List items animate into view when the
 * displayed set changes.
 *
 * @returns The JSX element for the transaction table UI.
 */
export function TransactionTable(){
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [inputValue, setInputvalue] = useState<string>("")
    const [sortBy, setSortBy] = useState("date_desc");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [activeOptions, setActiveOptions] = useState<string[]>(["income", "expense", "0"]);
    const [monthsBack, setMonthsBack] = useState<number>(0);

    useEffect(() =>{
      const fetchData = async() =>{
        const { data, error } = await GetTransactionsMonth();
        if (!error && data) {
          setTransactions(data);
        }
      };

      fetchData();
    },[])


    useEffect(() => {
      const monthOption = activeOptions.find(opt => ["0","1","3","6","12","all"].includes(opt));
      if (monthOption) {
        if (monthOption === "all") {
          if (monthsBack === 100) return;
          setMonthsBack(100);
        } else {
          const monthNumber = parseInt(monthOption);
          if (monthsBack > monthNumber) return;
          setMonthsBack(monthNumber);
        }
      }
    }, [monthsBack, activeOptions]);

    useEffect(() => {
      if (monthsBack === 0) return;
      const fetchData = async() =>{
        const { data, error } = await getTransactions({ numberOfMonths: monthsBack });
        if (!error && data) {
          setTransactions(data);
        }
      };

      fetchData();
    }, [monthsBack]);

    return(
        <section className="w-full overflow-hidden">
          <input type="text" name="search" id=""  placeholder="Sök efter transaktion" value={inputValue} className="border w-full p-2 text-white rounded" onChange={(e) => {setInputvalue(e.target.value)}}/>
          <div className="w-full mt-2 flex justify-between items-center text-white">
            {activeOptions && (
              <div>
                {activeOptions.length > 0 && (
                  <div className="flex gap-2 [&>button]:text-white [&>button]:border [&>button]:rounded [&>button]:p-1 [&>button]:cursor-pointer [&>button]:transition-all [&>button]:duration-300">
                    {activeOptions.map((option, index) => (
                      <button key={index} 
                      className="flex justify-center items-center gap-1"
                      onClick={() => {
                        setActiveOptions(prev => prev.filter(opt => opt !== option))
                      }}>
                        <p>{activeOptionsTable.find(item => item.value === option)?.label || option}</p>
                        <X className="h-1/2"/>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <HamburgerMenu height={25} onClick={() => setMenuOpen(!menuOpen)} />
          </div>
          <TransactionsTableMenu menuOpen={menuOpen} activeOptions={activeOptions} setActiveOptions={setActiveOptions} />
          <select value={sortBy} className="bg-primary rounded text-white mt-4" onChange={(e) => setSortBy(e.target.value)}>
              {sortList.map((item, index) => (
                <option value={item.value} key={index}>{item.label}</option>
              ))}
          </select>

          <div className="w-full flex flex-col gap-2 mt-4 overflow-hidden">
            {transactions
            .filter((t) =>t.description?.toLowerCase().includes(inputValue.toLowerCase()))
            .filter((t) => activeOptions.includes(t.type))
            .filter((t) => {
              const recurringSelected = activeOptions.includes("recurring");
              if (recurringSelected) {
                return t.recurring === true;
              } else {
                return true;
              }
            })
            .filter((t) => {
              const monthOption = activeOptions.find(opt => ["0","1","3","6","12","all"].includes(opt));  
              if (monthOption) {
                if (monthOption === "0") {
                  const now = new Date();
                  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
                  return new Date(t.date) >= firstDayOfMonth;
                } else if (monthOption === "all") {
                  return true;
                } else {
                  const monthsBackNumber = parseInt(monthOption);
                  const now = new Date();
                  const pastDate = new Date(now.getFullYear(), now.getMonth() - monthsBackNumber, now.getDate());
                  return new Date(t.date) >= pastDate;
                } 
              }
              return true;
            }).sort((a, b) => {
              const descA = a.description ?? "";
              const descB = b.description ?? "";
              switch (sortBy) {
                case "date_asc":
                  return new Date(a.date).getTime() - new Date(b.date).getTime();
                case "date_desc":
                  return new Date(b.date).getTime() - new Date(a.date).getTime();
                case "alpha_asc":
                  return descA?.localeCompare(descB);
                case "alpha_desc":
                  return descB?.localeCompare(descA);
                case "price_asc":
                  return a.amount - b.amount;
                case "price_desc":
                  return b.amount - a.amount;
                default:
                  return 0;
              }
            })
            .map((t, i) => (
              <TransactionItem key={t.id} transaction={t} index={i} />
            ))}
          </div>
        </section>
    )
}