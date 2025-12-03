import { getIncomeExpenseTotal } from "@/app/lib/IncomeExspenseTotal";
import { Container } from "../ui/container";
import { useState, useEffect } from "react";
import { supabaseUserID } from "@/app/lib/supabaseClient";
import { formatCurrency } from "@/app/lib/formatcurrency";
import { ArrowUpRight, ArrowDownLeft, TrendingDown, TrendingUp, ArrowLeftRight, HandCoins } from "lucide-react";
import Statistic from "./summary/statistics";

interface SummaryProps {
  className?: string;
}

export default function Summary({ className }: SummaryProps) {
  const [loaded, setLoaded] = useState(false);
  const [valueData, setValueData] = useState<{ income: number; expense: number; total: number }>({
    income: 0,
    expense: 0,
    total: 0,
  });

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
                  <span className="text-green-400 text-lg font-bold">
                    {formatCurrency(valueData.income)} kr
                  </span>
                </div>
                <p className="text-sm text-neutral-300 mt-1">Inkomster</p>
              </div>

              <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center gap-2">
                  <ArrowDownLeft className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 text-lg font-bold">
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
                <Statistic Icon={ArrowLeftRight} text="34 transaktioner denna månad" type="neutral" />
                <Statistic Icon={TrendingDown} text="Största utgift: Mat – 3 200 kr" type="bad" />
                <Statistic Icon={HandCoins} text="Sparande hittills: 5 000 kr" type="good" />
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
