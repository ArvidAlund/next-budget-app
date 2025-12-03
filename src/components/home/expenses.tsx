import ExpensesChart from "../charts/expensesChart";
import { Container } from "../ui/container";

interface SpendingProps {
  className?: string;
}

export default function Expenses({ className }: SpendingProps) {
  return (
    <section className={`${className} w-full h-full`}>
          <Container>
            <h3 className="text-white mb-4">Dagliga kostnader</h3>
            <ExpensesChart />
          </Container>
    </section>
  )
}