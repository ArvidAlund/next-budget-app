import ExpensesChart from "../charts/expensesChart";
import { Container } from "../ui/container";
import { useWindowWidth } from "../useWindowWidth";

interface SpendingProps {
  className?: string;
}

export default function Expenses({ className }: SpendingProps) {
  const windowWidth = useWindowWidth();
  return (
    <section className={`${className} w-full h-full`}>
          <Container>
            <h3 className="text-white mb-4">Dagliga kostnader</h3>
            <ExpensesChart maxHeight={windowWidth > 1024 ? 200 : 100} />
          </Container>
    </section>
  )
}