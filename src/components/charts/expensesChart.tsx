import { useState, useEffect } from 'react';
import getTransactions from '@/app/lib/db/getTransactions';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { formatCurrency } from '@/app/lib/formatcurrency';
import { onEvent } from '@/app/lib/eventbus';

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

type DailyExpense = {
  date: string;
  totalExpense: number;
};

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: {
    value: number;
    payload: {
      date: string;
      totalExpense: number;
    };
  }[];
}


// #endregion
const ExpensesChart = ({maxHeight}: { maxHeight: number }) => {
    const [chartData, setChartData] = useState<DailyExpense[]>([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
            const result = await getTransactions({ numberOfMonths: 1 });
            if (result.error) {
                console.error("Error fetching chart data:", result.error);
                setLoading(false);
                return;
            }
            const aggregated = aggregateByDay(result.data || []);
            setChartData(aggregated);
            setLoading(false);
            } catch (error) {
            console.error("Error fetching chart data:", error);
            setLoading(false);
            }
        };

        fetchData();

        const unsubscribe = onEvent("modalChange", (e: { opened: boolean }) => {
          setShow(!e.opened);
        });

        return () => {
          unsubscribe();
        };
    }, []);

    /**
     * Aggregate transactions into daily total expenses.
     *
     * Sums amounts of transactions with type "expense" per calendar day (formatted using the "sv-SE" locale), rounding each day's total to the nearest integer.
     *
     * @param transactions - Array of transactions to aggregate
     * @returns An array of objects where each entry represents a date and its `totalExpense` (the rounded sum of expenses for that date, date formatted as `YYYY-MM-DD`)
     */
    function aggregateByDay(transactions: Transaction[]): DailyExpense[] {
    const map = new Map<string, number>();

    transactions.forEach((t) => {
        const dateKey = new Date(t.date).toLocaleDateString("sv-SE");
        const current = map.get(dateKey) || 0;

        // summera bara utgifter, eller ta med inkomster också beroende på behov
        if (t.type === "expense") {
        map.set(dateKey, Math.round(current + t.amount));
        }
    });

    // konvertera till array för Recharts
    return Array.from(map.entries()).map(([date, total]) => ({
        date,
        totalExpense: total,
    }));
    }

    if (loading) {
        return <div>Loading chart...</div>;
    }
    if (!show) return null;
    return (
    <AreaChart
    style={{ width: '100%', maxWidth: '1200px', maxHeight: `${maxHeight}px`, aspectRatio: 1.618 }}
    data={chartData}
    margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
    >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip content={<CustomTooltip />} />
    <Area type="monotone" dataKey="totalExpense" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

export default ExpensesChart;

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const day = payload[0].payload;

    return (
      <div className="bg-neutral-900 border border-neutral-700 rounded-md p-3 text-sm text-white shadow-lg">
        <p className="font-semibold text-blue-400 mb-1">{label}</p>
        <p>
          <span className="text-neutral-400">Total kostnad:</span>
          <span className="text-red-400 font-medium">{formatCurrency(day.totalExpense)} kr</span>
        </p>
      </div>
    );
  }
  return null;
};

