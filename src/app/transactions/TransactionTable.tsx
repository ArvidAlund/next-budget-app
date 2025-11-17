"use client"
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"

import { GetTransactionsMonth } from "../lib/getTransactionsMonth"
import { useEffect, useState, useRef } from "react"
import { formatCurrency } from "../lib/formatcurrency"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Transaction = {
  id: string;
  type: "inkomst" | "utgift";
  category: string;
  amount: number;
  date: string;
  description?: string;
};

const sortList = [
  { label: "A–Ö", value: "alpha_asc" },
  { label: "Ö–A", value: "alpha_desc" },
  { label: "Pris: Högst → Lägst", value: "price_desc" },
  { label: "Pris: Lägst → Högst", value: "price_asc" },
]

export function TransactionTable(){
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [inputValue, setInputvalue] = useState<string>("")
    const [sortBy, setSortBy] = useState("alpha_asc");
    const [activeButtons, setActiveButtons] = useState({ inkomst: true, utgift: true });
    const transactionRefs = useRef<HTMLDivElement[]>([]);

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
      if (transactions.length === 0) return;

      transactionRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y:50 },
            { opacity: 1, y:0, ease: "power2.in", duration: 0.6, delay: i * 0.05 }
          );
        }
      });
    }, [transactions, activeButtons, sortBy, inputValue]);

    return(
        <section className="w-full overflow-hidden">
          <input type="text" name="search" id=""  placeholder="Sök efter transaktion" value={inputValue} className="border w-full p-2 text-white rounded" onChange={(e) => {setInputvalue(e.target.value)}}/>
          <div className="w-full mt-2 flex justify-between items-center text-white">
            <div className="flex gap-2 [&>button]:text-white [&>button]:border [&>button]:rounded [&>button]:p-1 [&>button]:cursor-pointer [&>button]:transition-all [&>button]:duration-300">
              <button className={`${activeButtons.inkomst ? "bg-white text-black!" : ""}`} onClick={() => setActiveButtons(prev => ({...prev,inkomst: !prev.inkomst}))}
              >
                <p>Inkomster</p>
              </button>
              <button className={`${activeButtons.utgift ? "bg-white text-black!" : ""}`} onClick={() => setActiveButtons(prev => ({...prev,utgift: !prev.utgift}))}
              >
                <p>Utgifter</p>
              </button>
            </div>
            <select value={sortBy} className="bg-primary p-1 rounded" onChange={(e) => setSortBy(e.target.value)}>
              {sortList.map((item, index) => (
                <option value={item.value} key={index}>{item.label}</option>
              ))}
            </select>
          </div>

          <div className="w-full flex flex-col gap-2 mt-4 overflow-hidden">
            {transactions
            .filter((t) =>t.description?.toLowerCase().includes(inputValue.toLowerCase()))
            .filter((t) => activeButtons[t.type])
            .sort((a, b) => {
              const descA = a.description ?? "";
              const descB = b.description ?? "";
              switch (sortBy) {
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
              <div
                key={i}
                ref={(el) => {
                  transactionRefs.current[i] = el!;
                }}
                className="w-full bg-neutral-800 rounded p-1 text-white"
              >
                <div className="flex justify-between items-center h-fit">
                  <h4 className="font-bold tracking-wide text-lg">{t.description ?? ""}</h4>
                  <p className={`${t.type === "inkomst" ? "text-green-500" : "text-red-500"}`}>
                    {formatCurrency(t.amount)} kr
                  </p>
                </div>
                <p className="text-sm h-fit">{t.date}</p>
              </div>
              ))
            }
          </div>
        </section>
    )
}