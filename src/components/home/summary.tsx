import { getIncomeExpenseTotal } from "@/app/lib/IncomeExspenseTotal";
import { Container } from "../ui/container";
import { useState, useEffect } from "react";
import { supabaseUserID } from "@/app/lib/supabaseClient";
import { formatCurrency } from "@/app/lib/formatcurrency";
import { ArrowUpRight, ArrowDownLeft, TrendingDown, TrendingUp, ArrowLeftRight, HandCoins } from "lucide-react";
import Statistic from "./summary/statistics";
import { GetTransactionsMonth } from "@/app/lib/getTransactionsMonth";
import getUserOption from "@/app/lib/db/getUserOption";
import { getCategories } from "@/app/lib/db/getCategories";

interface SummaryProps {
  className?: string;
}

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

type Category = {
  category_key: string;
  name_sv: string;
  name_en: string;
  icon: string;
  transaction_type: string;
};

export default function Summary({ className }: SummaryProps) {
  const [loaded, setLoaded] = useState(false);
  const [valueData, setValueData] = useState<{ income: number; expense: number; total: number }>({
    income: 0,
    expense: 0,
    total: 0,
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalSaving, setTotalSaving] = useState<number | null>(null);
  const [biggetstExpense, setBiggestExpense] = useState<{ category: string; amount: number } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await supabaseUserID();
        if (!userId) {
          console.error("User not authenticated");
          return;
        }
        const date = new Date();
        const response = await getIncomeExpenseTotal(userId, date);
        setValueData({
          income: response.income,
          expense: response.expense,
          total: response.income - response.expense,
        });

        const res = await GetTransactionsMonth();
        if (res.error) {
          console.error("Error fetching transactions:", res.error);
          return;
        }

        setTransactions(res.data || []);

        const totalSaved = res.data
          ?.filter((tx) => tx.type === "income" && tx.description !== "Inital Amount" && tx.category === "savings")
          .reduce((sum, tx) => sum + tx.amount, 0) || 0;
        setTotalSaving(totalSaved);

        const expenses = res.data?.filter((tx) => tx.type === "expense");
        if (expenses && expenses.length > 0) {
          const expenseByCategory: { [key: string]: number } = {};
          expenses.forEach((tx) => {
            if (expenseByCategory[tx.category]) {
              expenseByCategory[tx.category] += tx.amount;
            } else {
              expenseByCategory[tx.category] = tx.amount;
            }
          });
          const biggest = Object.entries(expenseByCategory).reduce(
            (max, entry) => (entry[1] > max[1] ? entry : max),
            ["", 0]
          );
          setBiggestExpense({ category: biggest[0], amount: biggest[1] });
        }

        const responseCategories = await getCategories();
        
        setCategories(responseCategories || []);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching income and expense total:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className={`${className} w-full h-full`}>
      <Container>
        <h3 className="text-lg font-semibold">Total balans</h3>
        {loaded ? (
          <>
            <h1 className="my-4">{formatCurrency(valueData.total)} kr</h1>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-900/20 border border-green-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 md:text-lg font-bold">
                    {formatCurrency(valueData.income)} kr
                  </span>
                </div>
                <p className="text-sm text-neutral-300 mt-1">Inkomster</p>
              </div>

              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-2">
                  <ArrowDownLeft className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 md:text-lg font-bold">
                    {formatCurrency(valueData.expense)} kr
                  </span>
                </div>
                <p className="text-sm text-neutral-300 mt-1">Utgifter</p>
              </div>
            </div>

            {/* Snabbstatistik */}
            <section className="mt-6">
              <h4 className="text-md font-semibold mb-2">Snabbstatistik</h4>
              <div className="flex flex-wrap gap-3">
                <Statistic Icon={ArrowLeftRight} text={`${transactions.length} transaktioner denna månad`} type="neutral" />
                {biggetstExpense && (
                  <Statistic Icon={TrendingDown} text={`Största utgift: ${categories.find(cat => cat.category_key === biggetstExpense.category)?.name_sv || biggetstExpense.category} ${formatCurrency(biggetstExpense.amount)} kr`} type="bad" />
                )}
                {totalSaving !== null && totalSaving > 0 && (
                  <Statistic Icon={HandCoins} text={`Totalt sparat denna månad: ${formatCurrency(totalSaving)} kr`} type="good" />
                )}
                <Statistic Icon={TrendingUp} text="+12% mer inkomster än förra månaden" type="good" />
              </div>
            </section>
          </>
        ) : (
          <>
            <div className="w-50 h-10 bg-neutral-500 animate-pulse rounded-md" />
          </>
        )}
      </Container>
    </section>
  );
}
