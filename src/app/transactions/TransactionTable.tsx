"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"

import { GetTransactionsMonth } from "../lib/getTransactionsMonth"
import { useEffect, useState } from "react"
import { truncate } from "@/components/ExpensesBox"

type Transaction = {
  id: string;
  type: "inkomst" | "utgift";
  category: string;
  amount: number;
  date: string;
  description?: string;
};

export function TransactionTable(){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const currdate = new Date()
    const currmonth = currdate.getMonth()

    useEffect(() =>{
      const fetchData = async() =>{
        const { data, error } = await GetTransactionsMonth();
        if (!error && data) {
          setTransactions(data);
        }
      };

      fetchData();
    })

    return(
        <Table className="w-90">
            <TableRow>
                <TableHead className="text-secondary">Typ</TableHead>
                <TableHead className="text-secondary">Kostnad (kr)</TableHead>
                <TableHead className="text-secondary">Beskrivning</TableHead>
                <TableHead className="text-secondary">Datum</TableHead>
            </TableRow>
            {transactions.map((t) => (
              <TableRow>
                <TableCell className="text-secondary">{t.type}</TableCell>
                <TableCell className="text-secondary">{t.amount}</TableCell>
                <TableCell className="text-secondary">{t.description}</TableCell>
                <TableCell className="text-secondary">{t.date}</TableCell>
              </TableRow>

            ))}

        </Table>
    )
}