import { Container } from "../ui/container";
import { useState, useEffect, useRef } from "react";
import getTransactions from "@/app/lib/db/getTransactions";
import TransactionContainer from "./transactions/transactionContainer";
import { NavbarHeight } from "@/components/Navbar";
import Link from "next/link";
import { useWindowWidth } from "../useWindowWidth";

interface SpendingProps {
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

export default function Transactions({ className }: SpendingProps) {
  const [loaded, setLoaded] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [limit, setLimit] = useState<number>(6);
  const windowWidth = useWindowWidth();
  const height = 60;
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransactions({ numberOfMonths: 4 });
        if (data.error) {
          console.error("Error fetching transactions:", data.error);
          return;
        }
        setTransactions(data.data || []);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loaded && !ulRef.current) return;
    let conHeight = ulRef.current?.clientHeight || 0;
    conHeight = conHeight - 30;
    const lim = Math.floor(conHeight / height);
    console.log("Container height:", conHeight, "Limit calculated:", lim);
    setLimit(Math.floor(conHeight / height));
  }, [loaded, transactions]);

  // sortera på datum
  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
  
  const limitedTransactions = sortedTransactions.slice(0, limit);

  return (
    <section
      className={`${className} w-full min-h-full overflow-hidden`}
      style={{ maxHeight: `calc(100vh - ${NavbarHeight}px)` }}
    >
      <Container>
        <div className="flex justify-between items-center mb-4 ">
          <h3 className="text-white">Senaste transaktioner</h3>
          <Link href="/transactions" className="text-sm text-blue-400 hover:underline inline-block">
            <p>Visa alla</p>
          </Link>
        </div>

        {loaded && (
          <ul className="min-h-full" ref={ulRef}>
            {limitedTransactions.map((transaction) => (
              <TransactionContainer
                key={transaction.id}
                amount={transaction.amount}
                type={transaction.type}
                date={transaction.date}
                description={transaction.description}
                height={height}
              />
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
